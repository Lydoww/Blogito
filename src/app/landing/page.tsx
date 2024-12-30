import React from "react";
import Head from "next/head";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to Blogito</title>
        <meta
          name="description"
          content="Discover Blogito: Share your ideas, connect with enthusiasts, and create inspiring content."
        />
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center flex-grow text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white py-16">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Blogito
            </span>
          </h1>
          <p className="text-xl font-semibold md:text-2xl max-w-3xl mb-8 text-white py-16">
            Share your ideas, connect with like-minded enthusiasts, and create
            inspiring content that impacts the world.
          </p>
          <div className="space-x-4">
            <Link
              href={"/sign-in"}
              className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-600"
            >
              Sign in
            </Link>
            <Link
              href={"/sign-up"}
              className="bg-gray-500 text-white font-semibold py-3 px-6 rounded hover:bg-gray-700"
            >
              Sign up
            </Link>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-12 px-8">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-500">
                Create Content
              </h3>
              <p className="text-white font-semibold">
                Write articles that inform, inspire, and empower your audience.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold mb-4 text-purple-500">
                Connect
              </h3>
              <p className="text-white font-semibold">
                Engage with a vibrant community of creators and thinkers.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold mb-4 text-pink-500">
                Inspire
              </h3>
              <p className="text-white font-semibold">
                Share your unique perspective to motivate and inspire others.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className=" py-6 text-center text-gray-400">
          © 2024 Blogito. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
