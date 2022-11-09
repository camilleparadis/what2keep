import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from "react-native";
import React from "react";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
      <Text>Enter Email:</Text>
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <Text>Enter Password:</Text>
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        keyboardType="visible-password"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="LOGIN"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9DCC8",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
  }
});

