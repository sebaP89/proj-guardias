import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { logedout, fetchClinicsForSpeciality } from '../actions/userActions';
import { FlatListItem } from '../components/CustomFlatList';

class OtherScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.props.fetchClinicsForSpeciality(this.props.idUser, navigation.getParam('specialityId'));
    }

    render() {
        return (
            <View style={{flex:1, marginTop:34}}>
                <FlatList
                    data={this.props.clinicsForSpeciality}
                    renderItem={({item, index})=>{
                        return (
                            <FlatListItem item={item} index={index}>
                            </FlatListItem>);
                    }}
                >
                </FlatList>
            </View>
        );
    }
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
    flatListItem: {
        color: 'white',
        padding:10,
        fontSize:16,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherScreen);