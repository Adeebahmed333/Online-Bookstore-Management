const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">BookVerse – Online Bookstore</a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/books">Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/books-table">Books Table</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/add-book">Add Book</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/orders">Orders</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar