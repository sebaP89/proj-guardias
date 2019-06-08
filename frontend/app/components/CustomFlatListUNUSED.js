import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

export class FlatListItem extends React.Component {
    constructor(props) {
        super(props);
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
                    backgroundColor: 'mediumseagreen'
                }}>
                    <Image
                        source={require('../image/drawer.png')}
                        style={{width:100, height:100, margin:5}}
                    ></Image>
                    <View style={{
                        flex:1,
                        flexDirection:'column',
                        height:100
                    }}>
                        <Text style={StyleSheet.flatListItem}>{this.props.item.clinicName}</Text>
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
        color: 'white',
        padding:10,
        fontSize:16,
    },
});