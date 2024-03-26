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
import {
  trackAddToCart,
  trackAddToWishlist,
  trackCheckout,
  trackRemoveFromCart,
  trackViewContent
} from "@/lib/analytic";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ButtonCard = ({
  type,
  id,
  title,
  category,
  price,
  children
}: {
  type: string;
  id: string;
  title: string;
  category: string;
  price: number;
  children: React.ReactNode;
}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      className={cn("w-full", clicked && "bg-green-600 hover:bg-green-600")}
      onClick={() => {
        setClicked(true);
        setTimeout(() => {
          setClicked(false);
        }, 1000);
        if (type === "add_to_cart") {
          trackAddToCart({
            id: id,
            name: title,
            category: category,
            price: price
          });
        } else if (type === "remove_from_cart") {
          trackRemoveFromCart({
            id: id,
            name: title,
            category: category,
            price: price
          });
        } else if (type === "add_to_wishlist") {
          trackAddToWishlist({
            id: id,
            name: title,
            category: category,
            price: price
          });
        } else if (type === "remove_from_wishlist") {
          trackAddToWishlist({
            id: id,
            name: title,
            category: category,
            price: price
          });
        } else if (type === "checkout") {
          trackCheckout({
            id: id,
            name: title,
            category: category,
            price: price
          });
        }
      }}>
      {children}
    </Button>
  );
};

interface ShopCardProps {
  id: string;
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
  id,
  title,
  description,
  price,
  image,
  rating,
  category
}: ShopCardProps) => {
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
          <Button
            className="w-full"
            onClick={() =>
              trackViewContent({
                id: id,
                name: title,
                category: category,
                price: price
              })
            }>
            Buy Now
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <div className="space-y-2 my-5">
              <ButtonCard
                type="add_to_cart"
                id={id}
                title={title}
                category={category}
                price={price}>
                Add To Cart
              </ButtonCard>
              <ButtonCard
                type="remove_from_cart"
                id={id}
                title={title}
                category={category}
                price={price}>
                Remove From Cart
              </ButtonCard>

              <ButtonCard
                type="add_to_wishlist"
                id={id}
                title={title}
                category={category}
                price={price}>
                Add To Wishlist
              </ButtonCard>

              <ButtonCard
                type="remove_from_wishlist"
                id={id}
                title={title}
                category={category}
                price={price}>
                Remove From Wishlist
              </ButtonCard>

              <ButtonCard
                type="checkout"
                id={id}
                title={title}
                category={category}
                price={price}>
                Checkout
              </ButtonCard>
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
