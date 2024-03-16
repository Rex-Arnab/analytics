"use client";

import ProductData from "@/app/products.json";
import { IndianRupee } from "lucide-react";
import Image from "next/image";

interface ShopCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

const ShopCard = ({
  title,
  description,
  price,
  image
}: Partial<ShopCardProps>) => {
  return (
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
      <h1 className="text-lg font-bold">{title}</h1>
      {description && (
        <p>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
      )}
      <p className="flex items-center">
        <div className="text-lg font-bold flex items-center">
          <IndianRupee />
          <span>{price}</span>
        </div>
      </p>
    </div>
  );
};

function ShopPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-slate-900 mb-5 mt-5">
        Shop Page
      </h1>
      <div className="space-y-5">
        {ProductData.map((product) => (
          <ShopCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
