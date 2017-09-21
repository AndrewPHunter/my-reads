import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import startCase from 'lodash.startcase';
import Button from 'react-md/lib/Buttons/Button';
import AppBar from '../../components/AppBar';
import BookShelf from '../../components/BookShelf';
import Categories from '../../utilities/bookshelfCategories';

class HomePage extends Component{

  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  mapBooksToCategories = (categories, books)=>(

    Object.keys(categories)
      .filter(category=>category !== Categories.none)
      .map(key=>({
        title: startCase(categories[key]),
        category: key,
        books: books.filter(book=>book.shelf === categories[key])
      }
    ))

  );

  mapCategoriesToShelfList = (categories)=>(

    Object.keys(categories).reduce((shelfList, key)=> {
      shelfList[key] = startCase(categories[key]);
      return shelfList;
    }, {})

  );

  mapBooksToShelves = (categories, books)=>{

    const shelfData = this.mapBooksToCategories(categories, books);
    const shelfList = this.mapCategoriesToShelfList(categories);

    return(
      shelfData.map(shelf=>(
        <BookShelf
          key={shelf.title}
          category={shelf.category}
          shelfList={shelfList}
          books={shelf.books}
          title={shelf.title}
          onBookUpdated={this.props.onBookUpdated}
        />
      ))
    );

  };
  render(){

    const {books} = this.props;

    return(
      <div className="homepage">
        <AppBar
          zDepth={3}
          title="MyReads"
        />
        {this.mapBooksToShelves(Categories, books)}
        <Button
          floating
          primary
          className="homepage-search"
        >
          <Link
            to="/search"
            className="homepage-search--link"
          >
            <i className="material-icons">search</i>
          </Link>
        </Button>
      </div>
    );
  }
}

export default HomePage;
