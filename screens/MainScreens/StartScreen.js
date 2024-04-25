import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";
import { supabase } from "../../components/supabase";

import StockQuantity from "../../components/StockQuantity";

import Colors from "../../constants/colors";

function StartScreen() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function getInventoryData() {
        let { data: Item, error } = await supabase.from("Item").select("*");
        setInventoryItems([...Item]);
      }
      getInventoryData();
    }, [])
  );

  function renderInventoryItem(itemData) {
    return (
      <StockQuantity
        stock={itemData.item.stock}
        maxStock={itemData.item.max_stock}
        children={itemData.item.name}
      />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={inventoryItems.slice().reverse()}
        keyExtractor={(item) => item.id}
        renderItem={renderInventoryItem}
      />
    </View>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    marginHorizontal: 40,
    backgroundColor: Colors.primary700,
    borderRadius: 10,
  },
});
