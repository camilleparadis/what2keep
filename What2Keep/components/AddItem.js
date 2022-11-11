import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import axios from "axios";

export default function AddItem({ navigation }) {
  // NO CLUE WHY THIS DOESN'T WORK????
  // const testingConnection = () => {
  //   return fetch("http://192.168.1.12:5001/")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const testingConnection2 = async () => {
    axios
      .get("http://192.168.1.12:5001/") // use machine's ip as stand in for localhost
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>AddItem</Text>
      <Button title="testing" onPress={testingConnection2} />
    </View>
  );
}

const styles = StyleSheet.create({});
