import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

const BirthdaySignUp = ({ currentUser }) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [color, setColor] = useState("#d3d3d3");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleLogin = () => {
    currentUser.birthday = date;
    navigation.navigate("EmailSignUp");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
    setDate(date);
    setColor("black");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 2 of 4</Text>
      <Text style={styles.stepSubscript}>(halfway there!)</Text>
      <View>
        <View style={styles.icon}>
          <Icon color="black" name="cake-variant" size={25} />
        </View>
      </View>
      <Text style={styles.normTxt}>What's your birthday?</Text>
      <TouchableOpacity
        style={{
          position: "relative",
          bottom: "22%",
          position: "relative",
          borderBottomWidth: 3,
          width: "95%",
        }}
        onPress={showDatePicker}
      >
        <Text
          style={{
            fontSize: 35,
            color: color,
            paddingBottom: 10,
            paddingLeft: 5,
          }}
        >
          {date.toDateString().substring(4)}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        pickerContainerStyleIOS={{
          fontFamily: "karla-bold",
        }}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onChange={(date) => setDate(date)}
        customHeaderIOS={() => {
          return (
            <View
              style={{
                padding: 16,
                backgroundColor: global.yellow,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 22,
                }}
              >
                Choose your birthday
              </Text>
            </View>
          );
        }}
        customConfirmButtonIOS={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisibility(false);
                setColor("black");
              }}
              style={{
                padding: 20,
                backgroundColor: global.yellow,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>Confirm</Text>
            </TouchableOpacity>
          );
        }}
        customCancelButtonIOS={() => {
          return <View></View>;
        }}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Icon style={{ color: "white" }} name="chevron-right" size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: "15%",
    paddingRight: "15%",
  },
  buttonView: {
    alignSelf: "flex-end",
    marginRight: "-10%",
    marginBottom: "10%",
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: global.orange,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: 40,
    bottom: "15%",
  },
  step: {
    alignSelf: "center",
    fontSize: 24,
    fontFamily: "karla-bold",
    marginTop: "0%",
  },
  stepSubscript: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "karla-bold",
    position: "absolute",
    marginTop: "10%",
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: global.orange,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    top: "-100%",
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(BirthdaySignUp);
