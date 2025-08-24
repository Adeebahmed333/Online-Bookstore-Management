import axios from "axios";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setData(response.data);
        console.log("book response", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="card bg-black text-white d-flex m-auto mt-4 text-center" style={{ width: "300px", height: "300px", borderRadius: "5px" }}>
      <div className="card-header">
        <div className="h3">{data?.title}</div>
      </div>
      <div className="card-body">
        <div className="card-text">{data?.title}</div>
        <div className="card-text">
          Author: {data.author}
        </div>
        <div className="card-text">
          Genre: {data.genre}
        </div>
        <div className="card-text">
          Price: {data.price}
        </div>
        <div className="card-text" style={{ color: (data.stock > 0) ? "green" : "red" }}>
          Stock: {data.stock}
        </div>
      </div>
      <div className="card-footer d-flex" style={{ justifyContent: "space-between" }}>
        <button className="btn btn-danger" >Delete Book</button>
        <button className="btn btn-warning" onClick={() => { navigate(`/edit-book/${id}`) }}>Edit Book</button>
      </div>
    </div>
  )
}

export default BookDetails