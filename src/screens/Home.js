import { View } from "react-native-web";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { auth } from "../firebase/config";
import { TouchableOpacity } from "react-native";
import Post from "../components/Post";

const Home = (props) => {
    return (
        <View style={styles.container}>
            {auth.currentUser && auth.currentUser.email ? <Text style={styles.bienvenido}>Bienvenido {auth.currentUser.usuario} </Text> : <Text>No hay un usuario logueado</Text>}
            <Post/>
            <TouchableOpacity onPress={() => auth.signOut()} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f0f0f0",
    },
    bienvenido: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
    },
    logoutButton: {
      backgroundColor: "#ff4d4d",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: "flex-start",
      marginTop: 20,
    },
    logoutText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default Home;