import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class BookingScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Turno",
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

    render() {
        const clinicName = this.props.navigation.getParam('clinicName', 'No Name');
        const bookingNumber = this.props.bookingNumber;
        
        return (
            <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Spinner
                        visible={this.props.loading}
                    />
                    <Text style={styles.welcome}>Reserva!</Text>
                    <Text style={styles.welcome}>{clinicName}</Text>
                    <Text style={styles.welcome}>{bookingNumber}</Text>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.fetchStatus.loading,
    bookingNumber: state.booking.lastBookingNumber
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
        color: '#FFFFFF'
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
    },
    icon: {
        paddingLeft: 10,
    }
});

export default connect(mapStateToProps, null)(BookingScreen);