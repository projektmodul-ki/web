// Cloudflare Worker for images API
// This should handle /api/images/* paths

export interface Env {
  ARTWORKS_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Add CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);

      // Extract the image path from the URL
      // URL format: /api/images/images/filename.png
      const pathParts = url.pathname.split("/").filter(Boolean);

      if (
        pathParts.length < 3 ||
        pathParts[0] !== "api" ||
        pathParts[1] !== "images"
      ) {
        return new Response("Not Found", { status: 404 });
      }

      // Reconstruct the R2 key: "images/filename.png"
      // URL format: /api/images/images/filename.png -> R2 key: images/filename.png
      const filename = pathParts.slice(3).join("/"); // Skip "api", "images", "images"
      const r2Key = `images/${filename}`;

      console.log("Fetching image from R2:", r2Key);

      // Get the object from R2
      const object = await env.ARTWORKS_BUCKET.get(r2Key);

      if (object === null) {
        return new Response("Image not found", {
          status: 404,
          headers: corsHeaders,
        });
      }

      // Determine content type based on file extension
      const extension = filename.split(".").pop()?.toLowerCase();
      let contentType = "application/octet-stream";

      switch (extension) {
        case "png":
          contentType = "image/png";
          break;
        case "jpg":
        case "jpeg":
          contentType = "image/jpeg";
          break;
        case "gif":
          contentType = "image/gif";
          break;
        case "webp":
          contentType = "image/webp";
          break;
      }

      return new Response(object.body, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error("Error fetching image:", error);

      return new Response("Internal Server Error", {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
