import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../components/supabase";

import Subtitle from "../../components/Subtitle";
import WordInput from "../../components/Inputs/WordInput";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

import Colors from "../../constants/colors";

function EditSupplierScreen({ navigation, route }) {
  const [supplierName, setSupplierName] = useState(null);
  const [supplierDescription, setSupplierDescription] = useState(null);

  const supplierItemId = route.params.supplierItemId;

  useFocusEffect(
    useCallback(() => {
      async function fetchSupplier() {
        let { data: Supplier, error } = await supabase
          .from("Supplier")
          .select("*")
          .eq("id", supplierItemId)
          .single();
        setSupplierName(Supplier.name);
        setSupplierDescription(Supplier.description);
      }
      fetchSupplier();
    }, [])
  );

  function supplierNameHandler(enteredText) {
    setSupplierName(enteredText);
  }

  function supplierDescriptionHandler(enteredText) {
    setSupplierDescription(enteredText);
  }

  async function editButtonHandler() {
    if (!supplierName || !supplierDescription) {
      Alert.alert(
        "Incomplete fields",
        "Please fill out all fields before adding the supplier."
      );
      return;
    }

    const { data, error } = await supabase
      .from("Supplier")
      .update([
        {
          name: supplierName,
          description: supplierDescription,
        },
      ])
      .eq("id", supplierItemId)
      .select();

    navigation.navigate("Suppliers");
  }

  async function deleteButtonHandler() {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete this supplier?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const { error } = await supabase
              .from("Supplier")
              .delete()
              .eq("id", supplierItemId);
            navigation.navigate("Suppliers");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
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
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={deleteButtonHandler}>Delete</PrimaryButton>
            <PrimaryButton onPress={editButtonHandler}>Edit</PrimaryButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default EditSupplierScreen;

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
  buttonsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
