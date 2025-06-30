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

          <p className="text-xl text-gray-600 leading-relaxed">
            Feel free to experiment with our installation. In the following we
            are going to explain how you can collaborate and what you will see.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-black mb-8">Step 1</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Take a look at the right podest where you can experiment with
                the parameters of the artwork. You can change the color, the
                size, and the position of the artwork. This is a great way to
                see how different parameters affect the final result.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-black mb-8">Step 2</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                On the left podest you can influence the content of the artwork.
                Use the things out of the box to build your own artwork.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-black mb-8">Step 3</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Once you are happy with your artwork, you can save it by
                scanning the QR code on the right podest.
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
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
