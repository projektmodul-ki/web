import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Lightbulb, Award } from "lucide-react";
import Link from "next/link";

export default function Tutorial() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-8">
            Tutorial
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our installation invites you to co-create artwork with artificial
            intelligence and your friends. The final artwork is displayed on the
            central screen. You control it using the two podestals in front of
            you.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pb-16">
          <div className="prose prose-lg max-w-none">
            <img
              src="/right-pedestal.jpeg"
              alt="Left Pedestal - Shape the Art"
              className="w-full max-w-md mx-auto aspect-square object-cover rounded-lg mb-8"
            />
            <h2 className="text-3xl font-bold text-black mb-8">
              Right Pedestal - Shape the Art
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Here, you'll find a small playground under a camera. Simply
                place everyday objects or move them around, the AI will use them
                as inspiration to create shapes and forms in the artwork. The
                image changes every time you add, move, or remove an object.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pb-16">
          <div className="prose prose-lg max-w-none">
            <img
              src="/left-pedestal.jpeg"
              alt="Left Pedestal - Adjust the style"
              className="w-full max-w-md mx-auto aspect-square object-cover rounded-lg mb-8"
            />
            <h2 className="text-3xl font-bold text-black mb-8">
              Left Pedestal - Adjust the style
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Use the sliders to influence the mood and style of the artwork.
                You can adjust: <br />
                <strong>Color Tone:</strong> Red / Green / Blue <br />
                <strong>Artistic Style:</strong> Inspired by Klimt / Van Gogh /
                Monet <br />
                <strong>Type:</strong> Landscape / People / Ocean <br />
                Every setting subtly changes how the AI interprets the input
                from the left pedestal.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pb-16">
          <div className="prose prose-lg max-w-none">
            <img
              src="/artwork.jpeg"
              alt="Watch Your Artwork Come to Life"
              className="w-full max-w-md mx-auto aspect-square object-cover rounded-lg mb-8"
            />
            <h2 className="text-3xl font-bold text-black mb-8">
              Watch Your Artwork Come to Life
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                As you interact with both pedestals, the artwork on the screen
                evolves in real time.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-black mb-8">
              Take your art with you
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Once you are happy with your artwork, you can save it by
                scanning the QR code on the right pedestal. You can also browse
                a digital gallery of creations by other visitors on our website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back-To-Home Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Now you are ready!
          </h2>

          <p className="text-lg text-gray-300 mb-8">
            Just try it out and see how you can collaborate on art.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-3"
            >
              <Link href="/artworks">See other Artworks</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
