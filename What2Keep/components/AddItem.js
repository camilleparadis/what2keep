import { ImageBackground, StyleSheet, Image, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import axios from "axios";

export default function AddItem({ navigation }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  // const [collection, setCollection] = useState("");
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

  // const testingConnection2 = async () => {
  //   axios
  //     .get("https://what2keep.azurewebsites.net/users") // localhost
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  async function addItem(){
    try{
      const response = await axios.post("https://what2keep.azurewebsites.net/users-items")
        
    }
  }

  return (
    <ImageBackground source = {require('../assets/itemBackground.png')}
      resizeMode = "cover"
      style = {styles.image}>

    <Text style={{fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}>Add Your Item</Text>

    <Text style={styles.inputText}>Item Name:</Text>
      <TextInput 
        placeholder="i.e. Blue Scarf"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        style={styles.input}
      />

<Text style={styles.inputText}>Item Description:</Text>
      <TextInput 
        placeholder="i.e. Birthday Present, In Downstairs Closet"
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

      {/* <View>
        <Text>AddItem</Text> 
        <Button title="testing" onPress={testingConnection2} />
      </View> */}
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


