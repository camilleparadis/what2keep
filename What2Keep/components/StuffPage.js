import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  DatePickerAndroid,
} from "react-native";
import React, { useState } from "react";
import { FAB } from "react-native-elements";

export default function StuffPage({ route, navigation }) {
  const { userId } = route.params;
  const [items, setItems] = useState([
    { name: "brown scarf", description: "in downstairs closet", key: 1 },
    { name: "blue jeans", description: "abercrombie, size 26", key: 2 },
  ]);

  return (
    <ImageBackground
      source={require("../assets/launchBackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <ScrollView>
          {items.map((item) => {
            return (
              <View key={item.key}>
                <TouchableOpacity
                  // title={item.name}
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate("ViewItem", {
                      userId: userId,
                    });
                  }}
                >
                  <Text style={styles.inputText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <FAB
          style={{ padding: 20 }}
          onPress={() => {
            navigation.navigate("AddItem", {
              userId: userId,
            });
          }}
          title="Add Item"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "#F4BAA7",
    fontSize: 24,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
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
    fontSize: 25,
    autoCapitalize: "none",
  },
});

{
  /* <View>
      <Text style= {styles.inputText}>Your Items</Text>
      <Button
        title="GOTO ViewItem"
        onPress={() => {
          navigation.navigate("ViewItem");
        }}
      />
      <Button
        title="GOTO AddItem"
        onPress={() => {
          navigation.navigate("AddItem");
        }}
      />
    </View>
);
} */
}
