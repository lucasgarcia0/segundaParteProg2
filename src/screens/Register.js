import React, { Component } from "react";
import { StyleSheet, TouchableOpacity,} from "react-native";
import { Text, TextInput, View } from "react-native-web"

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
            this.props.navigation.navigate("HomeMenu");  
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
              <View style= {styles.container}>
                <Text>Registro</Text>
                <TextInput style={styles.field}
                  keyboardType="default"
                  placeholder="Ingrese su nombre de usuario"
                  onChangeText={(text) => this.setState({ userName: text })}
                  value={this.state.userName}
                />

                <TextInput  style={styles.field}
                  keyboardType="email-address"
                  placeholder="Ingrese su dirección de email"
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                />
               
                <TextInput  style={styles.field}
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        alignContent:'center',
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
        backgroundColor: "#51b9e9",
        borderRadius: 5,
        padding: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
      },
      buttonSecondary: {
        backgroundColor: "#ffa500",
      },


});
export default Register