import { View } from "react-native-web";

import { Text } from "react-native";
import { auth } from "../firebase/config";
import { TouchableOpacity } from "react-native";
import Post from "../components/Post";

const Home = (props) => {
    return (
        <View>
            {auth.currentUser && auth.currentUser.email ? <Text>Bienvenido ${auth.currentUser.usuario} </Text> : <Text>No hay un usuario logueado</Text>}
            <Post/>
            <TouchableOpacity onPress={() => auth.signOut()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;