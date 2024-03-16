"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";

interface CardProps {
  title: string;
  description: string;
  isCurrentActive: boolean;
}

const Card = ({ title, description, isCurrentActive }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white p-4 rounded-md shadow-md py-5 space-y-10 border-2 border-white",
        isCurrentActive && "border-blue-500"
      )}>
      <h1 className="text-lg font-bold">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

const pageData = [
  {
    id: 1,
    title: "Homepage",
    description: "Landing"
  },
  {
    id: 2,
    title: "About",
    description: "About Us"
  },
  {
    id: 3,
    title: "Contact",
    description: "Contact Us"
  },
  {
    id: 4,
    title: "Shop",
    description: "Shop page"
  },
  {
    id: 5,
    title: "Blog",
    description: "Blog page"
  },
  {
    id: 6,
    title: "Portfolio",
    description: "Portfolio page"
  }
];

interface PagesNavigationProps {
  domainId: string;
  setCurrentPage: (pageId: number) => void;
}
function PagesNavigation({ domainId, setCurrentPage }: PagesNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handlePageVisit = (pageId: number) => {
    toast({
      title: `Navigating`,
      description: `${pageData[pageId].title}`
    });
    setActiveIndex(pageId);
    setCurrentPage(pageId + 1);
  };
  return (
    <>
      <h1 className="text-xl font-bold uppercase py-2">Page Navigation</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onClick={(e) => handlePageVisit(e.clickedIndex)}
        onSwiper={(swiper) => console.log(swiper)}>
        {pageData.map((page) => (
          <SwiperSlide key={page.id}>
            <Card
              title={page.title}
              description={page.description}
              isCurrentActive={activeIndex === page.id - 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PagesNavigation;
