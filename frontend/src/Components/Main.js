
import React from 'react';
import '../Styles/Main.css';
import Books from './Books'
import Users from './Users'
import Search from './Search'
import BorrowedBooks from './BorrowedBooks'
import Button from './Interface/Button'
import axios from 'axios'
import AutoComplete from './AutoComplete';

const ServerUrl = 'http://localhost:5000'

const Main = () => {

  const [user, setUser] = React.useState(-1)
  const [book, setBook] = React.useState(-1)
  const [borrowedBook, setBorrowedBook] = React.useState(-1)
  const [cantBorrow, setCantBorrow] = React.useState([])

  const [users, setUsers] = React.useState(null)
  const [books, setBooks] = React.useState(null)
  const [borrowedBooks, setBorrowedBooks] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [autoComplete, setAutoComplete] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      let newBorrowedBooks = await axios.get(`${ServerUrl}/borrow`)
      let newUsers = await axios.get(`${ServerUrl}/users`)
      let newBooks = await axios.get(`${ServerUrl}/books`)
      setUsers(newUsers.data)
      setBorrowedBooks(newBorrowedBooks.data)
      setBooks(newBooks.data)
    }
    getData()
  }, [setBooks])

  // loading div
  if (!books || !users || !borrowedBooks) {
    return <div> loading </div>
  }

  // main
  else {
    const handleSearchBar = async (str) => {
      setAutoComplete('')
      if (str) {
        let newBooks = await axios.get(`${ServerUrl}/search?term=${str}`)
        setBooks(newBooks.data)
      } else {
        let newBooks = await axios.get(`${ServerUrl}/books`)
        setBooks(newBooks.data)
      }
    }

    const handleAutoComplete = async (str) => {
      setSearch('')
      if (str) {
        let newBooks = await axios.get(`${ServerUrl}/autocomplete?term=${str}`)
        setBooks(newBooks.data)
      } else {
        let newBooks = await axios.get(`${ServerUrl}/books`)
        setBooks(newBooks.data)
      }
    }
    
    // Borrow Click handler
    const handleBorrowClick = async () => {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
      let body = {
        book_id: +book,
        user_id: +user
      }
      axios.post(`${ServerUrl}/borrow`, body, axiosConfig)
        .then(async (resp) => {
          let newBorrowedBooks = await axios.get(`${ServerUrl}/borrow`, axiosConfig)
          setBorrowedBooks(newBorrowedBooks.data)
          setBorrowedBook(book)
        })
    }

    // Return Click handler
    const handleReturnClick = async () => {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
      let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
      let body = {
        book_id: +borrowedBook
      }
      axios.delete(`${ServerUrl}/borrow`, { data: body }, { headers: headers})
        .then(async (resp) => {
          let newBorrowedBooks = await axios.get(`${ServerUrl}/borrow`, axiosConfig)
          setBorrowedBooks(newBorrowedBooks.data)
        })
    }

    // main render
    return (
      <div className="main">
        <h1>Library</h1>
        <div className="main">
          <div className="bars">
          <Search handleSearchBar={handleSearchBar}/>
          <AutoComplete value={autoComplete} books={books} handleAutoComplete={handleAutoComplete} />
          </div>

          <Books books={books} setBook={setBook} />
          <div className="buttons">
            <Button color='blue' onClick={handleBorrowClick}>Borrow</Button>
            <Button color='red' onClick={handleReturnClick}>Return</Button>
          </div>
          <div className="sub-main">
            <BorrowedBooks borrowedBooks={borrowedBooks} setBorrowedBook={setBorrowedBook} />
            <Users users={users} setUser={setUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default Main;