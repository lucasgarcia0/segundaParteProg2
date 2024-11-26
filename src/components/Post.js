import { Component } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { FlatList, Text, TextInput, View } from "react-native-web"
import { auth, db } from "../firebase/config"
import firebase from 'firebase';


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            publiLikeada: false,
        }
    }

    componentDidMount() {
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            docs => {
                let publis = [];
                docs.forEach(doc => {
                    publis.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: publis,
                })
            })

    }
    likePost(postId) {
        db.collection('posts')
            .doc(postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ publiLikeada: true })
            })
    }
    unlikePost(postId) {
        db.collection('posts')
            .doc(postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ publiLikeada: false })
            })
    }
    render() {
        console.log(this.state.posts);
        return (
            <View style={styles.container}>
                <Text >Posteos:</Text>
                <FlatList style={styles.field}
                    data={this.state.posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <View>
                        <Text>Posteado por {item.data.owner}: {item.data.post}</Text>

                        <TouchableOpacity onPress={() => item.data.likes.includes(auth.currentUser.email) == false ? this.likePost(item.id) : this.unlikePost(item.id)} style={styles.button}>
                            <Text> {item.data.likes.includes(auth.currentUser.email) == false ? 'Like' : "Unlike"} </Text>
                        </TouchableOpacity>
                        <Text>Me gustas: {item.data.likes.length}</Text>
                        {item.data.likes.length > 0 ? <Text>Usuarios que likearon:</Text>: ""}<FlatList style={styles.field}
                            data={item.data.likes}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => <Text>{item} </Text>} />
                    </View>}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex:1,
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
        marginHorizontal: 15,
    },
    field: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Post