import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
    const [data, setData] = useState([]);
    const [outOfStock, setOutOfStock] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/books");
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        function outOfStockCalc() {
            if (data.length > 0) {
                let filteredData = data.filter((item, index) => {
                    return item.stock <= 0;
                });
                setOutOfStock(filteredData);
                console.log("filtered data: ",filteredData);
            }
        }
        outOfStockCalc();
    },[data]);


    return (
        <>
            <h1 className="text-center">BookVerse – Online Bookstore</h1>
            <div className="container bg-black" style={{width:"400px", color:"white", borderRadius:"10px", height:"300px"}}>
                <h3 className="text-center">Total Books : {data.length}</h3>
                <h3 className="text-center">Books Out of Stock:</h3>
                {
                    outOfStock.map((item, index)=>{
                        return(
                          <>
                          <li key={item.id} className="text-center" style={{listStyle:"none"}}>
                            {index+1 + '.' + item.title}
                          </li>
                          </>
                        );
                    })
                }

            </div>
        </>
    )
}

export default Home