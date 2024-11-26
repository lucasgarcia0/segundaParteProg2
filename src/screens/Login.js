import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native-web"
import { auth } from '../firebase/config'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            logued: false,
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
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => this.setState({ logued: true }))
            .then(() => this.props.navigation.navigate("HomeMenu"))
            .catch((error) => this.setState({ error: "Fallo el login" }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Ingresar</Text>

                {this.state.error ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : null}

                <TextInput style={styles.field}
                    keyboardType="email-address"
                    placeholder="Ingrese su dirección de email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput style={styles.field}
                    placeholder="Ingrese su contrasena"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity onPress={() => this.handleSubmit()} style={[styles.button, styles.buttonSecondary]}>
                    <Text>Acceder</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Register")}
                    style={styles.button}
                >
                    <Text>No tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom:10,
        paddingTop:10,
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
        borderWidth: 1,
        backgroundColor: "#fff",


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
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    }


});

export default Login;
