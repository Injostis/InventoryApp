import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Colors from "../../constants/colors";

const data = [{ label: "Package", value: "1" }];

function TypeInput({ onChange, selectedValue }) {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select type"
        searchPlaceholder="Search..."
        value={selectedValue}
        onChange={onChange}
      />
    </View>
  );
}

export default TypeInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent400,
    borderRadius: 20,
    padding: 16,
  },
  dropdown: {
    height: 20,
    borderColor: Colors.accent400,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "georama-regular",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "georama-regular",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "georama-regular",
  },
});
