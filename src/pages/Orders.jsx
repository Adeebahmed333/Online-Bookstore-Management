import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [])

  return (

    <div className="container mt-4">
      {
        (data.length > 0) ? (
          <table className="table table-striped table-bordered table-hover table-dark bg-dark">
            <thead className="table-dark">
              <tr>
                <th>
                  #
                </th>
                <th>
                  Customer Name
                </th>
                <th>
                  Book Title
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.customerName}</td>
                    <td>{item.bookTitle}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.status === "Delivered" ? (
                        <span className="badge bg-success">{item.status}</span>
                      ) : item.status === "Pending" ? (
                        <span className="badge bg-primary">{item.status}</span>
                      ) : (
                        <span className="badge bg-warning">{item.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <>
            <h1>No Data Found!!!</h1>
          </>
        )
      }
    </div>
  )
}

export default Orders