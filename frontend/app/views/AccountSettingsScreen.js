import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from "react-native-elements";
import openMap from 'react-native-open-maps';

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

    _goToYosemite() {
      openMap({ latitude: 37.865101, longitude: -119.538330 });
    }

    render() {
      return (
        <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <Text>This is the SettingsScreen.</Text>
            <Button
              color={'#bdc3c7'}
              onPress={this._goToYosemite}
              title="Click To Open Maps 🗺" />
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
