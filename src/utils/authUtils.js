import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUser = async (userData) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.error("Erro ao armazenar o usuário:", error);
  }
};

export const retrieveUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Erro ao recuperar o usuário:", error);
    return null;
  }
};
