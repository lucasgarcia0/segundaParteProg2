import React, { Component } from "react";
import { StyleSheet, TextInput, FlatList, Text, View } from "react-native-web";
import { db } from "../firebase/config";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [], 
      filteredUsers: [], 
    };
  }

  componentDidMount() {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ users, filteredUsers: users });
      })
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }

  handleSearch(text) {
    const query = text.toLowerCase();
    const filtered = this.state.users.filter((user) =>
      user.data.usuario.toLowerCase().includes(query)
    );

    this.setState({
      search: text,
      filteredUsers: filtered,
    });
  }

  render() {
    const { search, filteredUsers } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre de usuario"
          value={search}
          onChangeText={(text) => this.handleSearch(text)}
        />
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.user}>
                {item.data.usuario} ({item.data.email})
              </Text>
            )}
          />
        ) : (
          <Text style={styles.noResults}>
            {search ? "El nombre de usuario no existe." : "Ingresa un término de búsqueda."}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  user: {
    fontSize: 16,
    marginVertical: 5,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default Filter;
