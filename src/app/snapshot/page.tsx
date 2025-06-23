"use client";
import { useState } from "react";

export default function Snapshot() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setImgUrl(null);

    try {
      const res = await fetch(
        "https://listen.museum-of-interactive-art.tech/run-script",
        {
          method: "POST",
          // If you protect the tunnel with Cloudflare Access, include
          // the appropriate Access Token header here.
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${text}`);
      }

      const data = (await res.json()) as { url?: string };
      if (!data.url) {
        throw new Error("No image URL returned from server.");
      }
      setImgUrl(data.url);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {loading ? "Generating…" : "Get Snapshot"}
      </button>
      {error && <p className="text-red-600">Error: {error}</p>}
      {imgUrl && (
        <img
          src={imgUrl}
          alt="Snapshot"
          className="max-w-full border rounded shadow"
        />
      )}
    </div>
  );
}
