import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Picker
} from 'react-native';
import {NavigationActions} from 'react-navigation'

import {writeAdverseReaction} from '../Database/realm'

const issues = [
  'Headache',
  'Diareha',
  'Pain'
]

export default class SideEffectModalType extends Component {
  static navigationOptions = {
    header: null,
    mode: 'modal'
  };

  constructor(props){
    super(props)
    this.state = {
      intensity: 5,
      issue: issues[0]
    }

    this.__onValueChanged = this.__onValueChanged.bind(this)
    this.__onFinish = this.__onFinish.bind(this)
  }

  componentDidMount() {
    console.log(this.props.navigation)
    // Insert passed variables to state
    this.setState({
      ...this.props.navigation.state.params
    })
  }

  __onValueChanged(itemValue, itemIndex){
    this.setState({issue: itemValue})
  }

  __onFinish() {
    console.log("Finish with values", this.state)
    const { navigate, dispatch, goBack } = this.props.navigation;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'}),
      ]
    })
    const backAction = NavigationActions.back({
      key: this.state.prevKey
    })

    writeAdverseReaction(this.state.issue, this.state.intensity)

    dispatch(resetAction)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.interactionDescription}>
            What's the issue?
          </Text>
        </View>

        <View style={styles.sliderWrapper}>
          <Picker
            selectedValue={this.state.issue}
            onValueChange={this.__onValueChanged}>
            {
              issues.map( (issue) => {
                return (
                 <Picker.Item
                  key={issue} 
                  label={issue} value={issue} 
                  />
                )
              })
            }
          </Picker>
        </View>

        <View style={styles.modalFooter}>
          <TouchableHighlight style={styles.button} onPress={this.__onFinish}>
            <View>
              <Text style={styles.buttonText}>Finish</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  // Layouting
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  modalHeader: {
    position: 'absolute',
    top: 100
  },
  modalFooter: {
    position: 'absolute',
    bottom: 100
  },

  // Button
  button: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 70,
  },
  buttonText: {
    fontSize: 20
  },


  sliderWrapper: {
    width: '90%',
  },
  textWrapper: {
    alignItems: 'center',
    marginBottom: 20
  },
  intensityLabel: {
    fontSize: 50,
  },
  interactionDescription: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Avenir Next'
  },
});