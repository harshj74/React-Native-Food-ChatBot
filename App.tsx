import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatBot from './src/ChatBot'

const App = () => {
  return (
    <View style={styles.container}>
      <ChatBot/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3eceb',
    //alignItems: 'center',
    justifyContent:'center'
  }
})