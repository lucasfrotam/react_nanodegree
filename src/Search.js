import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import DebounceInput from 'react-debounce-input';
import LoadingOverlay from 'react-loading-overlay';
import Book from './Book'

class Search extends Component {
  state = {
    prevSearch: '',
    userSearch: '',
    curBooks: [],
    openLoader: false
  };
 
  handleSearch = query => {
    this.setState(() => ({
      userSearch: query,
      openLoader: true
    }));
  };

  componentDidUpdate = () => {
    const { userSearch, prevSearch } = this.state;
    const { myBooks } = this.props;
   

    if (userSearch !== prevSearch){
      if(userSearch !== ''){ // If search is not empty
        BooksAPI.search(userSearch)
          .then(books => {
              if(books !== undefined && books.length > 0){ // If have some result
                const searchBooks = books.map(book => {
                  const myBook = myBooks.filter(myBook => myBook.id === book.id);
                  return myBook.length > 0 ? myBook[0] : book;
                });
                this.setState(() => ({
                  prevSearch: userSearch,
                  curBooks: searchBooks,
                  openLoader: false
                }));
              } else {
                this.setState(() => ({
                  prevSearch: userSearch,
                  curBooks: [],
                  openLoader: false
                }));
              };
          });
      } else {
        this.setState(() => ({
          prevSearch: userSearch,
          curBooks: [],
          openLoader: false
        }));
      };
    };
   };

  render() {
    const { handleSearch } = this;
    const { userSearch, curBooks, openLoader } = this.state;
    const { updateBook, handleSelect } = this.props;

    return (
      <div className="search-books">
        <LoadingOverlay
        active={openLoader}
        spinner
        text='Loading...'>
          <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                debounceTimeout={600}
                placeholder="Search by title or author"
                value={userSearch}
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            {curBooks !== [] ? (
              <ol className="books-grid">
                {curBooks.map(book => (
                  <Book key={book.id} book={book} updateBook={updateBook} handleSelect={handleSelect} />
                ))}
              </ol>
            ) : (
              <ol className="books-grid"></ol>
            )}
          </div>
        </LoadingOverlay>
      </div>
    );
  };
};

export default Search;

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};