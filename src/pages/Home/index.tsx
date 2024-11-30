import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import { userService } from "../../services/user.service";
import { User } from "../../model/user";
import ListTile from "../../components/ListTile";
import { retrieveUser } from "../../utils/authUtils";

export default function Home() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [users, setUsers] = React.useState<User[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userLogin, setUserLogin] = React.useState<User>({} as User);

  React.useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await retrieveUser();
      setUserLogin(storedUser);
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={logOff} />,
        headerRight: () => <Button title="Novo" onPress={goToCreateUser} />,
      });

      fetchUserList();
    });

    return unsubscribe;
  }, [navigation]);

  function fetchUserList() {
    setRefreshing(true);

    userService
      .list()
      .then((result) => {
        setRefreshing(false);
        setUsers(result);
      })
      .catch((error) => {
        setRefreshing(false);
        logOff();
      });
  }

  function logOff() {
    navigation.goBack();
  }

  function goToCreateUser() {
    navigation.navigate("user");
  }

  function goToEditUser(user: User) {
    navigation.navigate("user", { user });
  }

  function deleteUser(id: number, user: User) {
    userService
      .delete(id)
      .then(() => {
        fetchUserList();
        if (user.username === userLogin.username) {
          logOff();
        }
      })
      .catch((error) => {
        logOff();
      });
  }

  const showAlertWithCallback = (id: number, user: User) => {
    Alert.alert(
      `Deseja deletar o usuário: ${user.name}?`,
      "Essa ação não poderá ser desfeita!",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteUser(id, user);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (users.length < 1) {
    return (
      <View style={styles.container}>
        <Text>Nenhum usuários cadastrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        refreshing={refreshing}
        onRefresh={fetchUserList}
        renderItem={({ item }) => (
          <ListTile
            user={item}
            onPress={goToEditUser}
            onDelete={showAlertWithCallback}
          />
        )}
      />
    </View>
  );
}
