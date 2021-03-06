import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import LoadingOverlay from 'react-loading-overlay';

const Library = props => {
  const { myBooks, updateBook, handleSelect, openLoader } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <LoadingOverlay
        active={openLoader}
        spinner
        text='Loading...'>
        <div className="list-books-content">
          <div>
            <BookShelf title={'Currently Reading'} myBooks={myBooks.filter(book => book.shelf === 'currentlyReading')} handleSelect={handleSelect} updateBook={updateBook} />
            <BookShelf title={'Want to Read'} myBooks={myBooks.filter(book => book.shelf === 'wantToRead')} handleSelect={handleSelect} updateBook={updateBook} />
            <BookShelf title={'Read'} myBooks={myBooks.filter(book => book.shelf === 'read')} handleSelect={handleSelect} updateBook={updateBook} />
          </div> 
        </div>
        <Link to='/search' className='open-search'>Add a book</Link>
      </LoadingOverlay>
    </div>
  );
};

export default Library;

Library.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  openLoader: PropTypes.func.isRequired
};