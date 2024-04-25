import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import { supabase } from "../../components/supabase";

import Subtitle from "../../components/Subtitle";
import WordInput from "../../components/Inputs/WordInput";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

import Colors from "../../constants/colors";

function AddSupplierScreen({ navigation }) {
  const [supplierName, setSupplierName] = useState(null);
  const [supplierDescription, setSupplierDescription] = useState(null);

  function supplierNameHandler(enteredText) {
    setSupplierName(enteredText);
  }

  function supplierDescriptionHandler(enteredText) {
    setSupplierDescription(enteredText);
  }

  async function acceptButtonHandler() {
    if (!supplierName || !supplierDescription) {
      Alert.alert(
        "Incomplete fields",
        "Please fill out all fields before adding the supplier."
      );
      return;
    }

    const { data, error } = await supabase
      .from("Supplier")
      .insert([
        {
          name: supplierName,
          description: supplierDescription,
        },
      ])
      .select();

    navigation.navigate("Suppliers");
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="height">
        <View style={styles.rootContainer}>
          <Subtitle>Name</Subtitle>
          <WordInput onChangeText={supplierNameHandler} value={supplierName} />
          <Subtitle>Description</Subtitle>
          <WordInput
            onChangeText={supplierDescriptionHandler}
            value={supplierDescription}
          />
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={acceptButtonHandler}>Accept</PrimaryButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AddSupplierScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 20,
    marginVertical: 40,
    marginHorizontal: 40,
    backgroundColor: Colors.primary700,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
