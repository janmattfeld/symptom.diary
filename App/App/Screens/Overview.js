import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Slider,
  Dimensions
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { SmoothLine } from 'react-native-pathjs-charts'

let symptoms = [
  'Headache',
  'Nausia',
  'Pain'
]

let generateData = (days) => {
  var d = []
  for(var i=0; i<days; i++){
    d.push({
      "y": Math.max(0, Math.min( Math.round(Math.random() * 10), 10 ) ),
      "x": i
    })
  }
  return [d]
}

let options = {
      width: 280,
      height: 280,
      color: '#2980B9',
      margin: {
        top: 20,
        left: 45,
        bottom: 25,
        right: 20
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: false,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }



export default class Overview extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)
    this.state = {
      intensity: 5,
      windowWidth: Dimensions.get('window').width
    }

    this.__onValueChanged = this.__onValueChanged.bind(this)
    this.__onNextPressed = this.__onNextPressed.bind(this)
  }

  componentDidMount() {
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

  __renderSymptom(issue){
    return (
      <View style={styles.carouselSlide}>
        <Text style={styles.title}>{issue} (last 14 days) </Text>
        <SmoothLine data={generateData(14)} options={options} xKey='x' yKey='y' />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.interactionDescription}>
            Your Sideeffects
          </Text>
        </View>
        <View style={styles.carousel}>
          <Carousel
                ref={(carousel) => { this._carousel = carousel; }}
                sliderWidth={this.state.windowWidth}
                itemWidth={this.state.windowWidth * 0.85}
                style={styles.carousel}
              >
                  {
                    symptoms.map(this.__renderSymptom)
                  }
          </Carousel>
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
  carousel: {
    position: 'absolute',
    bottom: 40
  },
  carouselSlide: {
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgray'
  }
});