import React from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Alert } from 'react-native';
import openMap from 'react-native-open-maps';
import { Icon } from 'react-native-elements';

export class FlatListItem extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("clinics flat list: component did mount called")
    }

    componentWillUnmount() { 
        console.log("clinics flat list: component will unmount called")
    }

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
                            onPress={() => openMap({ query: this.props.item.clinicName})}/>
                        <TouchableHighlight onPress={() => this.confirmBox()}>
                            <Text style={styles.flatListItem}> {this.props.item.clinicName} </Text>
                        </TouchableHighlight>
                        <Text style={styles.rigthListItem}>{this.props.item.distance ? this.props.item.distance : '0'} km</Text>
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