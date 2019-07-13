import React from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { fetchClinicsForSpeciality, book } from '../actions/userActions';
import { FlatListItem } from '../components/CustomClinicFlatList';
import { Icon } from 'react-native-elements';

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
        const { navigation } = this.props;
        this.props.fetchClinicsForSpeciality(this.props.idUser, navigation.getParam('specialityId'));
    }

    render() {
        return (
            <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%', position:'absolute'}}>   
                <View style={styles.container}>
                    <FlatList
                        data={this.props.clinicsForSpeciality}
                        renderItem={({item, index})=>{
                            return (
                                <FlatListItem 
                                    item={item}
                                    index={index}
                                    handlePress={() => this._moveToBooking(item.clinicId, item.clinicName)}
                                />);
                        }}
                    >
                    </FlatList>
                </View>
            </ImageBackground>
        );
    }

    _moveToBooking = (idClinic, clinicName) => {
        this.props.book(this.props.idUser, idClinic, this.props.navigation.getParam('specialityId'));

        this.props.navigation.navigate('Booking', 
            {clinicId: idClinic, 
             clinicName: clinicName,
             specialityId: this.props.navigation.getParam('specialityId')});
    };
}

const mapStateToProps = state => ({
    clinicsForSpeciality: state.user.clinicsForSpeciality,
    idUser: state.user.idUser,
});

const mapDispatchToProps = dispatch => ({
    fetchClinicsForSpeciality: (userId, specialityId) => dispatch(fetchClinicsForSpeciality(userId, specialityId)),
    book: (userId, clinicId, specialityId) => dispatch(book(userId, clinicId, specialityId))
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