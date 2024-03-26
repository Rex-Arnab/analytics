"use client";

import { useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { ArrowRight, Loader, Sidebar } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { generateRandomString } from "@/lib/utils";
import Link from "next/link";

interface NavbarProps {
  sessionId?: string | null;
  setSessionId?: (sessionId: string) => void;
  setDomainId?: (domain_id: string) => void;
  setCurrentPage?: (current_page: number) => void;
}

const NavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2 justify-between border-2 border-gray-500 py-2 px-5">
      <span>{children}</span>
      <ArrowRight />
    </div>
  );
};

const pageData = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Carts",
    path: "/carts"
  },
  {
    title: "Tracking",
    path: "/tracking"
  }
];

function Navbar({
  sessionId,
  setSessionId,
  setDomainId,
  setCurrentPage
}: NavbarProps) {
  useEffect(() => {
    if (setSessionId) setSessionId(generateRandomString(5));
  }, []);
  return (
    <nav className="flex items-center gap-2 px-2">
      <Sheet>
        <SheetTrigger asChild>
          <Sidebar />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="font-bold text-xl">
            Analytics Tester
          </SheetHeader>
          <div className="my-5 space-y-5">
            {pageData.map((page, index) => (
              <Link key={index} href={page.path}>
                <NavItem>{page.title}</NavItem>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      {sessionId && setSessionId ? (
        <Button
          onClick={() => {
            toast({
              title: "New Session Generated",
              description: sessionId
            });
            setSessionId(generateRandomString(5));
            setDomainId && setDomainId("123");
            setCurrentPage && setCurrentPage(-1);
          }}
          className="w-full">
          Session: {sessionId}
        </Button>
      ) : (
        <div className="flex items-center justify-center w-full gap-5">
          {setSessionId && (
            <>
              <Loader className="animate-spin" />
              <span className="text-md text-gray-600">
                generating session id...
              </span>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
