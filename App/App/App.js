import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import AddSideEffect from './Screens/AddSideEffect'
import SideEffectModalIntensity from './Screens/SideEffectModalIntensity'
import SideEffectModalType from './Screens/SideEffectModalType'
import Overview from './Screens/Overview'
import {init} from './Database/realm'

init()

let DailyMood = StackNavigator({Main: {screen: AddSideEffect},})
const modalNavigator = StackNavigator( 
  {
    Main: {
      screen: DailyMood
    },
    SideEffectIntensityDialog: {
        screen: SideEffectModalIntensity
      },
    SideEffectTypeDialog: {
        screen: SideEffectModalType
      },
    Overview: {
        screen: Overview
      }
  }
)

DailyMood = StackNavigator(
  {
    Main: {screen: AddSideEffect},
    modalNavigator: {
      screen: modalNavigator
    } 
  },
  {
    mode: 'modal',
  } 
);

export default DailyMood