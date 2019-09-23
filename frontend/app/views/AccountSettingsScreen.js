import React from 'react';
import { ImageBackground, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from "react-native-elements"; 
import { updateUser, fetchHealthInsurances, fetchUserData } from '../actions/userActions';
import Spinner from 'react-native-loading-spinner-overlay';
import { isEmpty } from '../utils/helper';

class AccountSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {
        firstname: null,
        lastname: null,
        email: null,
        password: null
      },
      healthInsurance: {
        healthInsuranceId: null,
        healthInsuranceName: null
      }
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Planificar Salud",
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

  componentDidMount() {
    console.log("account: component did mount called")
      this.props.fetchUserData(this.props.idUser);
      this.props.fetchHealthInsurances();

      console.log(JSON.stringify(this.state))
  }

  componentWillUnmount() { 
    console.log("account: component will unmount called")
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.loading)
    {
      console.log("loading account data");
      return true;
    }
    else
    {
      if (typeof nextProps.healthInsurances !== 'undefined' && nextProps.healthInsurances.length &&
          !isEmpty(nextProps.userData)) {
        console.log("rendering account data");
        return true;
      }
      else {
        console.log("not rendering account data");
        return false;
      }
    }
  }

  render() {
    
    let serviceItems = null;
    if (this.props.loading == false)
    {
      serviceItems = this.props.healthInsurances.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s.healthInsuranceName} />
      });
    }

    return (
    <ImageBackground source={require('../image/planificarBlur.png')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Spinner
          visible={this.props.loading}
        />
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
          value={this.state.user.firstname != null ? this.state.user.firstname : this.props.userData.firstname}
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
            value={this.state.user.lastname != null ? this.state.user.lastname : this.props.userData.lastname}
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
          value={this.state.user.email != null ? this.state.user.email : this.props.userData.email}
        />
        <View style={styles.pickerContainer}>
          <Picker
              style={styles.pickerStyle} 
              selectedValue={this.state.healthInsurance.healthInsuranceId != null ? this.state.healthInsurance : this.props.healthInsurances.find(item=>item.healthInsuranceName==this.props.userData.healthInsuranceName)}
              onValueChange={ (selectedHealthInsurance) =>
                this.setState({
                  healthInsurance:selectedHealthInsurance
                })
              } >
              {serviceItems}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={this._updateUser}
        >
          <Text style={styles.btnText}>Modificar</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
    );
  }

  _updateUser = async => {

    console.log(JSON.stringify(this.state))
    let canUpdate = true;

    if (this.state.user.firstname == null)
    {
      this.state.user.firstname = this.props.userData.firstname;
    }
    else if (this.state.user.firstname == "")
    {
      canUpdate = false;
    }

    if (canUpdate)
    {
      if (this.state.user.lastname == null)
      {
        this.state.user.lastname = this.props.userData.lastname;
      }
      else if (this.state.user.lastname == "")
      {
        canUpdate = false;
      }
    }

    if (canUpdate)
    {
      if (this.state.user.email == null)
      {
        this.state.user.email = this.props.userData.email;
      }
      else if (this.state.user.email == "")
      {
        canUpdate = false;
      }
    }

    if (canUpdate)
    {
      if (this.state.user.password == null)
      {
        this.state.user.password = this.props.userData.password;
      }
      else if (this.state.user.password == "")
      {
        canUpdate = false;
      }
    }

    if (canUpdate)
    {
      if (this.state.healthInsurance.healthInsuranceId == null)
      {
        this.state.healthInsurance.healthInsuranceId = this.props.userData.healthInsuranceId;
      }
      else if (this.state.healthInsurance.healthInsuranceId == "")
      {
        canUpdate = false;
      }
    }

    if (canUpdate)
    {
      this.props.updateUser(this.props.idUser, this.state.user, this.state.healthInsurance.healthInsuranceId);  
    }
    else 
    {
      alert('Por favor, ingrese todos los campos');
    }
  };
}

const mapStateToProps = state => ({
  userUpdated: state.user.userUpdated,
  healthInsurances: state.user.healthInsurances,
  userData: state.user.userData,
  loading: state.user.loading,
  idUser: state.user.idUser,
});


const mapDispatchToProps = dispatch => ({
  updateUser: (userId, user, healthInsuranceId) => dispatch(updateUser(userId, user, healthInsuranceId)),
  fetchHealthInsurances: () => dispatch(fetchHealthInsurances()),
  fetchUserData: (userId) => dispatch(fetchUserData(userId))
});

const styles = StyleSheet.create({
  icon: {
      paddingLeft: 10,
  },
  container: {
      flex: 1,
      paddingTop: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsScreen);