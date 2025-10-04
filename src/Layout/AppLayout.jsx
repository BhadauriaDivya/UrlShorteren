import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import DarkVeil from "@/components/ui/DarkVeil";

const AppLayout = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 w-full h-screen overflow-hidden">
        <DarkVeil />
      </div>

      <div className="relative flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main className="flex-1 px-6 relative z-10 overflow-hidden">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
