import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

export class BookList extends PureComponent{

  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    category: PropTypes.string.isRequired,
    shelfList: PropTypes.object.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  mapBooksToItems = (books, shelfList, category, onBookUpdated)=>(
    books.map(book=>(
      <li key={book.id} className="booklist-item">
        <Book
          book={book}
          shelfList={shelfList}
          category={category}
          onBookUpdated={onBookUpdated}
        />
      </li>
    ))
  );

  render(){

    const {books, shelfList, category, onBookUpdated} = this.props;

    return(
      <ol className="booklist">
        {this.mapBooksToItems(books, shelfList, category, onBookUpdated)}
      </ol>
    );
  }
}

export default BookList;
