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
            likes:[],
            createdAt: Date.now(),
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Nuevo post</Text>
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Escribi tu nuevo posteo...'
                    onChangeText={text => this.setState({ post: text })}
                    value={this.state.post} />
                <TouchableOpacity onPress={() => this.addPost()} style={styles.button}>
                    <Text> Agrega tu post </Text>
                </TouchableOpacity>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        alignContent: 'center',
        width: '80vw',

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
        backgroundColor: '#28a745',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        alignText: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: '#28a745',
    }


});
export default Addpost