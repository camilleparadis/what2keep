import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

export default function ViewItem({ navigation }) {
  return (
    <ImageBackground source = {require('../assets/itemBackground.png')}
      resizeMode = "cover"
      style = {styles.image}>
    
    <Text style={{fontFamily: "Inter-Light", fontSize: 40, padding: 30 }}>View Item</Text>

    <View style = {styles.container}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("EditItem");}}
          >
            <Image source={require('../assets/editButton.png')} style={{ width: 130, height: 130, position: 'absolute', bottom: -25, left: 0 }} />
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

