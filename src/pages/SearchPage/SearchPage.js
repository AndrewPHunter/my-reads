import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/SearchBar';
import SearchItem from '../../components/SearchItem';
import Categories from '../../utilities/bookshelfCategories';
import startCase from 'lodash.startcase';

export class SearchPage extends Component{

  state = {
    searchResults: []
  };

  static propTypes = {
    onQuery: PropTypes.func.isRequired,
    onBookUpdated: PropTypes.func.isRequired
  };

  onQueryUpdated = async (query)=>{

    const {onQuery} = this.props;
    const searchResults = query ? await onQuery(query) : [];

    this.setState({searchResults});

  };

  onBookUpdated = (updatedBook)=>{

    const {searchResults} = this.state;
    const updatedBookIndex = searchResults.findIndex(book=>book.id === updatedBook.id);

    const updatedResults = [
      ...searchResults.slice(0,updatedBookIndex),
      ...[updatedBook],
      ...searchResults.slice(updatedBookIndex+1, searchResults.length)
    ];

    this.props.onBookUpdated(updatedBook);

    this.setState(()=>({searchResults: updatedResults}));

  };

  generateShelfOptions = (categories)=>(

    Object
      .keys(categories)
      .filter(key=>key !== Categories.none)
      .reduce((shelfOptions, key)=> {
        shelfOptions[key] = startCase(Categories[key]);
        return shelfOptions;
      },{})

  );

  mapResultsToSearchItem = (books, categories)=>{
    return books.map(book=>(
      <SearchItem
        key={book.id}
        book={book}
        shelfList={this.generateShelfOptions(categories)}
        onBookUpdated={this.onBookUpdated}
      />
    ));
  };

  render(){

    const books = this.state.searchResults;

    return(
      <div className="searchpage">
        <SearchBar
          zDepth={2}
          searchPrompt="Search by title or author"
          onQueryUpdated={this.onQueryUpdated}
        />
        <div className="searchpage-results">
          {books && this.mapResultsToSearchItem(books, Categories)}
        </div>
      </div>
    );
  }
}

export default SearchPage;
