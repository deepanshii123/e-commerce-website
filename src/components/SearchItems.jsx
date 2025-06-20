import React from 'react';
import { useParams } from 'react-router-dom';
import { items } from './data/';
import Product from './Product';

const SearchItem = ({ cart, setCart }) => {
  const { Term } = useParams();
  const [filterData, setFilterData] = React.useState([]);

  React.useEffect(() => {
    const filteredData = () => {
      const data = items.filter((p =>
        Term && p.title.toLowerCase().includes(Term.toLowerCase())
      ));
      setFilterData(data);
    };
    filteredData();
  }, [Term]);

  return (
    <Product cart={cart} setCart={setCart} items={filterData} />
  )
};

export default SearchItem;
