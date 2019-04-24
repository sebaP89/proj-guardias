import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const userInfo = {username:'admin', password:'1234'}

export default class LoginScreen extends React.Component {  
    constructor(props){
      super(props);
      this.state = {username:'', password:''}
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.input}>Nombre</Text>
          <TextInput
            style={styles.input}
          />
          <Text style={styles.input}>Apellido</Text>
          <TextInput
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {this.props.navigation.navigate('Login')}}
          >
          <Text style={styles.btnText}>Atras</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    _signInAsync = async () => {
      if(userInfo.username===this.state.username &&
        userInfo.password===this.state.password){
          await AsyncStorage.setItem('@logged', '1');
          this.props.navigation.navigate('App');
        } else {
          alert('Username or Password wrong!')
        }
      
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    input: {
      borderBottomWidth: 1,
      margin:15,
      height:40,
      padding:5,
      fontSize:16,
      borderBottomColor:'#42BAF8'
    },
    btn: {
      justifyContent: 'center',
      flexDirection:'row',
      backgroundColor:'#42BAF8',
      alignItems:'center',
      marginLeft: 15,
      marginRight: 15,
      padding: 10
    },
    btnText: {
      color:'#ffffff',
      fontWeight:'700'
    }
  });
