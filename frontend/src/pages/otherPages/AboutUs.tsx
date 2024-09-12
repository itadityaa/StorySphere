import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#0d1b2a] text-[#F9F6EE] min-h-screen flex flex-col  justify-center items-center p-8 overflow-y-hidden">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-xl max-w-4xl text-center leading-relaxed">
        Welcome to <span className="text-[#d05549]">StorySphere</span> — where
        stories come alive, one page at a time! 🌍📖
      </p>
      <p className="text-lg max-w-4xl text-center leading-relaxed mt-4">
        At StorySphere, we believe in the transformative power of storytelling.
        Whether you're an aspiring author, an avid reader, or someone who loves
        to get lost in the magic of words, this is your space to explore,
        create, and connect.
      </p>
      <p className="text-lg max-w-4xl text-center leading-relaxed mt-4">
        Join us in weaving a world of stories—because at StorySphere, every
        story matters.
      </p>
    </div>
  );
};

export default AboutUs;
