import { useState, useEffect } from "react";
import axios from "axios";

const BooksTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      {
        (data.length > 0) ? (
          <table className="table table-striped table-bordered table-hover bg-dark mt-4">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>

              {

                data.map((item) => {
                  return (
                    <tr>
                      <td>
                        {
                          item.id
                        }
                      </td>
                      <td>
                        {
                          item.title
                        }
                      </td>
                      <td>
                        {
                          item.author
                        }
                      </td>
                      <td>
                        {
                          item.genre
                        }
                      </td>
                      <td>
                        {
                          item.price
                        }
                      </td>
                      <td style={{color: (item.stock===0)? "red" : (item.stock>50) ? "green" : "black" }}>
                        {
                          item.stock
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        ) : (
          <h1 className="text-danger">No Books To Show!!!</h1>
        )
      }
    </div>
  )
}

export default BooksTable