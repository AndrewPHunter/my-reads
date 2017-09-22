import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import BookCover from '../../components/BookCover';
import StarRating from '../../components/StarRating';

export class SearchItem extends PureComponent{

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfList: PropTypes.object.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  onBookUpdated = (shelf)=>{

    const updatedBook = {
      ...this.props.book,
      ...{shelf}
    };

    this.props.onBookUpdated(updatedBook);

  };

  renderBookCover = (imageLink) => (

    <BookCover width={128}
               height={193}
               imageLink={imageLink}
    />

  );

  renderBookDetail = ({ title,
                        subtitle,
                        authors,
                        publishedDate,
                        averageRating,
                        description}) =>
  (
    <div className="book-detail--grid">
      <div className="book-detail--line">
        <h1 className="book-detail--inline">{title}</h1>
        {subtitle && <h2 className="book-detail--inline book-detail--inline-pad">{`(${subtitle})`}</h2>}
      </div>
      <div className="book-detail--line">
        <h4 className="book-detail--inline">{authors && `by ${authors.join(', ')}`}</h4>
        <p className="book-detail--inline book-detail--inline-pad">
          {new Date(publishedDate).getFullYear()}
        </p>
        {averageRating && <StarRating rating={averageRating}
                                      className="book-detail--inline star-container"
                          />
        }
      </div>
      <p className="book-detail--line">{description}</p>
    </div>
  );

  renderBookActionItems = (shelf, shelfList, onBookUpdated)=>(
    <ul className="book-actions--list">
      {Object
        .keys(shelfList)
        .map(key=>(
          <li key={key}
              className={`book-actions--item ${key === shelf ? 'active':''}`}
          >
            <Button
              className="book-actions--button"
              raised
              onClick={onBookUpdated.bind(null, key)}
            >
              {shelfList[key]}
            </Button>
          </li>
        ))
      }
    </ul>
  );

  render(){

    const {book, shelfList} = this.props;
    const hasBookCover = book.imageLinks && book.imageLinks.smallThumbnail;

    return(
      <div className="search-item">
        <div className="search-item--info">
          <div className="book-cover--container">
            {hasBookCover && this.renderBookCover(book.imageLinks.smallThumbnail)}
          </div>
          <div className="book-detail--container">
            {this.renderBookDetail(book)}
            <div className="book-actions--container">
              {this.renderBookActionItems(book.shelf, shelfList, this.onBookUpdated)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchItem;
