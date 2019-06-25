import React from 'react';
import { ImageBackground, StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchClinicsForSpeciality } from '../actions/userActions';

class ClinicsScreen extends React.Component {
    
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Clinicas",
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
        this.props.fetchClinicsForSpeciality(this.props.idUser, navigation.getParam('specialityId'));
    }
    
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <ListItem
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent' }}
        titleStyle={{ color: '#FFFFFF'}}
        title={item.clinicName}
        onPress={() => this._moveToBooking(item.clinicId, item.clinicName, item.clinicCoords)}
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
            <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%', position:'absolute'}}>
                <View style={styles.container}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.clinicsForSpeciality}
                    renderItem={this.renderItem}
                    containerStyle={{ borderBottomWidth: 0 }}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </ImageBackground>
          )
    }

    _moveToBooking = (id, name, coords) => {
        console.log(`coordinates: ${coords}`)
        this.props.navigation.navigate('Booking', 
            {clinicId: id, 
             clinicName: name,
             clinicCoords: coords,
             specialityId: this.props.navigation.getParam('specialityId')});
    };
}

const mapStateToProps = state => ({
    clinicsForSpeciality: state.user.clinicsForSpeciality,
    idUser: state.user.idUser,
});

const mapDispatchToProps = dispatch => ({
    fetchClinicsForSpeciality: (userId, specialityId) => dispatch(fetchClinicsForSpeciality(userId, specialityId)),
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 10
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicsScreen);