import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './data/';
import Product from './Product';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filteredProduct = items.filter((product) => product.id == id);
    setProduct(filteredProduct[0]);

    const related = items.filter(
      (suman) => suman.category === filteredProduct[0]?.category
    );
    setRelatedProducts(related);
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {
      id,
      price,
      title,
      description,
      imgSrc
    };
    setCart([...(cart || []), obj]);
    console.log("Cart element = ", cart);
    toast.success('item added on cart', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="container-con">
        <div className="img">
          <img src={product.imgSrc} alt="" />
        </div>
        <div className='text-center'>
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary mx-3">{product.price}₹</button>
          <button
            onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
            className="btn btn-warning">Add to cart</button>
        </div>
      </div>
      <h1 className='text-center'>Related Products</h1>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetail;
g