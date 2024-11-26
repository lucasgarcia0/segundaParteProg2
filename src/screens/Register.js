import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  handleSubmit() {
    const { email, password, userName } = this.state;

    if (!email || !password || !userName) {
      this.setState({ error: "Todos los campos son obligatorios." });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return db.collection("users").add({
          email: email,
          usuario: userName,
          createdAt: Date.now(),
        });
      })
      .then(() => {
        this.setState({ error: "" }); 
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        this.setState({ error: error.message }); 
      });
  }

  render() {
    const { email, password, userName, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>

        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Ingrese su nombre de usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={userName}
        />

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Ingrese su dirección de email"
          onChangeText={(text) => this.setState({ email: text })}
          value={email}
        />

        <TextInput
          style={styles.field}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={password}
        />

        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#51b9e9",
    borderRadius: 5,
    padding: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#ffa500",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Register;
