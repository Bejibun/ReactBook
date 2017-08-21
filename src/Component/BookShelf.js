import React, {Component} from 'react';
import Book from "./Book.js";

export default class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.bookList.map((book) => {
                                return <li key={book.id}>
                                    <Book book={book} onShelfChanged={this.props.onShelfChanged}/>
                                </li>
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}