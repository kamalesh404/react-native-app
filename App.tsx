import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './app/screens/HomeScreen'

export default function App() {
  return (
    <NavigationContainer>
      <statusBar style="default" />
      <HomeScreen />
    </NavigationContainer>
  )
}