import React, { useState } from "react";
import axios from 'axios';
import ProductList from "./ProductList";

const ProductForm = ({ addProductToInventory }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('image', product.image);

      const response = await axios.post('/api/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.imageUrl;

      // Reset the form
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
      });

      alert('Product added successfully! Image URL: ' + imageUrl);
  } catch (error) {
    console.error('An error occurred:', error);
  }
  };

  return (
    <div>
    <ProductList />
    <div className="text-center sm:w-3/5 w-5/6 flex flex-col m-auto text-gray-50 mt-32">
      <h2 className="text-orange-600 text-4xl">Register  New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <p className="text-left">Product Name:</p>
          <input
          className="text-gray-50 block w-full m-auto px-2 py-1 font-medium bg-slate-950 rounded-md"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="p-2">
          <p className="text-left">Description:</p>
          <textarea
          className="text-gray-50 block w-full m-auto px-2 py-1 font-medium bg-slate-950 rounded-md"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="p-2">
          <p className="text-left">Price:</p>
          <input
          className="text-gray-50 block w-full m-auto px-2 py-1 font-medium bg-slate-950 rounded-md"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="p-2">
          <p className="text-left">Initial Stock Level:</p>
          <input
          className="text-gray-50 block w-full m-auto px-2 py-1 font-medium bg-slate-950 rounded-md"
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="p-2">
          <p className="text-left">Upload Image:</p>
          <input className="flex bg-slate-950 rounded-md"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="p-2 m-2 bg-orange-600 sm:w-[250px] rounded-md hover:bg-orange-500 hover:cursor-pointer">
          <button className="flex text-center m-auto text-xl font-semibold" type="submit">Add Product</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ProductForm;
