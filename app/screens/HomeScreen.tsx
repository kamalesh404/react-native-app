import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function HomeScreen: React.FC {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native Task Manager</Text>
      <Button title="Add Task" onPress={() => {}} />
      <Button title="View Tasks" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
})