import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET(request: Request) {
  try {
    // Check if required environment variables are set
    if (
      !process.env.CLOUDFLARE_ACCOUNT_ID ||
      !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ||
      !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
      !process.env.CLOUDFLARE_R2_BUCKET_NAME
    ) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Prefix: "images/", // Images are stored in the images/ folder
    });

    const response = await s3Client.send(command);

    // Filter for image files and sort by LastModified (most recent first)
    const allImageFiles =
      response.Contents?.filter((item) =>
        item.Key?.match(/\.(png|jpg|jpeg|gif|webp)$/i)
      )
        .sort((a, b) => {
          // Sort by LastModified in descending order (most recent first)
          const dateA = a.LastModified ? new Date(a.LastModified).getTime() : 0;
          const dateB = b.LastModified ? new Date(b.LastModified).getTime() : 0;
          return dateB - dateA;
        })
        .map((item) => ({
          key: item.Key!,
          filename: item.Key!.split("/").pop()!,
          url: `/api/images/${item.Key}`,
          lastModified: item.LastModified?.toISOString(),
        })) || [];

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedImages = allImageFiles.slice(startIndex, endIndex);

    return NextResponse.json({
      images: paginatedImages,
      total: allImageFiles.length,
      page,
      limit,
      hasMore: endIndex < allImageFiles.length,
      totalPages: Math.ceil(allImageFiles.length / limit),
    });
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json(
      { error: "Failed to fetch artworks" },
      { status: 500 }
    );
  }
}
