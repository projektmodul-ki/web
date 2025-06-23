import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
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
              <span className="text-green-800">Interactive</span> Art
            </h1>
          </div>
        </div>
      </section>
      {/* Artworks Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </AspectRatio>
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
              <Button variant="secondary" className="w-full">
                <Link href="/tutorial">Tutorial</Link>
              </Button>
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
                <Image
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Photo by Drew Beamer"
                  fill
                  className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </AspectRatio>
              <Link href="/artworks" className="text-lg font-bold mb-2 block">
                <Button className="w-full">See Artworks</Button>
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
                <CardTitle className="text-lg font-bold">Das Konzept</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn how we create interactive art experiences using modern
                  technology.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Die Software
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Der Aufbau</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Der Trailer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              "Museums are more than buildings filled with artifacts—they're
              living institutions that connect us to our past, present, and
              future. Our technology should enhance that mission, not complicate
              it."
            </blockquote>
            <cite className="text-gray-600 text-sm">— Our Team</cite>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © 2023 Museum of Interactive Art. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
