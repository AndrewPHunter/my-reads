import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu';
import {ListItem} from 'react-md/lib/Lists';



export class BookActionButton extends PureComponent{

  static propTypes = {
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    shelfList: PropTypes.object.isRequired,
    onActionSelected: PropTypes.func.isRequired
  };

  mapCategoriesToListItem = (shelfList, category)=>{

    const {onActionSelected} = this.props;

    return Object.keys(shelfList).map(key => (
      <ListItem
        key={key}
        className={(key === category) ? 'book-action--active' : ''}
        primaryText={shelfList[key]}
        onClick={onActionSelected.bind(null, key)}
      />
    ));
  };

  render(){

    const {id, category, shelfList} = this.props;
    const listItems = this.mapCategoriesToListItem(shelfList, category);

    return(
      <DropdownMenu
        id={`${id}-Action`}
        menuItems={listItems}
        anchor={{
          x: DropdownMenu.HorizontalAnchors.CENTER,
          y: DropdownMenu.VerticalAnchors.OVERLAP,
        }}
        position={DropdownMenu.Positions.TOP_LEFT}
        animationPosition="below"
      >
        <Button floating primary>import_export</Button>
      </DropdownMenu>
    );
  }
}

export default BookActionButton;
