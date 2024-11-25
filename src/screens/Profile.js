import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Text, View } from "react-native-web";
import { auth, db } from "../firebase/config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      UsuariodelProfile: [], 
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let userPosts = [];
        docs.forEach((doc) => {
          userPosts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ userPosts });
      });
      db.collection("users")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let UsuariodelProfile = [];
        docs.forEach((doc) => {
          UsuariodelProfile.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ UsuariodelProfile });
      });
  }

  handleDelete(postId) {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post eliminado con éxito");
      })
      .catch((error) => console.error("Error al eliminar el post:", error));
  }

  handleLogout() {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login"); 
      })
      .catch((error) => console.error("Error al hacer logout:", error));
  }

  render() {
    const { userPosts } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.info}>Nombre de usuario: {this.state.UsuariodelProfile.length>0 ? this.state.UsuariodelProfile[0].data.usuario : "Sin nombre"}</Text>
        <Text style={styles.info}>Email: {auth.currentUser.email}</Text>
        <Text style={styles.info}>Total de posteos: {userPosts.length}</Text>

        <Text style={styles.subtitle}>Mis posteos:</Text>
        {userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Text style={styles.postText}>{item.data.post}</Text>
                <TouchableOpacity
                  onPress={() => this.handleDelete(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noPosts}>No has publicado nada aún.</Text>
        )}

        <TouchableOpacity onPress={() => this.handleLogout()} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  post: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  postText: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    textAlign: "center",
  },
  noPosts: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Profile;
