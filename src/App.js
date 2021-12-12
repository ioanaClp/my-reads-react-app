import { useState, useEffect } from "react"
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route, useLocation } from "react-router-dom";

const DEBOUNCE_DELAY = 200 // 0.2s

function App() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [filteredBooks, setFilteredBooks] = useState([])
  const location = useLocation()
  const [debounceHandler, setDebouceHandler] = useState(null)

  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const response = await BooksAPI.getAll()

        setBooks(response)
      } catch (err) {
        alert("Server couldn't load the books")
      }
    }

    fetchBooks()
  }, [])

  const handleMoveTo = async (book, newShelf) => {
    try {
      // Update the book on server
      await BooksAPI.update(book, newShelf)

      // UI: Find the book in the list of all books and modify the shelf to the new shelf and update the books in the state
      const newBooksList = changeShelf(books, newShelf, book.id)
      setBooks(newBooksList)

      // UI: Find the book in the list of filtered books and modify the shelf to the new shelf and update the filtered books in the state
      const newFilteredBooksList = changeShelf(filteredBooks, newShelf, book.id)
      setFilteredBooks(newFilteredBooksList)
    } catch {
      // TODO shoe an error
      alert("Server couldn't update the book")
    }
  }

  /**
   * 
   * @param {the list of books} booksList 
   * @param {* the new shelf} newShelf 
   * @param {* the id of the book that has to update the shelf} bookId 
   * @returns a new list of books that has a modified shelf for one specific id 
   */
  const changeShelf = (booksList, newShelf, bookId) => {
    return booksList.map(book => {
      if (bookId === book.id) {
        book.shelf = newShelf
        return book
      } else {
        return book
      }
    })
  }

  const handleSearch = async (query) => {
    setSearch(query)

    // if not query, stop
    if (!query) {
      setFilteredBooks([])
      return
    }

    // If a timeout job exists we clear it because we already have a new one
    if (debounceHandler) {
      clearTimeout(debounceHandler)
    }

    // We don't call the server imediatelly, we wait 0.3 seconds just in case we press more characters
    const newHandler = setTimeout(async () => {
      const response = await BooksAPI.search(query)

      if (response.error) {
        setFilteredBooks([])
        return
      } else {
        // We change the list of books we got from server and we set the shelf if we already have it set in the other list with all the books
        response.map(responseBook => {
          // If we have any book in the all books state we get its state and use it in our filtered list
          const existingBook = books.find(book => book.id === responseBook.id)
          if (existingBook) {
            responseBook.shelf = existingBook.shelf;
          } else {
            responseBook.shelf = "none"
          }

          return responseBook
        })
        setFilteredBooks(response)
      }
    }, DEBOUNCE_DELAY) // to run after

    setDebouceHandler(newHandler)
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
