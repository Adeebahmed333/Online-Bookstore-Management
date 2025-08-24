import { useState } from "react"
import axios from "axios"

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorGender: "",
    genre: "",
    price: "",
    stock: ""
  })

  const [formErrors, setFormErrors] = useState({
    title: "",
    author: "",
    authorGender: "",
    genre: "",
    price: "",
    stock: ""
  })

  const [formValid, setFormValid] = useState({
    title: false,
    author: false,
    authorGender: false,
    genre: false,
    price: false,
    stock: false,
    buttonEnabled: false,
  })
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const genreData = ["Fiction", "Non-fiction", "Sci-Fi", "Mystery"];

  const validateForm = (fieldName, fieldValue) => {
    const newFormErrors = { ...formErrors };
    const newFormValid = { ...formValid };
    switch (fieldName) {
      case "title":
        if (!/^[a-zA-Z\s]{3,}$/.test(fieldValue)) {
          newFormErrors.title = "Regex Validation Failed";
          newFormValid.title = false;
        }
        else {
          newFormErrors.title = "";
          newFormValid.title = true;
        }
        break;
      case "author":
        if (!/^[a-zA-Z\s]{3,}$/.test(fieldValue)) {
          newFormErrors.author = "Regex Validation Failed";
          newFormValid.author = false;
        }
        else {
          newFormErrors.author = "";
          newFormValid.author = true;
        }
        break;
      case "genre":
        if (fieldValue === "") {
          newFormErrors.genre = "Genre Can't be Empty";
          newFormValid.genre = false;
        }
        else {
          newFormErrors.genre = "";
          newFormValid.genre = true;
        }
        break;
      case "authorGender":
        if (fieldValue === "") {
          newFormErrors.authorGender = "Author Gender Can't be Empty";
          newFormValid.authorGender = false;
        }
        else {
          newFormErrors.authorGender = "";
          newFormValid.authorGender = true;
        }
        break;
      case "price":
        if (!/^\d+$/.test(fieldValue)) {
          newFormErrors.price = "Regex Validation Failed";
          newFormValid.price = false;
        }
        else if (Number(fieldValue) <= 0) {
          newFormErrors.price = "Can't Be Negative or Zero";
          newFormValid.price = false;
        }
        else {
          newFormErrors.price = "";
          newFormValid.price = true;
        }
        break;
      case "stock":
        if (!/^\d+$/.test(fieldValue)) {
          newFormErrors.stock = "Regex Validation Failed";
          newFormValid.stock = false;
        }
        else if (Number(fieldValue) < 0) {
          newFormErrors.stock = "Can't Be Negative";
          newFormValid.stock = false;
        }
        else {
          newFormErrors.stock = "";
          newFormValid.stock = true;
        }
        break;
      default:
        break;
    }
    newFormValid.buttonEnabled = newFormValid.author && newFormValid.genre && newFormValid.price && newFormValid.stock && newFormValid.title && newFormValid.authorGender
    setFormErrors(newFormErrors);
    setFormValid(newFormValid);
  }

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = {
      ...formData,
      [fieldName]: fieldValue
    }
    setFormData(newFormData);
    validateForm(fieldName, fieldValue);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/books", formData);
      console.log(response);
      setSuccess("Form Submitted Successfully!");
    } catch (error) {
      setError("Error While Submitting The Form!");
      console.log(error.message);
    }
    setTimeout(() => {
      setFormData({
        title: "",
        author: "",
        genre: "",
        price: "",
        stock: ""
      });
      setFormErrors({
        title: "",
        author: "",
        genre: "",
        price: "",
        stock: ""
      });
      setFormValid({
        title: false,
        author: false,
        genre: false,
        price: false,
        stock: false,
        buttonEnabled: false
      });
      setSuccess("");
      setError("");
    }, 5000)
  }

  return (
    <div className="container bg-black text-white p-3" style={{ width: "600px" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="form-control" />
          <span className="text-danger">{formErrors.title}</span>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className="form-control" />
          <span className="text-danger">{formErrors.author}</span>
        </div>
        <label className="form-label">Author Gender:&nbsp;&nbsp;</label>
        <div className="form-check form-check-inline">
          <input type="radio" id="authorGender" name="authorGender" value="male" onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" id="authorGender" name="authorGender" value="female" onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">Female</label>
        </div>
        <span className="text-danger">{formErrors.authorGender}</span>
        <div className="form-group mb-3">
          <label htmlFor="genre" className="form-label">Genre:</label>
          <select type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} className="form-select" >
            <option value="" >--Select Genre--</option>
            {
              genreData.map((item, index) => {
                return (
                  <option value={item} key={index}>{item}</option>
                )
              })
            }
          </select>
          <span className="text-danger">{formErrors.genre}</span>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="form-control" />
          <span className="text-danger">{formErrors.price}</span>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="stock" className="form-label">Stock:</label>
          <input type="text" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="form-control" />
          <span className="text-danger">{formErrors.stock}</span>
        </div>
        <button className="btn btn-success d-flex m-auto" type="submit" disabled={!formValid.buttonEnabled}>Add Book</button>
        {success !== "" && <span className="text-success text-center">{success}</span>}
        {error !== "" && <span className="text-danger text-center">{error}</span>}
      </form>

    </div>
  )
}

export default AddBook