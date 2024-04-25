import { View, Text, StyleSheet } from "react-native";

function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "georama-regular",
    textAlign: "center",
  },
  subtitleContainer: {
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 4,
  },
});
