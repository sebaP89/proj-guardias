import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { validateUser, logedout } from '../actions/userActions';
import Spinner from 'react-native-loading-spinner-overlay';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' }
  }

  componentDidMount() { 
    console.log("login: component did mount called")
  }

  componentWillUnmount() { 
    console.log("login: component will unmount called")
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = true;
    const {userFetched, userId } = nextProps;
    console.log("userfetched? " + userFetched + " userId? " + userId)
    if (userFetched) {
      if (userId != '') {
        update = false;
        this.props.navigation.navigate('Main');
      } else {
        alert('Usuario o contraseña incorrecta!')
        this.props.logout();
      }
    }

    return update;
  }

  render() {
    return (
    <ImageBackground source={require('../image/planificarBlur.png')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Spinner
            visible={this.props.loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor = "#FFFFFF"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor = "#FFFFFF"
          onChangeText={(text) => this.setState({ password: text })}
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
          onPress={async () => { this.props.navigation.navigate('SignUp') }}
        >
          <Text style={styles.btnText}>¿No tenés cuenta? Registrate</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
    );
  }

  _signInAsync = async => {

    if (this.state.username != "" &&
        this.state.password != "")
    {
      let potentialUser = { username: this.state.username, password: this.state.password };
      this.props.validateUser(potentialUser);
    }
    else
    {
      alert('Por favor, ingrese usuario y contraseña');
    }
  };
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  userId: state.user.idUser,
  userFetched: state.user.fetched
});


const mapDispatchToProps = dispatch => ({
  validateUser: (user) => dispatch(validateUser(user)),
  logout: () => dispatch(logedout()),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    borderBottomWidth: 1,
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 18,
    borderBottomColor: '#42BAF8',
    color: '#FFFFFF'
  },
  btn: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius:10,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    padding: 10
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);