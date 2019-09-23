import React from 'react';
import { ImageBackground, StyleSheet, View, RefreshControl, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchSpecialities } from '../actions/userActions';
import { refreshSpecialities } from '../actions/userActions';
import Spinner from 'react-native-loading-spinner-overlay';

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
        console.log("specialities: component did mount called")
        this.props.fetchSpecialities(this.props.idUser);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("specialities: should component update called")
        update = false
        if (nextProps.specialities != this.props.specialities) {
            console.log("specialities: update needed")
            update = true
        }
        return update;
    }

    componentWillUnmount() { 
        console.log("specialities: component will unmount called")
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <ListItem
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent'}}
        titleStyle={{ color: '#FFFFFF'}}
        title={item.specialityName}
        onPress={() => this._moveToClinics(item.specialityId)}
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

        return (
            <ImageBackground source={require('../image/planificar.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Spinner
                        visible={this.props.loading}
                    />
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.specialities}
                    renderItem={this.renderItem}
                    containerStyle={{ borderBottomWidth: 0 }}
                    ItemSeparatorComponent={this.renderSeparator}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.props.isRefreshing}
                          onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    />
                </View>
            </ImageBackground>
          )
    }

    onRefresh() {
        this.props.refreshSpecialities(this.props.idUser);
    }

    _moveToClinics = (specialityId) => {
        this.props.navigation.navigate('Clinics', 
        {specialityId:specialityId});
    };
}

const mapStateToProps = state => ({
    specialities: state.user.specialities,
    idUser: state.user.idUser,
    isRefreshing: state.user.refreshing,
    loading: state.user.loading
})

const mapDispatchToProps = dispatch => ({
    fetchSpecialities: userId => dispatch(fetchSpecialities(userId)),
    refreshSpecialities: userId => dispatch(refreshSpecialities(userId)),
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