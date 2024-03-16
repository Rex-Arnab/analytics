"use client";

import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Loader, Sidebar } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { generateRandomString } from "@/lib/utils";

interface NavbarProps {
  sessionId: string | null;
  setSessionId: (sessionId: string) => void;
}

function Navbar({ sessionId, setSessionId }: NavbarProps) {
  useEffect(() => {
    setSessionId(generateRandomString(5));
  }, []);
  return (
    <nav className="flex items-center gap-2 px-2">
      <Sheet>
        <SheetTrigger asChild>
          <Sidebar />
        </SheetTrigger>
        <SheetContent side="left">Sidebar</SheetContent>
      </Sheet>
      {sessionId ? (
        <Button
          onClick={() => {
            toast({
              title: "New Session Generated",
              description: sessionId
            });
            setSessionId(generateRandomString(5));
          }}
          className="w-full">
          Session: {sessionId}
        </Button>
      ) : (
        <div className="flex items-center justify-center w-full gap-5">
          <Loader className="animate-spin" />{" "}
          <span className="text-md text-gray-600">
            generating session id...
          </span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
