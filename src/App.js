import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
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
      : results.filter(book => !book.shelf || book.shelf === Categories.none);

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
