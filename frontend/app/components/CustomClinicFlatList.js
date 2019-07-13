import React from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Alert } from 'react-native';
import openMap from 'react-native-open-maps';
import { Icon } from 'react-native-elements';
import getDistance from 'geolib/es/getDistance';

export class FlatListItem extends React.Component {
    state = {
        distance: ""
      };
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let coordsArray = this.props.item.clinicCoords.split(', ');
        let latitude = parseFloat(coordsArray[0]);
        let longitude = parseFloat(coordsArray[1]);
        console.log(`latitude: ${latitude}. Longitude: ${longitude}`);
        this._getDistance(latitude, longitude);
    }

    _getDistance = (latitude, longitude) => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log(`current coords: ${JSON.stringify(position)}`);
                const distance = getDistance(position.coords, {
                    latitude: latitude,
                    longitude: longitude,
                });
                this.setState({ distance: (distance/1000).toFixed(2)});
            }.bind(this)
        )
    };
      
    confirmBox() {
        Alert.alert(
          'Reserva',
          '¿Querés reservar tu turno?',
          [
            {text: 'NO', style: 'cancel'},
            {text: 'SI', onPress: () => this.props.handlePress()},
          ]
        );
    }

    render() {
        let coordsArray = this.props.item.clinicCoords.split(', ');
        let latitude = parseFloat(coordsArray[0]);
        let longitude = parseFloat(coordsArray[1]);

        return (
            <View style={{
                flex:1,
                flexDirection:'column',
            }}>
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    backgroundColor: 'transparent'
                }}>
                    <View style={{ flex:1, flexDirection:'row', height:50, justifyContent: 'space-between',}}>
                        <Icon
                            name="ios-map"
                            type="ionicon"
                            color="#FFFFFF"
                            containerStyle={styles.icon}
                            onPress={() => openMap({ latitude, longitude})}/>
                        <TouchableHighlight onPress={() => this.confirmBox()}>
                            <Text style={styles.flatListItem}> {this.props.item.clinicName} </Text>
                        </TouchableHighlight>
                        <Text style={styles.rigthListItem}>{this.state.distance} km</Text>
                    </View>
                </View>
                <View style={{
                    height:1,
                    backgroundColor:'white'
                }}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color:'white',
        fontSize:16,
        width: '70%'
    },
    rigthListItem: {
        color: 'white',
        fontSize:16,
        paddingRight: 10
    },
    icon: {
        paddingLeft: 10,
        paddingRight: 10,
    }
});