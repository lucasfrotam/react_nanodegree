import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    openLoader: true
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(res => {
        this.setState(() => ({
          myBooks: res,
          openLoader: false
        }));
      });
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        const myBook = this.state.myBooks.filter(curBook => curBook.id === book.id);
        if(myBook.length === 0) { // If don't have book
          this.setState(curState => ({
            myBooks: curState.myBooks.concat(book)
          }));
        } else {
          const newBooks = this.state.myBooks.map(book => {
            if(book.id === myBook[0].id) book.shelf = shelf;
            return book;
          });
          this.setState(() => ({
            myBooks: newBooks
          }));
        };
      });
  };

  handleSelect = (book, e) => {
    book.shelf = e.target.value;
    this.updateBook(book, e.target.value);
  };

  render() {
    const { updateBook, handleSelect } = this;
    const { myBooks, openLoader } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search myBooks={myBooks} updateBook={updateBook} handleSelect={handleSelect} />
        )} />
        <Route exact path='/' render={() => (
          <Library openLoader={openLoader} myBooks={myBooks} updateBook={updateBook} handleSelect={handleSelect} />
        )} />
      </div>
    );
  };
};

export default BooksApp;