import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { saveUserToken } from '../actions/actions';

const userInfo = {username:'admin', password:'1234'}

class LoginScreen extends React.Component {  
    constructor(props){
      super(props);
      this.state = {username:'', password:''}
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChangeText={(username)=>this.setState({username})}
            value={this.state.username}
          />
          <TextInput 
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={(password)=>this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={this._signInAsync}
          >
          <Text style={styles.btnText}>INGRESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {this.props.navigation.navigate('SignUp')}}
          >
          <Text style={styles.btnText}>¿No tenés cuenta? Registrate</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    _signInAsync = async () => {
      if(userInfo.username===this.state.username && userInfo.password===this.state.password) {
        this.props.saveUserToken()
          .then(() => {
              this.props.navigation.navigate('App');
          })
          .catch((error) => {
              this.setState({ error })
          })
      } else {
        alert('Usuario o contraseña incorrecta!')
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
      justifyContent: 'space-between',
      flexDirection:'column',
      backgroundColor:'#42BAF8',
      alignItems:'center',
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 10,
      padding: 10
    },
    btnText: {
      color:'#ffffff',
      fontWeight:'700'
    }
  });

const mapStateToProps = state => ({
    token: state.token,
});


const mapDispatchToProps = dispatch => ({
    saveUserToken: () => dispatch(saveUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);