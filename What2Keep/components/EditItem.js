import {  ImageBackground, StyleSheet, Image, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function EditItem({ navigation }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <ImageBackground source = {require('../assets/itemBackground.png')}
      resizeMode = "cover"
      style = {styles.image}>
    
    <Text style={{fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}>Edit Item</Text>

    <Text style={styles.inputText}>Item Name:</Text>
      <TextInput 
        placeholder="Blue Scarf"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        style={styles.input}
      />

    <Text style={styles.inputText}>Item Description:</Text>
      <TextInput 
        placeholder="Birthday Present, In Downstairs Closet"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.inputdes}
      />
    
    <View style = {styles.container}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("StuffPage");}}
          >
            <Image source={require('../assets/checkButton.png')} style={{ width: 90, height: 90, position: 'absolute', bottom: 0, left: 0 }} />
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("StuffPage");}}
          >
            <Image source={require('../assets/deleteButton.png')} style={{ width: 90, height: 90, position: 'absolute', bottom: 0, right: 0 }} />
        </TouchableOpacity>
    </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
    autoCapitalize: 'none'
  },
  inputdes: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
    padding: 30
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 90,
    alignSelf: 'flex-end',
    marginBottom: 20
    // marginBottom: 20,
    // shadowColor: '#303838',
    // shadowOffset: { width: 0, height: 5 },
    // shadowRadius: 10,
    // shadowOpacity: 0.35,
  },
  inputText: {
    fontFamily: 'Inter-Light', 
    fontSize: 20,
    autoCapitalize: 'none'
  }
});
