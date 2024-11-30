import React from "react";
import { View, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import MyInput from "../../components/MyInput";
import FullButton from "../../components/FullButton";
import { authService } from "../../services/auth.service";
import styles from "./styles";
import { storeUser } from "../../utils/authUtils";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function signIn() {
    if (!username || username.trim() === "") {
      Alert.alert("Login é obrigatório");
      return;
    }

    authService.login(username, password).then((logged) => {
      if (logged) {
        const userData = { username };
        storeUser(userData);
        navigation.navigate("home");
      } else {
        Alert.alert("Login ou senha inválido(a)");
      }
    });
  }

  return (
    <View style={styles.container}>
      <MyInput label="Login" onChangeText={setUsername} />
      <MyInput label="Senha" onChangeText={setPassword} secureTextEntry />

      <FullButton title="Entrar" onPress={signIn} />
    </View>
  );
}
