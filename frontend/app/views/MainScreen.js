import React from 'react';
import { ImageBackground, Text, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements";

export default class MainScreen extends React.Component {  
    constructor(props){
      super(props);
    }

    static navigationOptions = ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
          <Icon
            name="md-menu"
            type="ionicon"
            containerStyle={styles.icon}
            onPress={() => navigation.toggleDrawer()}
          />
        )
    });

    render() {
      return (
        <ImageBackground source={require('../image/river.png')} style={{width: '100%', height: '100%'}}/>
      );
    }
}

const styles = StyleSheet.create({
  icon: {
      paddingLeft: 10
  }
});