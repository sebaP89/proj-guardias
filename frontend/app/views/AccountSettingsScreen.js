import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";

export default class AccountSettingsScreen extends React.Component {  
    constructor(props){
      super(props);
    }

    static navigationOptions = ({ navigation }) => ({
      headerTitle: "Planificar Salud",
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
        <View style={styles.container}>
          <Text>This is the SettingsScreen.</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    paddingLeft: 10
  }
});
