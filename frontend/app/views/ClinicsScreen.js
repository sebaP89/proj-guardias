import React from 'react';
import { StyleSheet, View, FlatList, RefreshControl, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { fetchClinicsForSpeciality, refreshClinicsForSpeciality, refreshCoordinates, fetchingData } from '../actions/specialitiesActions';
import { book } from '../actions/bookingActions';
import { FlatListItem } from '../components/CustomClinicFlatList';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

class ClinicScreenCustomFlatList extends React.Component {
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
        console.log("clinics: component did mount called")
        this.getCoordinates(function (coords) {
            this.props.refreshCoordinates(coords);
            this.props.fetchClinicsForSpeciality(this.props.userId, this.props.navigation.getParam('specialityId'));
          }.bind(this));
    }

    componentWillUnmount() { 
        console.log("clinics: component will unmount called")
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        return (
            <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%', position:'absolute'}}>   
                <View style={styles.container}>
                    <Spinner
                        visible={this.props.loading}
                    />
                    <FlatList
                        data={this.props.clinics}
                        renderItem={({item, index})=>{
                            return (
                                <FlatListItem 
                                    item={item}
                                    index={index}
                                    handlePress={() => this._moveToBooking(item.clinicId, item.clinicName)}
                                />);
                        }}
                        keyExtractor={this.keyExtractor}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.props.isRefreshing}
                              onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                    </FlatList>
                </View>
            </ImageBackground>
        );
    }

    onRefresh() {
        this.getCoordinates(function (coords) {
            this.props.refreshCoordinates(coords);
            this.props.refreshClinicsForSpeciality(this.props.userId, this.props.navigation.getParam('specialityId'));
          }.bind(this));
    }

    getCoordinates(callback) {
        this.props.fetchingData();
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

    _moveToBooking = (idClinic, clinicName) => {
        this.props.book(this.props.userId, idClinic, this.props.navigation.getParam('specialityId'));

        this.props.navigation.navigate('Booking', 
            {clinicId: idClinic, 
             clinicName: clinicName,
             specialityId: this.props.navigation.getParam('specialityId')});
    };
}

const mapStateToProps = state => ({
    clinics: state.specialities.clinics,
    userId: state.user.userId,
    isRefreshing: state.fetchStatus.refreshing,
    loading: state.fetchStatus.loading
});

const mapDispatchToProps = dispatch => ({
    fetchClinicsForSpeciality: (userId, specialityId) => dispatch(fetchClinicsForSpeciality(userId, specialityId)),
    book: (userId, clinicId, specialityId) => dispatch(book(userId, clinicId, specialityId)),
    refreshClinicsForSpeciality: (userId, specialityId) => dispatch(refreshClinicsForSpeciality(userId, specialityId)),
    refreshCoordinates: coordinates => dispatch(refreshCoordinates(coordinates)),
    fetchingData: () => dispatch(fetchingData())
});

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding:10,
        fontSize:16,
    },
    container: {
        paddingTop: 50,
        paddingLeft: 10
    },
    icon: {
        paddingLeft: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicScreenCustomFlatList);