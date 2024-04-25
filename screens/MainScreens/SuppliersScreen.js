import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";
import { supabase } from "../../components/supabase";

import AddButton from "../../components/Buttons/AddButton";
import SupplierItem from "../../components/Items/SupplierItem";

function SuppliersScreen({ navigation }) {
  const [supplierItems, setSupplierItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        let { data: Supplier, error } = await supabase
          .from("Supplier")
          .select("*")
          .order("id", { ascending: true });
        setSupplierItems([...Supplier]);
      }
      fetchData();
    }, [])
  );

  function renderSupplierItem(supplierData) {
    function pressHandler() {
      navigation.navigate("EditSupplierScreen", {
        supplierItemId: supplierData.item.id,
      });
    }

    return (
      <SupplierItem title={supplierData.item.name} onPress={pressHandler} />
    );
  }

  return (
    <>
      <FlatList
        data={supplierItems}
        keyExtractor={(item) => item.id}
        renderItem={renderSupplierItem}
        numColumns={2}
      />
      <View style={styles.buttonContainer}>
        <AddButton
          onPress={() => {
            navigation.navigate("AddSupplierScreen");
          }}
        />
      </View>
    </>
  );
}

export default SuppliersScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});
