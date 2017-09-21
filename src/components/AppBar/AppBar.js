import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


export class AppBar extends PureComponent{

  static propTypes = {
    zDepth: PropTypes.number,
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    zDepth: 1
  };

  boxShadowClassSelector = (zDepth)=>(
    `box-shadow--${zDepth}`
  );

  render(){
    const {zDepth, title} = this.props;
    const boxShadow = this.boxShadowClassSelector(zDepth);
    return(
      <div
        className={`app-header ${boxShadow}`}
      >
        <h1 className="app-header--title">{title}</h1>
      </div>
    );
  }
}

export default AppBar;
