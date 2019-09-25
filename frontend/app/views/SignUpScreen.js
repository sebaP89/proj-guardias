import React from 'react';
import { ImageBackground, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createUser } from '../actions/userActions';
import { fetchHealthInsurances } from '../actions/specialitiesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import { isEmpty } from '../utils/helper';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ 
      user: {},
      healthInsurance: {}
    })
  }

  componentDidMount() {
    console.log("sign up: component did mount called")
    this.props.fetchHealthInsurances();
  }

  componentWillUnmount() {
    console.log("sign up: component will unmount called")
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.userCreated) {
      alert('Usuario registrado');
      this.props.navigation.navigate('Login');
      return false;
    }
    return true;
  }

  render() {
    if (this.props.loading)
    {
        console.log('loading account data')
        return(
          <ImageBackground source={require('../image/planificarBlur.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Spinner
                    visible={this.props.loading}
                />
            </View>
          </ImageBackground>
        );
    }
    else
    {
      let serviceItems = this.props.healthInsurances.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s.healthInsuranceName} />
      });
      
      return (
      <ImageBackground source={require('../image/planificarBlur.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor = "#FFFFFF"
            onChangeText={(text) => 
              this.setState({
                user:{
                  ...this.state.user,
                  firstname: text
                } 
              })}
            value={this.state.user.firstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor = "#FFFFFF"
            onChangeText={(text) => 
              this.setState({
                user:{
                  ...this.state.user,
                  lastname: text
                } 
              })}
            value={this.state.user.lastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor = "#FFFFFF"
            onChangeText={(text) => 
              this.setState({
                user:{
                  ...this.state.user,
                  email: text
                } 
              })}
            value={this.state.user.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor = "#FFFFFF"
            onChangeText={(text) => 
              this.setState({
                user:{
                  ...this.state.user,
                  password: text
                } 
              })}
            value={this.state.user.password}
            secureTextEntry={true}
          />
          <View style={styles.pickerContainer}>
            <Picker
                style={styles.pickerStyle} 
                selectedValue={this.state.healthInsurance}
                onValueChange={ (healthInsurance) =>
                  this.setState({
                    healthInsurance:healthInsurance
                  })
                } >
                <Picker.Item value="Prepaga" label="Prepaga" />
                {serviceItems}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={this._signInAsync}
          >
            <Text style={styles.btnText}>Registrarse</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
      );
    }
  }

  _signInAsync = async => {

    if (this.state.user.firstname != "" &&
        this.state.user.lastname != "" &&
        this.state.user.email != "" &&
        this.state.user.password != "" &&
        !isEmpty(this.state.healthInsurance) &&
        this.state.healthInsurance != 'Prepaga')
    {
      console.log(JSON.stringify(this.state.healthInsurance))
      this.props.createUser(this.state.user, this.state.healthInsurance.healthInsuranceId);
    }
    else
    {
      alert('Por favor, ingrese todos los campos');
    }
  };
}

const mapStateToProps = state => ({
  userCreated: state.user.userCreated,
  healthInsurances: state.specialities.healthInsurances,
  loading: state.fetchStatus.loading
});


const mapDispatchToProps = dispatch => ({
  createUser: (user, healthInsuranceId) => dispatch(createUser(user, healthInsuranceId)),
  fetchHealthInsurances: () => dispatch(fetchHealthInsurances())
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  pickerContainer: {
    alignItems: 'center',  
    margin: 15,
    height: 40,
    padding: 5,
    justifyContent: 'center'
  },
  pickerStyle: {  
    width: "80%",  
    color: '#FFFFFF', 
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);