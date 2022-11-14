import { ImageBackground, StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground source = {require('../assets/loginBackground.png')}
    resizeMode = "cover"
    style = {styles.image}>

    <SafeAreaView style={styles.container}>
    <Text style={{fontFamily: 'Iowan Old Style', fontSize: 40, padding: 30 }}>Login</Text>
      <Text style={styles.inputText}>Enter Email:</Text>
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        // keyboardType="email-address"
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Home");
        }}
        underlayColor='#fff'>
        <Text style={{fontFamily: 'Iowan Old Style', fontSize: 17, padding: 1 }}>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
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
    fontFamily: 'Iowan Old Style', 
    fontSize: 15,
  }
});

