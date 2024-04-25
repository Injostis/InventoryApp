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
import TypeInput from "../../components/Inputs/TypeInput";
import NumberInput from "../../components/Inputs/NumberInput";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

import Colors from "../../constants/colors";

function AddItemScreen({ navigation }) {
  const [itemName, setItemName] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [itemStock, setItemStock] = useState(null);
  const [itemMaxStock, setItemMaxStock] = useState(null);
  const [itemType, setItemType] = useState(null);

  function itemNameHandler(enteredText) {
    setItemName(enteredText);
  }

  function itemDescriptionHandler(enteredText) {
    setItemDescription(enteredText);
  }

  function itemPriceHandler(enteredText) {
    const validatedText = enteredText
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const nonZeroStartText = validatedText.replace(/^0+(?!\.|$)/, "");
    setItemPrice(nonZeroStartText);
  }

  function itemStockHandler(enteredText) {
    const validatedText = enteredText
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const nonZeroStartText = validatedText.replace(/^0+(?!\.|$)/, "");
    setItemStock(nonZeroStartText);
  }

  function itemMaxStockHandler(enteredText) {
    const validatedText = enteredText
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const nonZeroStartText = validatedText.replace(/^0+(?!\.|$)/, "");
    setItemMaxStock(nonZeroStartText);
  }

  function itemTypeHandler(enteredValue) {
    setItemType(enteredValue);
  }

  async function acceptButtonHandler() {
    if (
      !itemName ||
      !itemDescription ||
      !itemPrice ||
      !itemStock ||
      !itemMaxStock ||
      !itemType
    ) {
      Alert.alert(
        "Incomplete fields",
        "Please fill out all fields before adding the item."
      );
      return;
    }

    const stockValue = Number(itemStock);
    const maxStockValue = Number(itemMaxStock);

    if (maxStockValue <= 0) {
      Alert.alert("Invalid Stock", "The max stock cannot be 0.");
      return;
    }

    if (stockValue > maxStockValue) {
      Alert.alert(
        "Invalid Stock",
        "The stock cannot be greater than the maximum stock."
      );
      return;
    }

    const { data, error } = await supabase
      .from("Item")
      .insert([
        {
          name: itemName,
          description: itemDescription,
          price: Number(itemPrice),
          stock: stockValue,
          max_stock: maxStockValue,
          type_id: Number(itemType.value),
        },
      ])
      .select();

    navigation.navigate("Inventory");
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="height">
        <View style={styles.rootContainer}>
          <Subtitle>Name</Subtitle>
          <WordInput onChangeText={itemNameHandler} value={itemName} />
          <Subtitle>Description</Subtitle>
          <WordInput
            onChangeText={itemDescriptionHandler}
            value={itemDescription}
          />
          <Subtitle>Price</Subtitle>
          <NumberInput onChangeText={itemPriceHandler} value={itemPrice} />
          <Subtitle>Stock</Subtitle>
          <NumberInput onChangeText={itemStockHandler} value={itemStock} />
          <Subtitle>Max Stock</Subtitle>
          <NumberInput
            onChangeText={itemMaxStockHandler}
            value={itemMaxStock}
          />
          <Subtitle>Type</Subtitle>
          <View style={styles.typeInputContainer}>
            <TypeInput onChange={itemTypeHandler} selectedValue={itemType} />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={acceptButtonHandler}>Accept</PrimaryButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AddItemScreen;

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
  typeInputContainer: {
    width: "100%",
  },
});
