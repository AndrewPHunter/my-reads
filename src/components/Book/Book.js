import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import BookCover from '../BookCover';
import BookActionButton from './BookActionButton';


export class Book extends PureComponent{

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfList: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  onActionSelected = (shelf) => {

    const updatedBook = {
      ...this.props.book,
      ...{shelf}
    };

    this.props.onBookUpdated(updatedBook);

  };

  render(){

    const {book, shelfList, category} = this.props;
    const {title, authors, imageLinks} = book;

    return(
      <div className="book book-hover">
        <div className="book-top">
          <BookCover
            className="book-top--cover"
            width={128}
            height={193}
            imageLink={imageLinks.smallThumbnail}
          />
          <div className="book-top--action">
            <BookActionButton
              id={title}
              category={category}
              shelfList={shelfList}
              onActionSelected={this.onActionSelected}
            />
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors && <div className="book-authors">{authors.join(' ')}</div>}
      </div>
    );
  }
}

export default Book;
