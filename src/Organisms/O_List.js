import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import { M_ListItem_Restaurant } from "../Molecules";
import { A_ListContainer } from "../Atoms";

class O_List extends Component {
  constructor(props) {
    super(props);
  }

  renderListItems = () => {
    if (this.props.renderListItems)
      return this.props.renderListItems(this.props.items);
    return (
      <A_ListContainer>
        {this.props.items.map(item => <M_ListItem {...item} />)}
      </A_ListContainer>
    );
  };

  render() {
    return <View>{this.renderListItems()}</View>;
  }
}

const O_List_Favorites_Pre = props => (
  <O_List
    {...props}
    renderListItems={items => (
      <A_ListContainer listContainerStyle={{}}>
        {items.map(item => (
          <M_ListItem_Restaurant {...item} listItemStyle={{}} />
        ))}
      </A_ListContainer>
    )}
  />
);
const O_List_Favorites = connect(state => ({
  items: state.user.favorites
}))(O_List_Favorites_Pre);

export { O_List, O_List_Favorites };
