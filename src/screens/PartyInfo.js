import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import NextButton from "../components/NextButton";

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

  const handleNext = () => {
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
        partyName: partyName,
        partySize: partySize,
      });
    }
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

      <NextButton onPress={handleNext} />
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
});

export default PartyInfo;
