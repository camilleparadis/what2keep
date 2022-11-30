import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function Home({ route, navigation }) {
  const { userId } = route.params;
  return (
    <ImageBackground
      source={require("../assets/homeBackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.image}>
        <Image
          source={require("../assets/W2KLogo.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <Text
        style={{
          fontSize: 25,
          padding: 40,
          paddingTop: 80,
          paddingBottom: 10,
          textAlign: "center",
          fontFamily: "Inter-Light",
        }}
      >
        “The easiest way to organize your stuff is to get rid of most of it”
      </Text>
      <Text
        style={{ fontSize: 15, paddingBottom: 100, fontFamily: "Inter-Light" }}
      >
        -Joshua Fields Millburn
      </Text>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          navigation.navigate("StuffPage", {
            userIDkey: userId
          });
        }}
        underlayColor="#fff"
      >
        <Text style={styles.loginText}>View Your Stuff!</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate("Stats", {
              userIDkey: userId
            });
          }}
          underlayColor="#fff"
        >
          <Text style={styles.loginText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate("Settings");
          }}
          underlayColor="#fff"
        >
          <Text style={styles.loginText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute"
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  button1: {
    // flex: 1,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    // marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 40,
    backgroundColor: "#F4BAA7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  bottomButton: {
    // marginRight:40,
    // marginLeft:40,
    // flex: 1,
    // marginTop:10,
    margin: 8,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 40,
    backgroundColor: "#F4BAA7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginText: {
    fontSize: 20,
    fontFamily: "Inter-Light",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
