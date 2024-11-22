import React, { Component } from "react";
import { StyleSheet,  Text,  TextInput,  View,} from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        userName: "",
        registered: false,
        error: "",
      };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate("Home"); // Esto es para q los q ya estan logueados no puedan entrar 
          }
        });
      }

    handleSubmit() {
        auth
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(
            db.collection('users').add({
              email: this.state.email,
              usuario: this.state.userName,
              createdAt: Date.now()
              })
          )
          .then(() => this.props.navigation.navigate("Login"))
          .catch((error) => this.setState({ error: "Fallo el registro" }));
        }
  
        render() {
            return (
              <View>
                <Text>Registro</Text>
                <TextInput
                  keyboardType="default"
                  placeholder="Ingrese su nombre de usuario"
                  onChangeText={(text) => this.setState({ userName: text })}
                  value={this.state.userName}
                />

                <TextInput
                  keyboardType="email-address"
                  placeholder="Ingrese su dirección de email"
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                />
               
                <TextInput
                  placeholder="Ingrese su contraseña"
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
                />
                
                <TouchableOpacity
                  onPress={() => this.handleSubmit()}
                  style={[styles.button, styles.buttonSecondary]}
                >
                  <Text>Acceder</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Login")}
                  style={styles.button}
                >
                  <Text>Ya tengo cuenta</Text>
                </TouchableOpacity>
              </View>
            );
          }

}  

export default Register