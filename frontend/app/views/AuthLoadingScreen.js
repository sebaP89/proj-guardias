import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = () => {
        // modify when token logic is implemented
        this.props.navigation.navigate(this.props.userValid === true ? 'Urgencies' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userValid: state.user.valid,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps)(AuthLoadingScreen);