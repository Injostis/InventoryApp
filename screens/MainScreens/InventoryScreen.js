import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";
import { supabase } from "../../components/supabase";

import AddButton from "../../components/Buttons/AddButton";
import InventoryItem from "../../components/Items/InventoryItem";

function InventoryScreen({ navigation }) {
  const [inventoryItems, setInventoryItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        let { data: Item, error } = await supabase
          .from("Item")
          .select("*")
          .order("id", { ascending: true });
        setInventoryItems([...Item]);
      }
      fetchData();
    }, [])
  );

  function renderInventoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("EditItemScreen", {
        inventoryItemId: itemData.item.id,
      });
    }

    return <InventoryItem title={itemData.item.name} onPress={pressHandler} />;
  }

  return (
    <>
      <FlatList
        data={inventoryItems}
        keyExtractor={(item) => item.id}
        renderItem={renderInventoryItem}
        numColumns={2}
      />
      <View style={styles.buttonContainer}>
        <AddButton
          onPress={() => {
            navigation.navigate("AddItemScreen");
          }}
        />
      </View>
    </>
  );
}

export default InventoryScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});
