import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

export default class AddSideEffect extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)
    this._onPressButton = this._onPressButton.bind(this)
    this._onPressOverviewButton = this._onPressOverviewButton.bind(this)
  }

  _onPressButton() {
    const { navigate } = this.props.navigation;
    navigate('SideEffectIntensityDialog', {key: this.props.navigation.state.key})
  }

  _onPressOverviewButton() {
    const { navigate } = this.props.navigation;
    navigate('Overview')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.interactionDescription}>
            Add new Side effect
          </Text>
        </View>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton} underlayColor={'lightgray'}>
            <View>
              <Text style={styles.addButtonText}>
                +
              </Text>
            </View>
        </TouchableHighlight>
        <View style={styles.modalFooter}>
          <TouchableHighlight style={styles.buttonSmall} onPress={this._onPressOverviewButton} underlayColor={'lightgray'}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../assets/chart.png')}
              />
        </TouchableHighlight>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 40,
  },
  buttonSmall: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {

  },
  addButtonText: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modalHeader: {
    position: 'absolute',
    top: 100
  },
  modalFooter: {
    position: 'absolute',
    bottom: 10,
    justifyContent: 'flex-start',
    width: '90%'
  },
  interactionDescription: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Avenir Next'
  },
});