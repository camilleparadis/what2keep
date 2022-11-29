import { ImageBackground, StyleSheet, Text, Button, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import axios from 'axios';

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function addUser() {
    try {
      const response = await axios.post("https://what2keep.azurewebsites.net/users", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      navigation.navigate("Home", {
        userIDkey: response.data,
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <ImageBackground source = {require('../assets/loginBackground.png')}
    resizeMode = "cover"
    style = {styles.image}>
    <SafeAreaView style={styles.container}>
      <Text style={{fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}>Register</Text>
      <Text style={styles.inputText}>Enter Name:</Text>
      <TextInput 
        placeholder='e.g. John Doe'
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
         />
      <Text style={styles.inputText}>Enter Email:</Text>
      <TextInput 
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Text style={styles.inputText}>Enter Password:</Text>
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        // keyboardType="visible-password"
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.inputText}>Re-Enter Password:</Text>
      <TextInput style={styles.input}/>
    </SafeAreaView>
    <TouchableOpacity
        style={styles.button}
        // onPress={() => {
        //   navigation.navigate("Home");
        // }}
        // onPress={() => {addUser; navigation.navigate("Home")}}
        onPress={addUser}
        underlayColor='#fff'>
        <Text style={{fontFamily: "Inter-Light", fontSize: 17, padding: 1 }}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    fontFamily: "Inter-Light", 
    autoCapitalize: 'none'
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    padding: 40,
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  inputText: {
    fontFamily: 'Inter-Light', 
    fontSize: 15,
    autoCapitalize: 'none'
  }
});
