import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import StarTypes from './star.types';


export class StarRating extends PureComponent{

  static propTypes = {
    rating: PropTypes.number.isRequired,
    total: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    total: 5
  };

  generateStar = (starType)=>(
    <i className="material-icons star-list-item--star">{starType}</i>
  );

  buildStarArray = (rating, total)=>{

    const totalStarsUsed = Math.ceil(rating);
    const numberHalfStars = Math.ceil(rating % 1);
    const numberFullStars = totalStarsUsed - numberHalfStars;
    const numberEmptyStars = total-(numberFullStars+numberHalfStars);

    return [
      ...(new Array(numberFullStars).fill(this.generateStar(StarTypes.full))),
      ...(new Array(numberHalfStars).fill(this.generateStar(StarTypes.half))),
      ...(new Array(numberEmptyStars).fill(this.generateStar(StarTypes.empty)))
    ];

  };

  mapRatingToStarList = (rating, total)=>(
    this
      .buildStarArray(rating, total)
      .map((star, index)=>(
        <li key={index} className="star-list-item">{star}</li>
      ))
  );

  render(){
    const {rating, total, className} = this.props;
    const starList = this.mapRatingToStarList(rating, total);

    return(
      <ul className={`star-list ${className}`}>
        {starList}
      </ul>
    );
  }
}

export default StarRating;
