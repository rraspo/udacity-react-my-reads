import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func
  }

  state = {
    books: this.props.books
  }

  render() {
    const { title, books } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              <li key={index}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  imageUrl={book.imageLinks.thumbnail}
                  shelf={book.shelf}
                  onShelfChange={this.props.onShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
