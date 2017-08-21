import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI.js';
import Book from './Book';

export default class SearchBook extends Component {
    constructor(args) {
        super(args);
        this.state = {
            result: []
        }
    }

    search = (e) => {
        const query = e.target.value;
        if (!query) {
            this.setState({result: []});
            return;
        }
        BooksAPI.search(query, 20).then(result => {
            if (result.error) {
                result = [];
            }
            result = result.map((book) => {
                const bookInShelf = this.props.books.find(b => b.id === book.id);
                if (bookInShelf) {
                    book.shelf = bookInShelf.shelf;
                }
                return book;
            });
            this.setState({result});
        });
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.search}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.result && this.state.result.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChanged={this.props.onShelfChanged}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}