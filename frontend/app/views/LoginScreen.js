import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { validateUser } from '../actions/userActions';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' }
  }

  render() {

    const { loading, userFetched, userId } = this.props;

    if (loading) {
      return (
        <Text style={styles.welcome}>Loading</Text>
      )
    }

    if (userFetched) {
      console.log('user valid? ' + userId);
      
      if (userId != '') {
        console.log('user valid');
        this.props.navigation.navigate('App');
      } else {
        alert('Usuario o contraseña incorrecta!')
      }
    }

    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
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
    );
  }

  _signInAsync = async => {
    let potentialUser = { username: this.state.username, password: this.state.password };
    console.log('username: ' + potentialUser.username + ' password: ' + potentialUser.password);

    this.props.validateUser(potentialUser);
  };
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  userId: state.user.idUser,
  userFetched: state.user.fetched
});


const mapDispatchToProps = dispatch => ({
  validateUser: (user) => dispatch(validateUser(user))
});

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
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomColor: '#42BAF8'
  },
  btn: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#42BAF8',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    padding: 10
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '700'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);