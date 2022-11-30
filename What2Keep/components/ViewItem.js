import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { access } from "../Access";

export default function ViewItem({ route, navigation }) {
  const { userId } = route.params;
  const { itemId } = route.params;
  const [item, setItem] = useState([""]);
  // const [itemName, setItemName] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [location, setLocation] = useState("");
  // const [image, setImage] = useState("");
  // const [usage, setUsage] = useState(0);

  const getItem = () => {
    axios
      .get(
        /*"http://10.144.34.37:5001/user-items/"*/ access +
          "user-items/" +
          userId +
          "/" +
          itemId
      )
      .then((response) => {
        // console.log(response.data);
        setItem(response.data);
        return response.data;
      });
  };
  useEffect(() => {
    getItem();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/itemBackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView>
        <View style={styles.attributes}>
          <Text
            style={{ fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}
          >
            View Item
          </Text>

          <Text style={styles.inputText}>Item Name:</Text>
          <Text style={styles.item}>{item.name}</Text>
          <Text style={styles.inputText}>Item Description:</Text>
          <Text style={styles.item}>{item.info}</Text>
          <Text style={styles.inputText}>Item Category:</Text>
          <Text style={styles.item}>{item.category}</Text>
          <Text style={styles.inputText}>Item Location:</Text>
          <Text style={styles.item}>{item.location}</Text>
          <Text style={styles.inputText}>Item Image:</Text>
          <Image
            source={{ uri: item.image }}
            style={{ width: 150, height: 150 }}
          />
          <Text style={styles.inputText}>Item Usage:</Text>
          <Text style={styles.item}>{item.usage}</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("EditItem", {
                userId: userId,
                itemId,
              });
            }}
          >
            <Image
              source={require("../assets/editButton.png")}
              style={{
                width: 130,
                height: 130,
                position: "absolute",
                bottom: -25,
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
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // alignItems: 'flex-end',
    justifyContent: "center",
  },
  attributes: {
    flex: 1,
    alignItems: "center",
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
  item: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F4BAA7",
    fontSize: 20,
    width: "80%",
  },
});
