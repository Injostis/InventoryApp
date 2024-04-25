import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AddButton({ onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <Ionicons name="add" size={40} color={"white"} />
      </Pressable>
    </View>
  );
}

export default AddButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
    borderRadius: 30,
    overflow: "hidden",
  },
});
