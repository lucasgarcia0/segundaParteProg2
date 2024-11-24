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
        db.collection('posts').onSnapshot(
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
                this.setState({ publiLikeada:true })
            })
    }
    unlikePost(postId) {
        db.collection('posts')
            .doc(postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ publiLikeada:false })
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
                        <Text>Posteado por {item.data.owner}: 
                         {item.data.post}</Text>
                        
                        <TouchableOpacity onPress=  {() => item.data.likes.includes(auth.currentUser.email)==false ? this.likePost(item.id): this.unlikePost(item.id)} style={styles.button}>
                            <Text> {item.data.likes.includes(auth.currentUser.email)==false ? 'Like': "Unlike"} </Text> 
                        </TouchableOpacity>
                        <Text>Me gustas: {item.data.likes.length}</Text>
                        <Text>Ususarios que likearon: {item.data.likes}, </Text> 
                    </View>}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    },
    field: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        marginLeft: 3,
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
export default Post