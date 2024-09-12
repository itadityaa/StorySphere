import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#FFF8DC] text-[#003049] min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-lg leading-relaxed max-w-4xl mx-auto">
        At <span className="text-[#d62828]">StorySphere</span>, we take your
        privacy seriously. Here’s a breakdown of how we handle and protect your
        data to ensure that your storytelling experience is safe and enjoyable.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Information We Collect</h2>
      <p className="text-lg leading-relaxed mt-2">
        We collect personal information such as name, email address, and data
        related to your usage of our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8">
        How We Use Your Information
      </h2>
      <p className="text-lg leading-relaxed mt-2">
        Your data helps us personalize your experience, communicate with you,
        and improve our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Your Rights</h2>
      <p className="text-lg leading-relaxed mt-2">
        You have the right to access, modify, or delete your personal data. For
        any requests, please contact us at{" "}
        <span className="text-[#d62828]">it.adityaa@gmail.com</span>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
