"use client";

import ProductData from "@/app/products.json";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ShopCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

const ShopCard = ({
  title,
  description,
  price,
  image,
  rating,
  category
}: Partial<ShopCardProps>) => {
  return (
    <Dialog>
      <div className="bg-white p-4 rounded-md shadow-md py-5 space-y-5 border-2 border-white">
        {image && title && (
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            priority
            className="w-full h-64 object-contain rounded-md"
          />
        )}
        {category && <Badge className="bg-purple-900">{category}</Badge>}
        <h1 className="text-lg font-bold">{title}</h1>
        {description && (
          <p>
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
        )}
        <p className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center">
            <IndianRupee />
            <span>{price}</span>
          </div>
          <div>
            <span className="text-yellow-500">
              {Array(Math.round(rating?.rate || 0))
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}{" "}
              ({rating?.count || 0})
            </span>
          </div>
        </p>
        <DialogTrigger asChild>
          <Button className="w-full">Buy Now</Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <div className="space-y-2 my-5">
              <Button className="w-full">Add To Cart</Button>
              <Button className="w-full">Remove From Cart</Button>
              <Button className="w-full">Add To Wishlist</Button>
              <Button className="w-full">Remove From Wishlist</Button>
              <Button className="w-full">Checkout</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

function ShopPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-slate-900 mb-5 mt-5">
        Shop Page
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ProductData.map((product) => (
          <ShopCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
