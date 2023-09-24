import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  initNavigation,
  withFocusable
} from "@noriginmedia/react-spatial-navigation";

initNavigation();

const menuItems = [1, 2, 3, 4];
const rowItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    width: "100%"
  },
  menuItem: {
    width: "100px",
    height: "100px",
    backgroundColor: "yellow",
    margin: "10px"
  },
  focused: {
    transition: "transform 200ms",
    border: "4px solid red",
    transform: "scale(1.1)",
    borderRadius: "20px"
  },
  galleryItem: {
    width: "100px",
    height: "100px",
    backgroundColor: "cyan",
    margin: "10px"
  }
});

const MenuItem = ({ focused }) => (
  <View style={[styles.menuItem, focused ? styles.focused : null]} />
);
const MenuItemFocusable = withFocusable()(MenuItem);

const Menu = () => (
  <View style={styles.menu}>
    {menuItems.map((menuItem, index) => (
      <MenuItemFocusable key={index} />
    ))}
  </View>
);
const MenuFocusable = withFocusable()(Menu);

const GalleryItem = ({ focused }) => (
  <View style={[styles.galleryItem, focused ? styles.focused : null]} />
);
const GalleryItemFocusable = withFocusable()(GalleryItem);

class GalleryRow extends PureComponent {
  constructor(props) {
    super(props);

    this.scrollRef = null;

    this.onItemFocused = this.onItemFocused.bind(this);
  }

  onItemFocused({ x }) {
    this.scrollRef.scrollTo({ x: x - this.scrollRef.clientWidth / 2 + 30 });
  }

  render() {
    return (
      <ScrollView
        horizontal
        ref={(reference) => {
          this.scrollRef = reference;
        }}
      >
        {rowItems.map((rowItem, index) => (
          <GalleryItemFocusable
            key={index}
            onBecameFocused={this.onItemFocused}
          />
        ))}
      </ScrollView>
    );
  }
}
const GalleryRowFocusable = withFocusable()(GalleryRow);

const MENU_FOCUS_KEY = "MENU";
class App extends PureComponent {
  componentDidMount() {
    this.props.setFocus(MENU_FOCUS_KEY);
  }

  render() {
    return (
      <View style={styles.app}>
        <MenuFocusable focusKey={MENU_FOCUS_KEY} />
        <GalleryRowFocusable />
        <GalleryRowFocusable />
      </View>
    );
  }
}

export default withFocusable()(App);
