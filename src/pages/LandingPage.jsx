import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TextType from "@/components/ui/TextType";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 px-6 text-white">
      <h1 className="text-3xl  sm:text-6xl lg:text-7xl font-extrabold text-center leading-tight max-w-6xl ">
        Turn any long URL into a{" "}
        <span className="text-indigo-400">clean, professional link</span> in
        seconds
      </h1>
      <p className="mt-4 text-center text-gray-300 max-w-2xl">
        Make your links neat, smart, and ready to click with TrimURL
      </p>

      {/* Form */}
      <form
        onSubmit={handleShorten}
        className="mt-8 flex flex-col sm:flex-row w-full max-w-2xl gap-3"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long URL"
          className="flex-1 py-4 px-5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-400 focus:ring focus:ring-indigo-400/30"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button
          type="submit"
          className="py-4 px-8 rounded-lg bg-indigo-500 hover:bg-indigo-600 shadow-lg transition-colors duration-200"
        >
          Shorten
        </Button>
      </form>
      <div className="mt-3">
        <TextType
          text={[
            "LONG URL : https://example.com/long-url",
            "SHORT URL : https://trimurl.com/abc123",
          ]}
          typingSpeed={100}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-indigo-400 font-semibold"
        />
      </div>
    </div>
  );
};

export default LandingPage;
