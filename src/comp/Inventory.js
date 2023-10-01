import React, { useState } from "react";
import ProductForm from "./ProductForm";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  
  const addProductToInventory = (product) => {
    setInventory([...inventory, product]);
  };

  return (
    <div>
      <h1>Product Inventory Dashboard</h1>
      <ProductForm addProductToInventory={addProductToInventory} />
      <h2>Inventory</h2>
      <ul>
        {inventory.map((product, index) => (
          <li key={index}>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            {product.image && (
              <img
                src={URL.createObjectURL(product.image)}
                alt={product.name}
                width="100"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;

