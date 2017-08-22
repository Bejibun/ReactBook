import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfList from "./BookShelfList.js";
import SearchBook from "./SearchBook.js"
import {Route} from 'react-router-dom';

export default class App extends React.Component {
  constructor(args) {
        super(args);
        this.state = {
            books: [],
            loading: true,
        }
    }

componentDidMount() {
  BooksAPI.getAll().then(books => {
    this.setState({books:books, loading: false})
  })
}

onShelfChanged = (book, shelf) => {
  BooksAPI.update(book, shelf).then(
    this.setState((state) => ({
      books: state.books.map(b => {
        if (b.title === book.title){
          b.shelf = shelf;
          return b
        }else{
          return b
        }
      }),
    loading: false
  }))
  )
};

  render() {
    const state = this.state;
    const currentlyReading = state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = state.books.filter((book) => book.shelf === 'wantToRead')
    const read = state.books.filter((book) => book.shelf === 'read')

    return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <div>
                        <div className="list-books-title">
                            <h1>myReads</h1>
                        </div>
                        {
                            !state.loading ? (
                                <BookShelfList
                                    currentlyReading={currentlyReading}
                                    wantToRead={wantToRead}
                                    read={read}
                                    onShelfChanged={this.onShelfChanged}
                                />
                            ) : (
                                <div className="loader"/>
                            )
                        }
                    </div>
                )}/>
                <Route path="/search" render={({history}) => (
                    <SearchBook
                        onShelfChanged={this.onShelfChanged}
                        history={history}
                        books={currentlyReading.concat(wantToRead, read)}
                    />
                )}/>
            </div>
        )
    }
}
