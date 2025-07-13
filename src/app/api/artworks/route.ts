import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get the search parameters from the original request
    const { searchParams } = new URL(request.url);
    
    // Forward the request to the dedicated artworks API worker
    const artworksApiUrl = new URL("/api/artworks", "https://artworks-api.moia.workers.dev");
    
    // Copy all search parameters
    searchParams.forEach((value, key) => {
      artworksApiUrl.searchParams.set(key, value);
    });
    
    console.log("Proxying request to:", artworksApiUrl.toString());
    
    const response = await fetch(artworksApiUrl.toString());
    
    if (!response.ok) {
      throw new Error(`Artworks API responded with ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to artworks API:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorDetails = {
      error: "Failed to fetch artworks",
      details: errorMessage,
      timestamp: new Date().toISOString(),
      version: "proxy-to-dedicated-worker-v1",
    };

    return NextResponse.json(errorDetails, { status: 500 });
  }
}
