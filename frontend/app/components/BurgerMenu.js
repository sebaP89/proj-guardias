import React, { PureComponent } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { connect } from 'react-redux';
import { logedout } from '../actions/userActions';

class BurgerMenu extends PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
        <ScrollView style={styles.container}>
          <DrawerItems {...this.props} />
        </ScrollView>
        <Button style={{backgroundColor: "#39B1F7"}} icon={{ name: "md-log-out", type: "ionicon" }} title="Log Out" onPress={this._signOutAsync} />
      </SafeAreaView>
    );
  }

  _signOutAsync = () => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logedout()),
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(null, mapDispatchToProps)(BurgerMenu);