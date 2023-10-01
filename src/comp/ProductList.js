import React from 'react';
import Products from './products.json';

const ProductList = () => {


  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {Products.map((product, index) => (
          <div className="product-card" key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <img src={`/uploads/${product.image}`} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;