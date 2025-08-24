import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Books = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books");
        setData(response.data);
        console.log("Books Data : ", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/books/${id}`);
  }

  return (
    <div className="container">
      {
        (data.length > 0) ? (
          <div className="row d-flex justify-content-center mt-4">
            {
              data.map((item) => {
                return (
                  <div key={item.id} className="col-md-3 text-center">
                    <div className="card bg-black text-white">
                      <img src="data:image/jpeg;base64,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" alt="books" className="card-img-top" />
                      <div className="card-header">
                        <div className="card-title">
                          {item.title}
                        </div>
                      </div>
                      <div className="card-body">

                        <div className="card-text">
                          Author: {item.author}
                        </div>
                        <div className="card-text">
                          Genre: {item.genre}
                        </div>
                        <div className="card-text">
                          Price: {item.price}
                        </div>
                        <div className="card-text" style={{color: (item.stock>0) ? "green" : "red"}}>
                          Stock: {item.stock}
                        </div>
                      </div>
                      <div className="card-footer">
                        <button className="btn btn-primary d-flex m-auto" onClick={() => { handleNavigate(item.id) }}>
                          View Details
                        </button>
                      </div>
                    </div>

                  </div>
                )
              })
            }
          </div>
        ) : (
          <>
            <h1 className="text-danger">No Books to Show!!!</h1>
          </>
        )
      }
    </div>
  )
}

export default Books