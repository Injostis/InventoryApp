import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialIcons, Feather } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import StartScreen from "./screens/MainScreens/StartScreen";
import InventoryScreen from "./screens/MainScreens/InventoryScreen";
import SuppliersScreen from "./screens/MainScreens/SuppliersScreen";
import AddItemScreen from "./screens/AddScreens/AddItemScreen";
import AddSupplierScreen from "./screens/AddScreens/AddSupplierScreen";
import EditItemScreen from "./screens/EditScreens/EditItemScreen";
import EditSupplierScreen from "./screens/EditScreens/EditSupplierScreen";
import PackagingScreen from "./screens/CategoriesScreens/PackagingScreen";

import Colors from "./constants/colors";

import ImageButton from "./components/Buttons/ImageButton";

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{
          headerBackTitle: "Back",
          title: "Add Item",
          headerStyle: { backgroundColor: Colors.primary800 },
          headerTitleStyle: { fontFamily: "georama-regular", fontSize: 24 },
          headerTintColor: "white",
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: Colors.primary800 },
        }}
      />
      <Stack.Screen
        name="AddSupplierScreen"
        component={AddSupplierScreen}
        options={{
          headerBackTitle: "Back",
          title: "Add Supplier",
          headerStyle: { backgroundColor: Colors.primary800 },
          headerTitleStyle: { fontFamily: "georama-regular", fontSize: 24 },
          headerTintColor: "white",
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: Colors.primary800 },
        }}
      />
      <Stack.Screen
        name="EditItemScreen"
        component={EditItemScreen}
        options={{
          headerBackTitle: "Back",
          title: "Edit Item",
          headerStyle: { backgroundColor: Colors.primary800 },
          headerTitleStyle: { fontFamily: "georama-regular", fontSize: 24 },
          headerTintColor: "white",
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: Colors.primary800 },
        }}
      />
      <Stack.Screen
        name="EditSupplierScreen"
        component={EditSupplierScreen}
        options={{
          headerBackTitle: "Back",
          title: "Edit Supplier",
          headerStyle: { backgroundColor: Colors.primary800 },
          headerTitleStyle: { fontFamily: "georama-regular", fontSize: 24 },
          headerTintColor: "white",
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: Colors.primary800 },
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "georama-regular",
            color: "white",
          }}
        >
          Categories
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: "white",
        headerTitleStyle: { fontFamily: "georama-regular", fontSize: 24 },
        headerTitleAlign: "center",
        headerRight: () => {
          return <ImageButton />;
        },
        sceneContainerStyle: { backgroundColor: Colors.primary800 },
        drawerStyle: { backgroundColor: Colors.primary750 },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: Colors.primary500,
        drawerActiveBackgroundColor: Colors.primary600,
      }}
    >
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: "All Items",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Packaging"
        component={PackagingScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="package" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: "white",
        headerTitleStyle: { fontFamily: "georama-regular", fontSize: 24 },
        headerRight: () => {
          return <ImageButton />;
        },
        headerTitleAlign: "center",
        tabBarLabelStyle: { fontFamily: "georama-regular" },
        tabBarActiveTintColor: Colors.accent500,
        tabBarInactiveTintColor: "#ccc",
        tabBarStyle: { backgroundColor: Colors.primary800 },
      }}
      sceneContainerStyle={{ backgroundColor: Colors.primary800 }}
    >
      <BottomTab.Screen
        name="Menu"
        component={StartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Suppliers"
        component={SuppliersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="forklift" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "georama-regular": require("./assets/fonts/Georama-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </>
  );
}
