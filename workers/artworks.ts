// Cloudflare Worker for artworks API
// This should be deployed as a separate worker at https://artworks-api.moia.workers.dev

export interface Env {
  ARTWORKS_BUCKET: R2Bucket;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_R2_BUCKET_NAME: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Add CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);

      // Only handle /api/artworks path
      if (!url.pathname.startsWith("/api/artworks")) {
        return new Response("Not Found", { status: 404 });
      }

      // Get pagination parameters
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const limit = parseInt(url.searchParams.get("limit") || "6", 10);

      console.log("Listing objects from R2 bucket with prefix: images/");

      // List objects in the R2 bucket
      const listResult = await env.ARTWORKS_BUCKET.list({
        prefix: "images/",
        include: ["customMetadata"],
      });

      console.log(
        "R2 list result:",
        listResult.objects.length,
        "objects found"
      );

      // Filter for image files and sort by uploaded (most recent first)
      const allImageFiles = listResult.objects
        .filter((obj) => obj.key.match(/\.(png|jpg|jpeg|gif|webp)$/i))
        .sort((a, b) => {
          // Sort by uploaded date in descending order (most recent first)
          const dateA = a.uploaded ? new Date(a.uploaded).getTime() : 0;
          const dateB = b.uploaded ? new Date(b.uploaded).getTime() : 0;
          return dateB - dateA;
        })
        .map((obj) => ({
          key: obj.key,
          filename: obj.key.split("/").pop()!,
          url: `https://images-api.moia.workers.dev/api/images/images/${obj.key
            .split("/")
            .pop()}`,
          lastModified: obj.uploaded?.toISOString(),
          size: obj.size,
        }));

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedImages = allImageFiles.slice(startIndex, endIndex);

      const response = {
        images: paginatedImages,
        total: allImageFiles.length,
        page,
        limit,
        hasMore: endIndex < allImageFiles.length,
        totalPages: Math.ceil(allImageFiles.length / limit),
      };

      return new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error("Error fetching artworks:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const errorDetails = {
        error: "Failed to fetch artworks",
        details: errorMessage,
        timestamp: new Date().toISOString(),
        version: "dedicated-worker-v1",
      };

      return new Response(JSON.stringify(errorDetails), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
  },
};
