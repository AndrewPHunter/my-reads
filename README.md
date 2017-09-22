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

### Directory Structure

<p>
The layout of the component directory may at first seem odd however it was performed with the explicit purpose
of allowing either the default import of a styled component or the explicit import of the unstyled (non css imported)
component to allow for maximum reusability  of the components.
</p>
<p>
An example of this pattern can be found below:
</p>

```js
import BookShelf from '../../components/BookShelf'; //styled component
import BookShelf from '../../components/BookShelf/BookShelf'; //unstyled component
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

### Search Terms

The backend api is only used for the purposes of the program and as such yeilds limited search capability.
The following are the search terms which will yield results:<br/>
<p>
'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
</p>

### Contributing

This repository is used for a nanodegree program that I am participating in so I will not be accepting pull requests.
