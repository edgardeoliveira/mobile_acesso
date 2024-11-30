import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomePage from "./src/pages/Home";
import LoginPage from "./src/pages/Login";
import UserPage from "./src/pages/User";
import RolePage from "./src/pages/Role";
import ListRolePage from "./src/pages/ListRole";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          title: "Usuários",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="listRole"
        component={ListRolePage}
        options={{
          title: "Roles",
          tabBarIcon: ({ color, size }) => (
            <Icon name="assignment-ind" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginPage}
            options={{ title: "Acesso" }}
          />
          <Stack.Screen
            name="home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="user" component={UserPage} />
          <Stack.Screen name="role" component={RolePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
