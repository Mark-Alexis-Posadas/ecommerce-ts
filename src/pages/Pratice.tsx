import { useState } from "react";
import React from "react";
import ProductItem from "../components-practice/ProductItem";
import ProductItemTwo from "../components-practice/ProductItemTwo";
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    category: "Accessories",
    inStock: false,
  },
  {
    id: 4,
    name: "Keyboard",
    price: 70,
    category: "Accessories",
    inStock: true,
  },
];

const Pratice = () => {
  const [name, setName] = useState<string>("");
  const [submittedValue, setSetSubmittedValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSetSubmittedValue(name);
    setName("");
  };

  const product = products.map((product) => product);

  return (
    <>
      <ProductItemTwo product={product} key={product.id} />
      <ProductItem product={{ title: "Headphones", price: 1000 }} />
      <ProductItem product={{ title: "Mouse", price: 500, inStock: false }} />
      <form onSubmit={handleSubmit}>
        {submittedValue}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <button type="submit">submit string</button>
      </form>
    </>
  );
};

export default Pratice;
