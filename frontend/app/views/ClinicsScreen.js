import React from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { logedout, fetchClinicsForSpeciality } from '../actions/userActions';

class ClinicsScreen extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.props.fetchClinicsForSpeciality(this.props.idUser, navigation.getParam('specialityId'));
    }
    
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <ListItem
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        title={item.clinicName}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={this._moveToBooking(item.clinicId, item.clinicName, item.clinicCoords)}
    />
    )

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
    };

    render() {
        console.log(this.props.clinicsForSpeciality);
        return (
            <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.clinicsForSpeciality}
              renderItem={this.renderItem}
              containerStyle={{ borderBottomWidth: 0 }}
              ItemSeparatorComponent={this.renderSeparator}
            />
            <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
            </View>
          )
    }

    _moveToBooking = (id, name, coords) => {
        console.log(`coordinates: ${coords}`)
        this.props.navigation.navigate('Booking', 
            {clinicId: id, 
             clinicName: name,
             clinicCoords: coords,
             specialityId: this.props.navigation.getParam('specialityId')});
    }

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
    fetchClinicsForSpeciality: (userId, specialityId) => dispatch(fetchClinicsForSpeciality(userId, specialityId)),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicsScreen);