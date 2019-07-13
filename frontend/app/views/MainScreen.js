import React from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux';
import { Icon } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchBooking } from '../actions/userActions';
import { ErrorAlert } from '../components/ErrorAlert'
import { isEmpty } from '../utils/helper';

class MainScreen extends React.Component {  
    constructor(props){
      super(props);
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
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("didFocus", () => {
        this._fetchLastestBooking();
      });
      this._fetchLastestBooking();
    }

    componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }

    _fetchLastestBooking = () => {
        this.props.fetchBooking(this.props.idUser);
    };

    renderElement(){
      const booking = this.props.booking;
      if(!isEmpty(booking))
          return <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('Booking', { clinicName: booking.clinicName})}
                  style={styles.button}>
                    <Text style={styles.text}>{booking.bookingNumber} - {booking.clinicName}</Text>
                  </TouchableOpacity>;
      return null;
    }

    render() {
      const {error,booking} = this.props;
      if (error && isEmpty(booking))
      {
        return (
          <ErrorAlert 
              errorMessage={this.props.error}
              onPress={() => this._fetchLastestBooking()}
          />
        );
      }
      
      return (
        <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
              <Spinner
                  visible={this.props.loading}
              />
              { this.renderElement()}
          </View>
        </ImageBackground>
      );
    }
}

const mapStateToProps = state => ({
  booking: state.user.booking,
  idUser: state.user.idUser,
  error: state.user.error,
  loading: state.user.loading
})

const mapDispatchToProps = dispatch => ({
  fetchBooking: userId => dispatch(fetchBooking(userId)),
});

const styles = StyleSheet.create({
  icon: {
      paddingLeft: 10,
  },
  container: {
      flex: 1,
      paddingTop: 50,
  },
  button: {
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
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
  }
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MainScreen));