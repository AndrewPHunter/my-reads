import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';
import debounce from 'lodash.debounce';

export class SearchBar extends Component{

  state = {
    query: ''
  };

  static propTypes = {
    zDepth: PropTypes.number,
    searchPrompt: PropTypes.string.isRequired,
    onQueryUpdated: PropTypes.func.isRequired
  };

  static defaultProps = {
    zDepth: 1
  };

  performQuery = debounce(()=>{
      this.props.onQueryUpdated(this.state.query);
  }, 300);

  handleQuery = (query)=>{

    this.setState({query}, ()=>(
      this.performQuery()
    ));

  };

  boxShadowClassSelector = (zDepth)=>(
    `box-shadow--${zDepth}`
  );

  backButton = ()=>(
    <div className="searchbar-items--back-container">
      <Link
        to="/"
      >
        <i className="material-icons searchbar-items--back-button">arrow_back</i>
      </Link>
    </div>
  );

  render(){
    const {zDepth, searchPrompt} = this.props;
    const boxShadow = this.boxShadowClassSelector(zDepth);

    return(
      <div className={(`searchbar ${boxShadow}`)}>
        <div className="searchbar-items">
          {this.backButton()}
          <div className="searchbar-items--search-container">
            <TextField
              id="search-query"
              label={searchPrompt}
              lineDirection="left"
              placeholder={searchPrompt}
              className="searchbar-items--search"
              value={this.state.query || ''}
              onChange={this.handleQuery}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
