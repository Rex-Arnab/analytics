"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { fetchCarts } from "@/lib/analytic";
import { Button } from "@/components/ui/button";

interface Cart {
  _id: string;
  _sessionId: string;
  uid: string;
  domain_id: string;
  action_id: string;
  value: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface CartItem {
  sku: string;
  product_name: string;
  product_category: string;
  product_variant: string;
  product_brand: string;
  price: number;
  quantity: number;
  _id: string;
}

function CartCard({ cart }: { cart: Cart }) {
  const [copy, setCopy] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopy(true);
    setTimeout(() => setCopy(false), 1000);
  };

  return (
    <div className="bg-white p-5 my-5 rounded-md">
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => copyToClipboard(cart._id)}>
        Cart ID: {cart._id}
        <span className="text-sm text-blue-500 ml-2">{copy && "Copied!"}</span>
      </h2>
      <p>Action ID: {cart.action_id}</p>
      <p>value: {cart.value}</p>
      <p>Items: {cart?.items?.length}</p>
      <p>
        quantity: {cart?.items?.reduce((acc, item) => acc + item.quantity, 0)}
      </p>
    </div>
  );
}

function Pagination({
  cartsPerPage,
  totalCarts,
  currentPage,
  paginate
}: {
  cartsPerPage: number;
  totalCarts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}) {
  const pageNumbers = [];

  // Calculate the number of pages to show before and after the current page
  const pagesToShow = 1;
  const totalPages = Math.ceil(totalCarts / cartsPerPage);
  let startPage = Math.max(1, currentPage - pagesToShow);
  let endPage = Math.min(totalPages, currentPage + pagesToShow);

  // Add ellipsis if there are more pages to show
  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  // Add the page numbers between startPage and endPage
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis if there are more pages to show
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((number: any) => (
          <li
            key={number}
            className={`${
              number === currentPage ? "bg-slate-400" : "bg-slate-300"
            } p-3 m-1 cursor-pointer`}
            onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Cart() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [cartData, setCartData] = useState<any[]>([]);

  const listCarts = async () => {
    const response = await fetchCarts();
    setCartData(response);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [cartsPerPage, setCartsPerPage] = useState(5);

  // Logic to calculate the indexes of the carts to be displayed
  const indexOfLastCart = currentPage * cartsPerPage;
  const indexOfFirstCart = indexOfLastCart - cartsPerPage;
  const currentCarts = cartData.slice(indexOfFirstCart, indexOfLastCart);

  // Logic to change the current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="bg-slate-200 p-5 min-h-screen w-full max-w-5xl mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold text-center">Saved Carts</h1>
      <Button onClick={listCarts}>Fetch Carts</Button>
      {currentCarts.map((cart) => (
        <CartCard key={cart._id} cart={cart} />
      ))}
      <Pagination
        cartsPerPage={cartsPerPage}
        totalCarts={cartData.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
}

export default Cart;
