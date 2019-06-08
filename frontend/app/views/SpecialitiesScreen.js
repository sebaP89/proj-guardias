import React from 'react';
import { Button, StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { logedout, fetchSpecialities } from '../actions/userActions';

class SpecialitiesScreen extends React.Component {
  
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSpecialities(this.props.idUser);
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <ListItem
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        title={item.specialityName}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={this._showMoreApp}
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
        console.log(this.props.specialities);
        return (
            <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.specialities}
              renderItem={this.renderItem}
              containerStyle={{ borderBottomWidth: 0 }}
              ItemSeparatorComponent={this.renderSeparator}
            />
            <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
            </View>
          )
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Clinics', 
        {specialityId:'7ab5873c-d4dd-3dd9-9e92-a8a58676b6a6'});
    };

    _signOutAsync = () => {
        this.props.logout();
        this.props.navigation.navigate('Auth');
    };
}

const mapStateToProps = state => ({
    specialities: state.user.specialities,
    idUser: state.user.idUser,
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logedout()),
    fetchSpecialities: userId => dispatch(fetchSpecialities(userId)),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialitiesScreen);