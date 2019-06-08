import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

class BookingScreen extends React.Component {
    render() {
        const clinicId = this.props.navigation.getParam('clinicId', '-1');
        const clinicName = this.props.navigation.getParam('clinicName', 'No Name');
        const coordinates = this.props.navigation.getParam('clinicCoords', 'No Name');

        console.log(`${coordinates}`);
        let arr = coordinates.split(', ');
        console.log(`latitude: ${arr[0]}`);
        console.log(`longitude: ${arr[1]}`);

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Reserva!</Text>
                <Text style={styles.welcome}>{clinicId}</Text>
                <Text style={styles.welcome}>{clinicName}</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this._signInAsync}
                >
                    <Text style={styles.btnText}>GENERAR ORDEN</Text>
                </TouchableOpacity>

                <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
            </View>
        );
    }

    _signInAsync = async => {
        alert('Reserva Generada: 23');
        
        //const clinicId = this.props.navigation.getParam('clinicId', '-1');
        //const specialityId = this.props.navigation.getParam('specialityId', '-1');
        //this.props.book(clinicId, specialityId);
    };

    _signOutAsync = () => {
        this.props.logout();
        this.props.navigation.navigate('Auth');
    };
}

const mapStateToProps = state => ({
    clinicsForSpeciality: state.user.clinicsForSpeciality,
    idUser: state.user.idUser,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logedout()),
    //book: (clinicId, specialityId) => dispatch(book(clinicId, specialityId))
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);