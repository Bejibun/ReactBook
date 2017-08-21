import React, {Component} from 'react';
import BookShelf from './BookShelf.js';
import {Link} from 'react-router-dom';

export default class BookShelfList extends Component
{
	render(){
		return(
			<div className="list-books">
            	<div className="list-books-content">
            		<div>
                        <BookShelf shelfTitle='Currently Reading' bookList={this.props.currentlyReading}
                                   onShelfChanged={this.props.onShelfChanged}/>
                        <BookShelf shelfTitle='Want to Read' bookList={this.props.wantToRead}
                                   onShelfChanged={this.props.onShelfChanged}/>
                        <BookShelf shelfTitle='Read' bookList={this.props.read}
                                   onShelfChanged={this.props.onShelfChanged}/>
                    </div>
            	</div>
            	<div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
           	</div>
		);
	}
}