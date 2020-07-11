import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// prob shouldn't be hardcoding api key in here but works for now
const api_key =
  "rfzFsGmwjhmXJqBMeXgjk8VTwpz8zevZE0xPzGz2YAzDiP15VI5alXOxkDD_GlFneIOTsee7mp5RYx5DVb10CJOlNw58NqlfmwItWr4D5NzfFWge7XEnp8kNrE7UXnYx";
const url = "https://api.yelp.com/v3/businesses/search?";

const PartyInfo = ({ route, navigation }) => {
  const [partyName, setPartyName] = useState("");
  const [partySize, setPartySize] = useState(0);

  // extract data from route (variable name must equal whatever passed in)
  // const {user} = route.params

  // helper functions to handle user input
  const onChangePartySize = (partySize) => {
    setPartySize(partySize);
  };

  const onChangePartyName = (partyName) => {
    setPartyName(partyName);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Party Name"
        style={styles.input}
        onChangeText={onChangePartyName}
      />
      <TextInput
        placeholder="Party Size"
        keyboardType={"numeric"}
        style={styles.input}
        onChangeText={onChangePartySize}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!partyName || !partySize) {
            Alert.alert(
              "Empty field",
              "Please enter all info",
              [
                {
                  text: "Ok",
                  style: "cancel",
                },
              ],
              { cancelable: true }
            );
          } else {
            navigation.navigate("Search", {
              // user: user,
              partyName: partyName,
              partySize: partySize,
            });
          }
        }}
      >
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center",
  },
});

export default PartyInfo;
