import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    this.setState({
      currentlyReading: [],
      wantToRead: [],
      read: []
    })
    BooksAPI.getAll().then(books => {
      for (var i = 0; i < books.length; i++) {
        var book = books[i]
        switch (book.shelf) {
          case 'currentlyReading':
            this.updateShelf(book, 'currentlyReading')
            break;
          case 'wantToRead':
            this.updateShelf(book, 'wantToRead')
            break;
          case 'read':
            this.updateShelf(book, 'read')
            break;
          default:
        }
      }
    })
  }

  updateShelf = (book, shelf) => {
    this.setState((state) => {
      shelf: state[shelf].push(book)
    })
  }

  onShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.getBooks()
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { this.state.currentlyReading.length && (
                  <Bookshelf
                  title="Currently Reading"
                  books={this.state.currentlyReading}
                  onShelfChange={this.onShelfChange}
                  />
                )}
                { this.state.wantToRead.length && (
                  <Bookshelf
                  title="Want to Read"
                  books={this.state.wantToRead}
                  onShelfChange={this.onShelfChange}
                  />
                )}
                { this.state.read.length && (
                  <Bookshelf
                  title="Read"
                  books={this.state.read}
                  onShelfChange={this.onShelfChange}
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you dont find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
