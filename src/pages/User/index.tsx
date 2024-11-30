import React from "react";
import { Alert, Button, Text, View } from "react-native";

import MyInput from "../../components/MyInput";
import FullButton from "../../components/FullButton";
import styles from "./styles";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { userService } from "../../services/user.service";
import { Role } from "../../model/role";
import DropDownPicker from "react-native-dropdown-picker";
import { roleService } from "../../services/role.service";

export default function User() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();

  const params = route.params as any;
  const user = params ? params.user : undefined;

  const [name, setName] = React.useState(user ? user.name : "");
  const [username, setUsername] = React.useState(user ? user.username : "");
  const [password, setPassword] = React.useState("");
  const [passConfirm, setPassConfirm] = React.useState("");
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>(
    user ? user.roles : []
  );
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    roleService
      .getList()
      .then((list) => setRoles(list))
      .catch((error) => navigation.navigate("login"));
  }, []);

  React.useEffect(() => {
    navigation.setOptions({ title: user ? "Editar Usuário" : "Novo Usuário" });
  }, []);

  function save() {
    if (!name || name.trim() === "") {
      Alert.alert("Nome é obrigatório");
      return;
    }

    if (user) {
      let body: any = { name, roles: selectedRoles };

      if (password.trim() !== "") {
        if (password !== passConfirm) {
          Alert.alert("Senha não confere");
          return;
        }
        body = { name, password };
      }

      userService
        .update(user.id, body)
        .then((saved) => {
          Alert.alert("Usuário atualizado com sucesso");
          navigation.goBack();
        })
        .catch((error) => navigation.navigate("login"));
    } else {
      if (!username || username.trim() === "") {
        Alert.alert("Login é obrigatório");
        return;
      }
      if (!password || password.trim() === "") {
        Alert.alert("Senha é obrigatória");
        return;
      }
      if (password !== passConfirm) {
        Alert.alert("Senha não confere");
        return;
      }

      userService
        .create({ name, username, password, roles: selectedRoles })
        .then((saved) => {
          Alert.alert( "Usuário criado com sucesso");
          navigation.goBack();
        })
        .catch((error) => navigation.navigate("login"));
    }
  }

  return (
    <View style={styles.container}>
      <MyInput label="Nome" value={name} onChangeText={setName} />
      <MyInput
        label="Login"
        value={username}
        onChangeText={setUsername}
        editable={user === undefined}
      />
      <MyInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <MyInput
        label="Confirmar Senha"
        value={passConfirm}
        onChangeText={setPassConfirm}
        secureTextEntry
      />

      <View style={styles.inputView}>
        <Text style={styles.label}>Roles:</Text>
        <DropDownPicker
          style={styles.input}
          open={open}
          items={roles.map((role) => ({
            label: role.name,
            value: role.id?.toString(),
          }))}
          value={selectedRoles}
          setOpen={setOpen}
          setItems={setRoles}
          setValue={setSelectedRoles}
          multiple={true}
          placeholder={"Selecione as roles"}
        />
      </View>

      {selectedRoles?.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text>Itens selecionados:</Text>
          {selectedRoles.map((roleId) => (
            <Text key={roleId}>
              {roles.find((role) => role.id?.toString() === roleId)?.name}
            </Text>
          ))}
        </View>
      )}

      <FullButton title="Salvar" onPress={save} />
    </View>
  );
}
