import { Component } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, TextInput, View } from "react-native-web"
import { auth, db } from "../firebase/config"


class Addpost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: "",
            error: "",
        }
    }

    addPost() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            post: this.state.post,
            likes: [],
            createdAt: Date.now(),
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Nuevo post</Text>
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Escribi tu nuevo posteo...'
                    onChangeText={text => this.setState({ post: text })}
                    value={this.state.post} />
                <TouchableOpacity onPress={() => this.addPost()} style={styles.button}>
                    <Text style={styles.buttonText}> Agrega tu post </Text>
                </TouchableOpacity>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 60,
        alignContent: 'center',
        width: '80vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    field: {
        height: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1

    },
    button: {
        marginTop: 30,
        backgroundColor: "#ffa500",
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
    },


});
export default Addpost