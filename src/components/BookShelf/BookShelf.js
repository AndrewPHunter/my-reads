import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import BookList from '../BookList';

export class BookShelf extends PureComponent{

  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    shelfList: PropTypes.object.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  render(){
    const {title, category, shelfList, books, onBookUpdated} = this.props;

    return(
      <div className="bookshelf">
        <div className="bookshelf-shelf">
          <h1 className="bookshelf-shelf--title">{title}</h1>
          <div className="bookshelf-shelf--list">
            <BookList
              books={books}
              category={category}
              shelfList={shelfList}
              onBookUpdated={onBookUpdated}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
