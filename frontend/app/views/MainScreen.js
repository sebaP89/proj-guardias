import React from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux';
import { Icon } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchBooking, refreshCoordinates } from '../actions/userActions';
import { ErrorAlert } from '../components/ErrorAlert'
import { isEmpty } from '../utils/helper';
import { PermissionsAndroid } from 'react-native';

class MainScreen extends React.Component {  
    constructor(props){
      super(props);

      this.state = {
        watchId: ''
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

    async componentDidMount() {
      console.log("mainscreen: component did mount called")

      await this.requestLocationPermission();
      
      const { navigation } = this.props;

      this._fetchLastestBooking();
      
      this.focusListener = navigation.addListener("didFocus", () => {
        this._fetchLastestBooking();
      });
      
      this.getCoordinates(function (coords) {
        this.props.refreshCoordinates(coords);
      }.bind(this));
    }

    componentWillUnmount() {
      console.log("mainscreen: component will unmount called")
      // Remove the event listener
      this.focusListener.remove();
    }

    async requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'This App needs access to your location ' +
                       'so we can know where you are.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use locations ")
        } else {
          console.log("Location permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }

    getCoordinates(callback) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log(`current coords: ${JSON.stringify(position)}`);
          callback(position.coords);
        },
        function(error) {
          console.log("getCoordinates got error : ", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      )
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
  refreshCoordinates: coordinates => dispatch(refreshCoordinates(coordinates))
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