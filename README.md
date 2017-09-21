# My Reads
[React Nanodegree Project](https://www.udacity.com/course/react-nanodegree--nd019)

This project is based off of the [MyReads Starter Template](https://github.com/udacity/reactnd-project-myreads-starter) however multiple changes have been performed to complete the required functionality. In addition a declarative approach has been used with favoring higher order functions of map, reduce and filter along with object destructuring vice manual or iterator based looping (e.g. foreach).

A prime example of this is with the [StarRating](src/components/StarRating/StarRating.js) component which builds the rating array without looping and instead favors object destructuring used in conjunction with [Array.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill):
```js
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
```
### Technology Used
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [react-md](https://react-md.mlaursen.com/)
* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)

### Getting Started
* clone the repo
* install dependencies
```sh
yarn install
```
* start the development server
```sh
yarn start
```
