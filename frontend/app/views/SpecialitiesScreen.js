import React from 'react';
import { ImageBackground, StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchSpecialities } from '../actions/userActions';

class SpecialitiesScreen extends React.Component {
  
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Especialidades",
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
        this.props.fetchSpecialities(this.props.idUser);
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <ListItem
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent'}}
        titleStyle={{ color: '#FFFFFF'}}
        title={item.specialityName}
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
            <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.specialities}
                    renderItem={this.renderItem}
                    containerStyle={{ borderBottomWidth: 0 }}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </ImageBackground>
          )
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Clinics', 
        {specialityId:'7ab5873c-d4dd-3dd9-9e92-a8a58676b6a6'});
    };
}

const mapStateToProps = state => ({
    specialities: state.user.specialities,
    idUser: state.user.idUser,
})

const mapDispatchToProps = dispatch => ({
    fetchSpecialities: userId => dispatch(fetchSpecialities(userId)),
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 10
    },
    icon: {
        paddingLeft: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialitiesScreen);