import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="bg-[#0d1b2a] text-[#F9F6EE] min-h-screen flex flex-col justify-center items-center p-8 overflow-y-hidden">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg max-w-4xl text-center leading-relaxed mb-6">
        We'd love to hear from you! Whether you have a question, feedback, or
        just want to say hi, the StorySphere team is always here to chat. Don’t
        hesitate to get in touch.
      </p>

      <div className="bg-[#FFF8DC] text-[#0d1b2a] p-6 rounded-lg shadow-lg max-w-md w-full text-center ">
        <h2 className="text-2xl font-semibold mb-4">Reach Out</h2>
        <p className="mb-2">
          📧 Email:{" "}
          <a
            href="mailto:it.adityaa@gmail.com"
            className="text-[#d05549] hover:underline"
          >
            it.adityaa@gmail.com
          </a>
        </p>
        <p className="mb-2">
          🌐 GitHub:{" "}
          <a
            href="https://github.com/itadityaa"
            className="text-[#d05549] hover:underline"
          >
            github.com/itadityaa
          </a>
        </p>
      </div>

      <p className="text-lg max-w-4xl text-center leading-relaxed mt-6">
        You can also connect with us on social media, or visit our community
        forums to discuss stories, ideas, and everything in between.
      </p>
    </div>
  );
};

export default ContactUs;
