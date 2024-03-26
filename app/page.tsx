"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import DomainIdSelector from "@/components/DomainIdSelector";
import PagesNavigation from "@/components/PagesNavigation";
import Homepage from "@/components/Homepage";
import ShopPage from "@/components/ShopPage";
function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [domainId, setDomainId] = useState<string>("123");
  const [currentPage, setCurrentPage] = useState<number>(-1);

  return (
    <section className="bg-slate-200 p-5 min-h-screen max-w-5xl mx-auto">
      <Navbar
        sessionId={sessionId}
        setSessionId={setSessionId}
        setDomainId={setDomainId}
        setCurrentPage={setCurrentPage}
      />
      {sessionId && (
        <DomainIdSelector domainId={domainId} setDomainId={setDomainId} />
      )}
      {domainId && sessionId && (
        <PagesNavigation
          sessionId={sessionId}
          domainId={domainId}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage == 1 && <Homepage />}
      {currentPage == 4 && <ShopPage />}
    </section>
  );
}

export default Home;
