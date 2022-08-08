import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.scss";
import axios from 'axios';

const Home = () => {
  // Define state
  const [backendData, setBackendData] = useState([]);
  const [query, setQuery] = useState([]);  

  // Function to delete data
  const deleteItem = async (id) => {
    await axios.delete(`/api/v1/product/${id}`)
    fetchData();
  }

  // Function to fetch data from backend
  const fetchData = async () => {
    const res = await axios.get(`/api/v1/product?q=${query}`);
    setBackendData(res.data);
  };

  // Use useEffect to synchronize data from backend
  useEffect(() => {
    
    fetchData();
  }, [query]);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={e=>setTimeout(() => setQuery(e.target.value), [2000])}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        
          {(typeof backendData == "undefined") ? (
            <p>Loading...</p>
          ) : (
            backendData.map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{item.name}</td>
                <td className="text-right">RP. {item.price}</td>
                <td className="text-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">
                    Detail
                  </Link>
                  <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <Link to="/#" onClick={() => deleteItem(item._id)} className="btn btn-sm btn-danger">
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
