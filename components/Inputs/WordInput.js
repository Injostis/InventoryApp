import { View, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function WordInput({ onChangeText, value }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default WordInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: 35,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.accent400,
  },
  textInput: {
    fontFamily: "georama-regular",
    color: "black",
    textAlign: "center",
  },
});
