import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import { roleService } from "../../services/role.service";
import { Role } from "../../model/role";
import ListTile from "../../components/ListTileRole";

export default function Home() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [roles, setRoles] = React.useState<Role[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={logOff} />,
        headerRight: () => <Button title="Novo" onPress={goToCreateRole} />,
      });

      fetchRoleList();
    });

    return unsubscribe;
  }, [navigation]);

  function fetchRoleList() {
    setRefreshing(true);

    roleService
      .getList()
      .then((result) => {
        setRefreshing(false);
        setRoles(result);
      })
      .catch((error) => {
        setRefreshing(false);
        logOff();
      });
  }

  function logOff() {
    navigation.goBack();
  }

  function goToCreateRole() {
    navigation.navigate("role");
  }

  function goToEditRole(role: Role) {
    navigation.navigate("role", { role });
  }

  function deleteRole(id: number, role: Role) {
    roleService
      .remove(id)
      .then(() => {
        fetchRoleList();
      })
      .catch((error) => {
        logOff();
      });
  }

  const showAlertWithCallback = (id: number, role: Role) => {
    Alert.alert(
      `Deseja deletar a role: ${role.name}?`,
      "Essa ação não poderá ser desfeita!",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteRole(id, role);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (roles.length < 1) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma role cadastrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={roles}
        refreshing={refreshing}
        onRefresh={fetchRoleList}
        renderItem={({ item }) => (
          <ListTile
            role={item}
            onPress={goToEditRole}
            onDelete={showAlertWithCallback}
          />
        )}
      />
    </View>
  );
}
