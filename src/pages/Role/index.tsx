import React from "react";
import { Alert, Button, View } from "react-native";

import MyInput from "../../components/MyInput";
import FullButton from "../../components/FullButton";
import styles from "./styles";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { roleService } from "../../services/role.service";

export default function Role() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();

  const params = route.params as any;
  const role = params ? params.role : undefined;

  const [name, setName] = React.useState(role ? role.name : "");
  const [description, setDescription] = React.useState(
    role ? role.description : ""
  );

  React.useEffect(() => {
    navigation.setOptions({ title: role ? "Editar Role" : "Nova Role" });
  }, []);

  async function save() {
    if (!name || name.trim() === "") {
      Alert.alert("Nome é obrigatório");
      return;
    }

    if (role) {
      let body: any = { name, description };

      await roleService
        .update(role.id, body)
        .then((saved) => {
          Alert.alert( "Role atualizada com sucesso");
          navigation.goBack();
        })
        .catch((error) => navigation.navigate("login"));
    } else {
      await roleService
        .create({ name, description })
        .then((saved) => {
          Alert.alert("Role criada com sucesso");
          navigation.goBack();
        })
        .catch((error) => navigation.navigate("login"));
    }
  }

  return (
    <View style={styles.container}>
      <MyInput
        label="Nome"
        value={name}
        onChangeText={setName}
        editable={role === undefined}
      />
      <MyInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <FullButton title="Salvar" onPress={save} />
    </View>
  );
}
