import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*"https://what2keep.azurewebsites.net/users"*/
  async function logIn() {
    // backend checks auth
    try {
      console.log("trying to login");
      console.log("email: " + email);
      console.log("password: " + password);
      /*const response = await*/ axios
        .get("http://192.168.1.12:5001/users/" + email + "/" + password) // TODO: ADD PASSWORD ONCE THAT HAS BEEN FIXED WITH THE API
        .then((response) => {
          console.log("userId: " + response.data);
          // let result = findUserByEmail(response.data.email)
          navigation.navigate("Home", {
            userId: response.data,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // async function getUsers() {
  //   try {
  //     const user_list = await axios.get("https://what2keep.azurewebsites.net/users", {
  //       // email: email,
  //       // password: password,
  //     });
  //     console.log(user_list)
  //     let result = user_list.filter(user => user.email = email);
  //     if (result){
  //       return result
  //     }
  //     else{
  //       return false
  //     }
  //     // console.log(foundUser['email']);
  //     // navigation.navigate("Home");
  //     // return foundUser;

  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  return (
    <ImageBackground
      source={require("../assets/loginBackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <Text style={{ fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}>
          Login
        </Text>
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
          // onPress={getUsers}
          onPress={logIn}
          underlayColor="#fff"
        >
          <Text style={{ fontFamily: "Inter-Light", fontSize: 17, padding: 1 }}>
            LOGIN
          </Text>
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
    width: "80%",
    autoCapitalize: "none",
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
    autoCapitalize: "none",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  inputText: {
    fontFamily: "Inter-thin",
    fontSize: 15,
    autoCapitalize: "none",
  },
});
