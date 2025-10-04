import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DotGrid from "@/components/ui/DotGrid";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DotGrid
          style={{ width: '100%', height: '100%' }}
          dotSize={8}
          gap={20}
          baseColor="rgba(139, 92, 246, 0.2)" 
          activeColor="rgba(6, 182, 212, 0.5)"
          proximity={120}
          shockRadius={200}
          shockStrength={4}
          resistance={600}
          returnDuration={1.5}
        />
      </div>

      <div className="flex flex-col items-center justify-center  text-center gap-6 px-4">
        <h1 className="text-7xl sm:text-8xl font-extrabold">404</h1>
        <p className="text-2xl sm:text-3xl font-semibold">
          Oops! Page not found.
        </p>
        <p className="text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 mt-4"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
