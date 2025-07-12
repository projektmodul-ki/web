"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Target,
  Lightbulb,
  Award,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Snapshot() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const fetchSnapshot = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://snapshot.museum-of-interactive-art.tech/run-script"
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.text();

      // Validate that the response is a valid URL
      if (!data || !data.startsWith("https://")) {
        throw new Error("Invalid response format");
      }

      setImageUrl(data);
      setIsImageLoading(true);
    } catch (err) {
      console.error("Error fetching snapshot:", err);
      setError(err instanceof Error ? err.message : "Failed to load snapshot");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setError("Failed to load snapshot image");
  };

  useEffect(() => {
    fetchSnapshot();
  }, []);

  const retryFetch = () => {
    fetchSnapshot();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-8">
            Your Snapshot
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            This is your personal snapshot of the interactive artwork you
            created.
          </p>
        </div>
      </section>

      {/* Snapshot Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg min-h-[400px] flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
                <p className="text-gray-600 text-center">
                  Creating your snapshot...
                  <br />
                  <span className="text-sm">This may take a few seconds</span>
                </p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center space-y-4 text-center">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <div>
                  <p className="text-red-600 font-semibold mb-2">
                    Failed to load snapshot
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{error}</p>
                  <Button
                    onClick={retryFetch}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {imageUrl && !error && (
              <div className="w-full relative">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt="Your interactive artwork snapshot"
                  className="w-full h-auto rounded-lg"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ opacity: isImageLoading ? 0 : 1 }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
