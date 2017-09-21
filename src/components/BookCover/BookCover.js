import React from 'react';
import PropTypes from 'prop-types';

export const BookCover = ({className, width, height, imageLink })=>(
  <div className={className}
       style={{width, height, backgroundImage: `url(${imageLink})`}}
  />
);

BookCover.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageLink: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default BookCover;

