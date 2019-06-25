import React from 'react';
import { ImageBackground, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createUser, fetchClinics } from '../actions/userActions';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ 
      user: {},
      clinic: {}
    })
  }

  componentDidMount() {
    this.props.fetchClinics();
}

  render() {
    
    if (this.props.userCreated) {
        alert('Usuario registrado');
        this.props.navigation.navigate('Login');
    }

    let serviceItems = this.props.clinics.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s.clinicName} />
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
              selectedValue={this.state.clinic}
              onValueChange={ (clinic) =>
                this.setState({
                  clinic:clinic
                })
              } >
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

  _signInAsync = async => {

    if (this.state.user.firstname != "" &&
        this.state.user.lastname != "" &&
        this.state.user.email != "" &&
        this.state.user.password != "")
    {
      this.props.createUser(this.state.user, this.state.clinic.idClinic);
    }
    else
    {
      alert('Por favor, ingrese todos los campos');
    }
  };
}

const mapStateToProps = state => ({
  userCreated: state.user.userCreated,
  clinics: state.user.clinics,
});


const mapDispatchToProps = dispatch => ({
  createUser: (user, idClinic) => dispatch(createUser(user, idClinic)),
  fetchClinics: () => dispatch(fetchClinics())
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