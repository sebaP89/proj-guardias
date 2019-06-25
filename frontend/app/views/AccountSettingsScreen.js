import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";

export default class AccountSettingsScreen extends React.Component {  
    constructor(props){
      super(props);
    }

    static navigationOptions = ({ navigation }) => ({
      headerTitle: "Mi Cuenta",
      headerTransparent: true,
      headerTitleStyle: { color: '#FFFFFF' },
      headerLeft: (
          <Icon
            name="md-menu"
            type="ionicon"
            color='#FFFFFF'
            containerStyle={styles.icon}
            onPress={() => navigation.toggleDrawer()}
          />
        )
    });

    render() {
      return (
        <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <Text>This is the SettingsScreen.</Text>
          </View>
        </ImageBackground>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color:'#FFFFFF'
  },
  icon: {
    paddingLeft: 10
  }
});
