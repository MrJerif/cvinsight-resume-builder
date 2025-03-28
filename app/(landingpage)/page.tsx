import Image from "next/image";
import logo from "@/public/vercel.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
export default function Home() {
  const features = [
    {
      emoji: "📝",
      title: "Eazy to Use",
      description: "Easy-to-use editor with customizable templates",
    },
    {
      emoji: "🎨",
      title: "Customizable Designs",
      description: "Add, edit, and organize sections effortlessly",
    },
    {
      emoji: "💡",
      title: "Ai Suggestions",
      description: "Tailored suggestions while you write",
    },
    {
      emoji: "📊",
      title: "Review Resume",
      description: "Get detailed, actionable insights on your resume",
    },
    {
      emoji: "🧠",
      title: "Ai Review",
      description: "Improve clarity, structure, and content",
    },
    {
      emoji: "🚀",
      title: "Build Perfect Resume",
      description: "Boost your chances with recruiter-friendly feedback",
    },
  ];

  return (
    <>
      {/* Hero section */}
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-gray-900 text-center md:text-start md:flex-row lg:gap-12">
        <div className="max-w-prose">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="logo"
            className="mx-auto md:ms-0 bg-orange-500"
          />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
            Create a{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent inline-block">
              Perfect Resume
            </span>{" "}
            in Minutes
          </h1>
          <p className="text-lg text-gray-500">
            Create <span className="font-bold">stunning resumes </span>
            and get <span className="font-bold">AI-powered feedback </span> to
            stand out in the job market.
          </p>
          <Button asChild size="lg" variant="premium">
            <Link href="/resumes">Get started</Link>
          </Button>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-black">
          Features ✨
        </h2>
        <Carousel
          opts={{ align: "start" }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl h-[35vh]">
                      <span className="text-6xl">{feature.emoji}</span>
                      <h3 className="text-xl font-bold mt-4 text-black">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mt-2 text-center">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          How It Works 🛠️
        </h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 w-[65vw]">
          {[
            "🛠️ Create: Build your resume with our easy-to-use editor.",
            "🧠 Review: Get AI-powered suggestions to improve.",
            "🚀 Apply: Send out polished, professional resumes.",
          ].map((step, index) => (
            <Card key={index} className="bg-white ">
              <CardContent className="p-6 text-center">
                <span className="text-lg font-semibold text-black">{step}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Why Choose Us? 🌟
        </h2>
        <div className="max-w-4xl mx-20 md:mx-auto grid gap-6 md:grid-cols-2">
          {[
            "⚡ Fast & Simple: Build and optimize your resume in minutes.",
            "🎨 Beautiful Templates: Professionally designed, customizable layouts.",
            "💡 Smart Feedback: Get expert-level suggestions tailored to your career.",
            "🔐 Secure: Your data is encrypted and safe.",
          ].map((reason, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6 text-center">
                <span className="text-lg font-semibold text-black">
                  {reason}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-orange-400">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Pricing Plans 💰
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl m-20 md:mx-auto">
          <Card className="p-6 text-center bg-gray-100 shadow-md rounded-2xl">
            <h3 className="text-2xl font-bold text-black">Free</h3>
            <ul className="mt-4 text-gray-600 fontse">
              <li className="flex gap-4">
                <span>✅</span> <span>Create 1 free resume</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>1 AI-Powered Resume Review</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Download as PDF</span>
              </li>
              <li className="flex gap-4">
                <span>❌</span> <span>Default template</span>
              </li>
              <li className="flex gap-4">
                <span>❌</span> <span>No Design customizations</span>
              </li>
            </ul>
          </Card>
          <Card className="p-6 text-center bg-gray-50 shadow-md rounded-2xl">
            <h3 className="text-2xl font-bold text-black">Basic</h3>
            <ul className="mt-4 text-gray-600 fontse">
              <li className="flex gap-4">
                <span>✅</span> <span>Up to 3 resumes</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>3 AI-Powered Resume Reviews</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Design customizations</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Limited templates</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Download as PDF</span>
              </li>
            </ul>
          </Card>
          <Card className="p-6 text-center bg-gray-50 shadow-md rounded-2xl">
            <h3 className="text-2xl font-bold text-black">Pro</h3>
            <ul className="mt-4 text-gray-600 fontse">
              <li className="flex gap-4">
                <span>✅</span> <span>Infinite resumes</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Infinite Resume Reviews</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Design customizations</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Unlock All templates</span>
              </li>
              <li className="flex gap-4">
                <span>✅</span> <span>Download as PDF</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-400 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to land your dream job?
        </h2>
        <Button asChild size="lg" variant="secondary">
          <Link href="/resumes">Build Your Resume Now</Link>
        </Button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>About | <Link href="/privacypolicy">Privacy Policy</Link> | <Link href="/tos">Terms of Service</Link></p>
        <p>Contact: <a href="mailto:cvinsight@gmail.com">cvinsight@gmail.com</a></p>
      </footer>
    </>
  );
}
