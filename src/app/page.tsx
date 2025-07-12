"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [randomImageNumber, setRandomImageNumber] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    setIsClient(true);
    setRandomImageNumber(Math.floor(Math.random() * 20) + 1);
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-24 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg mb-6">
              Collaborate. Create. Contemplate.
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black leading-tight mb-8">
              Museum of
              <br />
              <span className="animated-color">Interactive</span> Art
            </h1>
          </div>
        </div>
      </section>
      {/* Artworks Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <div
            className="bg-muted rounded-lg w-full mx-auto relative cursor-pointer"
            style={{ maxHeight: "80vh", aspectRatio: "9/16" }}
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop
              className="h-full w-full rounded-lg object-cover"
              style={{
                maxHeight: "80vh",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
              }}
            >
              <source
                src="https://cdn.jsdelivr.net/gh/projektmodul-ki/static/trailer/pmki-trailer-compressed.mp4"
                type="video/mp4"
              />
              <source
                src="https://files.catbox.moe/hswxfq.mp4"
                type="video/mp4"
              />
              <source
                src="https://sv0rle2dok1qvb3d.public.blob.vercel-storage.com/pmki-trailer-RfdlZ3NYoJRbRc0wkmsgzIRHg1hOwM.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {isMuted && (
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs font-medium">
                  Tap to unmute
                </div>
              </div>
            )}
            {!isMuted && (
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs font-medium">
                  Tap to mute
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* How-To Card */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                How does it work?
              </CardTitle>
              <CardDescription>
                You want to try experimenting with interactive art? Learn how it
                works.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/tutorial" className="w-full group" tabIndex={-1}>
                <Button
                  variant="secondary"
                  className="w-full cursor-pointer"
                  asChild
                >
                  <span className="w-full h-full block">Tutorial</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      {/* See Artworks Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">See Artworks</h2>
          <p className="text-gray-600 text-lg text-center mb-8">
            Explore our collection of interactive artworks.
          </p>
          {/* Example Artwork Card */}
          <Card>
            <CardContent>
              <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg mb-8">
                <img
                  src={`https://cdn.jsdelivr.net/gh/projektmodul-ki/static/example-artworks/Example_${
                    isClient ? randomImageNumber : 1
                  }.png`}
                  alt="Interactive artwork example"
                  className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                  onError={(e) => {
                    e.currentTarget.src = "/Logo-400x400.svg";
                  }}
                />
              </AspectRatio>
              <Link href="/artworks" className="text-lg font-bold mb-2 block">
                <Button className="w-full cursor-pointer">See Artworks</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Behind the Scenes Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Behind the Scenes
          </h2>
          <p className="text-gray-600 text-lg text-center mb-8">
            Discover the technology and creativity that bring our interactive
            art to life.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Behind the Scenes Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">The Concept</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Where man and machine create together. At a time when
                  artificial intelligence is often seen as a threat, MOIA
                  invites you to experience it differently: as a creative
                  partner. Our spatial installation shows how AI does not
                  divide, but connects, by bringing people together to create
                  art. Two platforms. One wall. Many perspectives. And you in
                  the middle.{" "}
                  {/* With your hands, your movements and simple
                  objects, you form a digital work of art together with other
                  visitors. Live. Visible to everyone. Colors, styles and motifs
                  change in the moment. Monet meets the sea. Klimt merges with
                  people. A collective expression emerges - not alone, but
                  together. And as you shape the picture, the idea behind it
                  changes too:What you move influences how the AI thinks, what
                  it creates, how it dreams. MOIA is not a museum that you look
                  at.It is a space that you create - together with the machine
                  and with each other. */}
                  <br />
                  <img
                    src="https://cdn.jsdelivr.net/gh/projektmodul-ki/static/images/sketch.jpg"
                    alt="Concept sketch"
                    width={300}
                    height={225}
                    className="rounded mt-4 shadow"
                    onError={(e) => {
                      e.currentTarget.src = "/Logo-400x400.svg";
                    }}
                  />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  The Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our installation uses advanced computer vision and AI to
                  create unique art pieces based on user interactions. It all
                  comes together in the Touchdesigner software, which processes
                  user input and generates real-time visuals.
                  <br />
                  <img
                    src="https://cdn.jsdelivr.net/gh/projektmodul-ki/static/images/touchdesigner.png"
                    alt="Touchdesigner software screenshot"
                    width={300}
                    height={225}
                    className="rounded mt-4 shadow"
                    onError={(e) => {
                      e.currentTarget.src = "/Logo-400x400.svg";
                    }}
                  />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  The Prototype
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The first prototype was built on a MacBook Pro with two
                  iPhones as cameras. This demonstrated that the concept works,
                  but we needed to scale it up for a larger audience. The final
                  installation uses installed web cams and a powerful computer
                  to handle the longer run times .
                  <br />
                  <img
                    src="https://cdn.jsdelivr.net/gh/projektmodul-ki/static/images/prototype.png"
                    alt="Touchdesigner software screenshot"
                    width={300}
                    height={225}
                    className="rounded mt-4 shadow"
                    onError={(e) => {
                      e.currentTarget.src = "/Logo-400x400.svg";
                    }}
                  />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  The Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  MOIA was born out of the question: How can artificial
                  intelligence connect rather than replace people? This vision
                  developed into a collaborative process between concept,
                  technology, design and numerous experiments.
                  <br />
                  <img
                    src="https://cdn.jsdelivr.net/gh/projektmodul-ki/static/images/wall-colored.jpg"
                    alt="Installation wall screenshot"
                    width={200}
                    height={225}
                    className="rounded mt-4 shadow"
                    onError={(e) => {
                      e.currentTarget.src = "/Logo-400x400.svg";
                    }}
                  />
                  <br />
                  We built the wall, constructed the platforms, laid cables and
                  set up the technology. Much of the work was done by hand -
                  with screws, paint, improvisation and a lot of team
                  spirit. Even if not everything worked right away, the
                  construction was a creative process in itself. We screwed,
                  laughed, rethought and grew together.
                  <br />
                  <img
                    src="https://cdn.jsdelivr.net/gh/projektmodul-ki/static/images/wall-hole.png"
                    alt="Installation wall screenshot"
                    width={200}
                    height={225}
                    className="rounded mt-4 shadow"
                    onError={(e) => {
                      e.currentTarget.src = "/Logo-400x400.svg";
                    }}
                  />
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8">
            <blockquote className="text-lg text-gray-800 italic mb-4">
              “The power of art is that it can connect us to one another, and to
              larger truths about what it means to be alive and what it means to
              be human.”
            </blockquote>
            <cite className="text-gray-600 text-sm">— Daniel Levitin</cite>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            Projektmodul KI SoSe 2025 Hochschule München
          </p>
        </div>
      </footer>
    </div>
  );
}
