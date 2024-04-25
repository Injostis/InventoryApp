import { View, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function NumberInput({ onChangeText, value }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        keyboardType="decimal-pad"
      />
    </View>
  );
}

export default NumberInput;

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
