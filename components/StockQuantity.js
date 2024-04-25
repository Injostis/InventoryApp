import { View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

import Colors from "../constants/colors";
import Subtitle from "./Subtitle";

function StockQuantity({ children, stock, maxStock }) {
  const progress = stock / maxStock;

  return (
    <View>
      <Subtitle>{children}</Subtitle>
      <ProgressBar
        progress={progress}
        width={300}
        color={Colors.primary500}
        unfilledColor={Colors.primary700}
      />
    </View>
  );
}

export default StockQuantity;
