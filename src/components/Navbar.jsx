import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { items } from './data/';
import { BsFillCartCheckFill } from 'react-icons/bs';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  }

  const filterByPrice = (price) => {
    const element = items.filter((product) => product.price >= price);
    setData(element);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  }

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);

    if (val === "") {
      setData([...items]);
    } else {
      const filtered = items.filter(product =>
        product.title.toLowerCase().includes(val.toLowerCase())
      );
      setData(filtered);
    }
  };

  return (
    <>
      <header className='sticky-top'>
        <div className='nav-bar'>
          <Link to='/' className='brand'>
            e-cart
          </Link> 

          <form
            onSubmit={handleSubmit}
            className='search-bar'>
            <input 
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              placeholder='search products' />
          </form>

          <Link to='/cart' className='cart'>
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>

        {
          location.pathname === '/' && (
            <div className="nav-bar-wrapper">
              <div className="items">filter by {"-"}</div>
              <div onClick={() => setData([...items])} className="items">no filter</div>
              <div onClick={() => filterByCategory('mobiles')} className="items">mobiles</div>
              <div onClick={() => filterByCategory('laptops')} className="items">laptops</div>
              <div onClick={() => filterByCategory('tablets')} className="items">tablets</div>
              <div onClick={() => filterByPrice('29999')} className="items">{">="}29999</div>
              <div onClick={() => filterByPrice('49999')} className="items">{">="}49999</div>
              <div onClick={() => filterByPrice('69999')} className="items">{">="}69999</div>
              <div onClick={() => filterByPrice('89999')} className="items">{">="}89999</div>
            </div>
          )
        }
      </header>
    </>
  );
};

export default Navbar;
