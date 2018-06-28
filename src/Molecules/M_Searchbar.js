import React, { Component } from "react";
import { connect } from "../redux";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { A_Input } from "../Atoms";

class M_Searchbar extends Component {
  render() {
    return (
      <View
        style={[style.generalContainerStyle].concat(this.props.containerStyle)}
      >
        <A_Input
          placeholder={this.props.placeholder || "Search"}
          onChangeText={this.props.handleSearch}
          style={[style.generalInput].concat(this.props.inputStyle)}
        />
      </View>
    );
  }
}
M_Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

const M_Searchbar_Main = props => {
  return (
    <M_Searchbar
      handleSearch={props.handleSearch}
      placeholder={`Search for ${props.filter || "local vendors and deals"}`}
      containerStyle={style.mainSearchContainerStyle}
      inputStyle={style.mainSearchInputStyle}
    />
  );
};
M_Searchbar_Main.propTypes = {
  filter: PropTypes.string
};

export { M_Searchbar, M_Searchbar_Main };

const style = StyleSheet.create({
  generalContainerStyle: {},
  mainSearchContainerStyle: { height: "100%" },
  mainSearchInputStyle: { flex: 1 }
});
