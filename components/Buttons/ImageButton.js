import { Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ImageButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Menu");
      }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Image
        source={require("../../assets/images/image.png")}
        style={styles.image}
      />
    </Pressable>
  );
}

export default ImageButton;

const styles = StyleSheet.create({
  image: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
