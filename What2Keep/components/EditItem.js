import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

export default function EditItem({ route, navigation }) {
  const { userId /*itemId */ } = route.params;
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [usage, setUsage] = useState(0);

  const editingItem = async () => {
    axios
      .patch("https://what2keep.azurewebsites.net/user-items", {
        userId,
        // itemId,
        category: category ? category : undefined,
        location: location ? location : undefined,
        info: description ? description : undefined,
        image: image ? description : undefined,
        name: itemName ? itemName : undefined,
        usage: usage ? usage : undefined,
      }) // localhost
      .then((response) => {
        navigation.navigate("StuffPage", {
          userId: userId,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/itemBackground.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={{ fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}>
          Edit Item
        </Text>

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

        <Text style={styles.inputText}>Item category:</Text>
        <TextInput
          placeholder="i.e. accessory"
          value={category}
          onChangeText={(text) => setCategory(text)}
          style={styles.input}
        />

        <Text style={styles.inputText}>Item image:</Text>
        <TextInput
          placeholder="a url which points to the image"
          value={image}
          onChangeText={(text) => setImage(text)}
          style={styles.input}
        />

        <Text style={styles.inputText}>Item location:</Text>
        <TextInput
          placeholder="i.e. my apartment"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        />

        <Text style={styles.inputText}>Item usage:</Text>
        <TextInput
          placeholder="i.e. usage per week"
          value={usage}
          onChangeText={(text) => setUsage(text)}
          style={styles.input}
        />

        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={editingItem}>
            <Image
              source={require("../assets/checkButton.png")}
              style={{
                width: 90,
                height: 90,
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("StuffPage", {
                userId: userId,
              });
            }}
          >
            <Image
              source={require("../assets/deleteButton.png")}
              style={{
                width: 90,
                height: 90,
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // alignItems: 'flex-end',
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
    autoCapitalize: "none",
  },
  inputdes: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    width: "80%",
    padding: 30,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 90,
    alignSelf: "flex-end",
    marginBottom: 20,
    // marginBottom: 20,
    // shadowColor: '#303838',
    // shadowOffset: { width: 0, height: 5 },
    // shadowRadius: 10,
    // shadowOpacity: 0.35,
  },
  inputText: {
    fontFamily: "Inter-Light",
    fontSize: 20,
    autoCapitalize: "none",
  },
});
