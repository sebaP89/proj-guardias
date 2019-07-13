import React from 'react';
import { ImageBackground, Alert } from 'react-native';

export class ErrorAlert extends React.Component {
    
    displayError() {
        Alert.alert(
          'Error',
          this.props.errorMessage,
          [
            {text: 'Recargar', onPress: () => this.props.onPress()},
          ]
        );
      }
    
    render() {
        return (
            <ImageBackground 
                source={require('../image/planificar.png')}
                style={{width: '100%', height: '100%'}}>
                    {this.displayError()}
            </ImageBackground>
        );
    }
}