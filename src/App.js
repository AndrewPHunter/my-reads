import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import keyBy from 'lodash.keyby';
import escapeRegExp from 'escape-string-regexp';

import * as api from './api/books.api';
import Categories from './utilities/bookshelfCategories';



import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

class App extends Component {

  state = {
    books: []
  };

  componentDidMount = async ()=>{

    const books = await api.getAll();

    this.setState(()=>({
      books: books
    }));

  };

  onBookUpdated = async(updatedBook)=>{

    await api.update(updatedBook, updatedBook.shelf);

    const updatedBookList = [
      ...this.state.books.filter(book=>book.id !== updatedBook.id),
      ...(updatedBook.shelf !== Categories.none ? [updatedBook] : [])
    ];


    this.setState(()=>({
      books: updatedBookList
    }));

  };

  onQuery = async(query)=>{

    const results = await api.search(query);

    return results && results.error ? []
      : this.combineQueryResultsWithState(results, this.state.books, query);

  };

  combineQueryResultsWithState(results, books, query){

    const booksInQueryResult = books.filter(book=>this.generateFilterForBook(book, query));

    const combinedObjectGraph = {
      ...keyBy(results, (item)=>item.id),
      ...keyBy(booksInQueryResult, (item)=>item.id)
    };

    return(
      Object
        .keys(combinedObjectGraph)
        .map(key=>combinedObjectGraph[key])
    );

  }

  generateFilterForBook = (book, query)=>{

    const match = new RegExp(escapeRegExp(query), 'i');

    if(book.authors){
      return match.test(book.title) || match.test(book.authors.join(' '));
    }

    return match.test(book.title);

  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"
                 render={() => (
                   <HomePage
                     books={this.state.books}
                     onBookUpdated={this.onBookUpdated}
                   />
                 )}
          />
          <Route path="/search"
                 render={() => (
                   <SearchPage
                     onBookUpdated={this.onBookUpdated}
                     onQuery={this.onQuery}
                   />
                 )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
