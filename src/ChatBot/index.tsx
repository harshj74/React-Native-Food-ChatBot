import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const CHATGPT_API_KEY = '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'

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage))

      const messageText = userMessage.text.toLowerCase();
console.log(messageText);

      const keywords = ['recipe', 'food', 'diet', 'fruit', 'vegetable']
      const newkeywords = ['hi', 'hello', 'namaste']

      if (!keywords.some(keywords => messageText.includes(keywords))) {
        // if (newkeywords.some(text => messageText.includes(text))) {
        //   const botMessage = {
        //     _id: new Date().getTime() + 1,
        //     text: "Hii I'm your food bot, how can i assist you ?",
        //     createdAt: new Date(),
        //     user: {
        //       _id: 2,
        //       name: "Food Bot"
        //     }
        //   };
        //   setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage))
        //   return;
        // }
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm your food bot, ask me anything related to food and recipe",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Food Bot"
          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage))
        return;
      }

      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Get me a recipe for ${messageText}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHATGPT_API_KEY}`
          }
        });
      console.log(response.data);

      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Food Bot'
        }
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.view}>
        <Text style={styles.text}>Food Bot</Text>
      </View>
      <GiftedChat scrollToBottomStyle={{ height: 80 }}
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1 }}
      />

    </View>
  )
}

export default ChatBot

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#a6dad7',
    padding: 10,
    alignItems: 'center',
    marginBottom: 5,
    margin: 20,
    borderRadius: 25,
    //borderWidth: 2,
    //borderColor: '#21a29c',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#21a29c'
  }
})