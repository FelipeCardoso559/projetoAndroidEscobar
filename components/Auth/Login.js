// components/Login.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://backend-aula.vercel.app/app/login', {
                usuario,
                senha,
            });

            if (response.data.token) {
                // Armazene o token
                await AsyncStorage.setItem('token', response.data.token);
                console.log("Token armazenado com sucesso:", response.data.token);

                // Navegar para a tela de produtos após o login
                navigation.navigate('ProductList'); // Verifique se 'Products' está correto
            } else {
                Alert.alert("Erro", response.data.error);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            Alert.alert("Erro", "Falha ao realizar o login. Tente novamente.");
        }
    };

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                placeholder="Usuário"
                value={usuario}
                onChangeText={setUsuario}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default Login;
