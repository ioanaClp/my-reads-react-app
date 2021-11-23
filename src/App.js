import { useState, useEffect } from "react"
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [filteredBooks, setFilteredBooks] = useState([])
  const location = useLocation()

  console.log("location", location)


  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const response = await BooksAPI.getAll()
        console.log(response)

        setBooks(response)
      } catch (err) {
        console.log("err" + err)
      }
    }

    fetchBooks()
  }, [])

  const handleMoveTo = async (book, newShelf) => {
    console.log(`Move book "${book.title}" into shelf "${newShelf}"`)

    try {
      await BooksAPI.update(book, newShelf)

      // Find the book in the list and modify the shelf to the new shelf
      const newBooksList = books.map(item => {
        if (book.id === item.id) {
          item.shelf = newShelf
          return item
        } else {
          return item
        }
      })

      // Update state
      setBooks(newBooksList)
    } catch {
      // TODO shoe an error
      alert("Server couldn't update the book")
    }
  }

  const handleSearch = async (query) => {
    console.log(query)

    setSearch(query)

    // if not query, stop
    if (!query) {
      setFilteredBooks([])
      return
    }

    const response = await BooksAPI.search(query)
    console.log(response)

    if (response.error) {
      setFilteredBooks([])
      return
    } else {
      setFilteredBooks(response)
    }
  }

  return (
    <div className="App">
      <Header title="My Reads" hasSearch={location.pathname === "/"} hasBackButton={location.pathname !== "/"} />
      <Routes>
        <Route exact path="/" element={<Home books={books} handleMoveTo={handleMoveTo} />}></Route>
        <Route exact path="/search" element={<Search search={search} setSearch={handleSearch} books={filteredBooks} handleMoveTo={handleMoveTo} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
