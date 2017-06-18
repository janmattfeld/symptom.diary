import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Slider
} from 'react-native';


export default class SideEffectModalIntensity extends Component {
  static navigationOptions = {
    header: null,
    mode: 'modal'
  };

  constructor(props){
    super(props)
    this.state = {
      intensity: 5
    }

    this.__onValueChanged = this.__onValueChanged.bind(this)
    this.__onNextPressed = this.__onNextPressed.bind(this)
  }

  __onValueChanged(value) {
    console.log("Button Pressed", value)
    if(value > 0){
      this.setState({
        intensity: value
      })
    }
  }

  __onNextPressed() {
    const { navigate, goBack } = this.props.navigation;
    // goBack()
    navigate('SideEffectTypeDialog', {
      intensity: this.state.intensity,
      // prevKey: this.props.navigation.state.key
      prevKey: this.props.navigation.state.params.key
    })

  }

  componentDidMount(){
    // if(this.props.navigation.state.params.back){
    //   this.props.navigation.goBack()
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.interactionDescription}>
            What's the intensity?
          </Text>
        </View>

        <View style={styles.sliderWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.intensityLabel}>
              {this.state.intensity}
            </Text>
          </View>
          <Slider 
            onValueChange={this.__onValueChanged}
            maximumValue={10}
            minimumValue={0}
            value={this.state.intensity}
            step={1}
            style={styles.IntensitySlider}/>
        </View>

        <View style={styles.modalFooter}>
          <TouchableHighlight style={styles.button} onPress={this.__onNextPressed}>
            <View >
              <Text style={styles.buttonText}>Next</Text>
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