import { Link } from "react-router-dom";
import "./index.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  //state
  const [backendData, setBackendData] = useState([]);

  // Get ID from parameter URL
  const { id } = useParams([]);

  // Hook useEffect
  useEffect(() => {
    const getDataById = async () => {
      // Get data from server
      const res = await axios.get(`/api/v1/product/${id}`);
      // Assign data
      setBackendData(res.data);
    };
    //Call function "getDataById"
    getDataById();
  }, [id]);

  // console.log(backendData.price);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
          {typeof backendData == "undefined" ? (
            <p>Loading...</p>
          ) : (
            backendData.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>ID</td>
                  <td>: {item._id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>: {item.name}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>: {item.price}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>: {item.stock}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>: { item.status ? 'Active' : 'Not Active' }</td>
                </tr>
              </tbody>
            ))
          )}
      </table>
    </div>
  );
};

export default Detail;
