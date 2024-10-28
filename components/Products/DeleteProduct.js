// components/Products/DeleteProduct.js
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteProduct = ({ route, navigation }) => {
    const { produto, fetchProducts } = route.params; // Obter fetchProducts dos parâmetros

    const handleDeleteProduct = async () => {
        const token = await AsyncStorage.getItem('token'); // Recuperar o token

        if (!token) {
            Alert.alert('Erro', 'Token de autenticação não encontrado. Faça login novamente.');
            return;
        }

        try {
            await axios.delete(`https://backend-aula.vercel.app/app/produtos`, {
                data: { id: produto._id }, // Passar o ID no corpo da requisição
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Sucesso', 'Produto excluído com sucesso');
            fetchProducts(); // Chamar fetchProducts para atualizar a lista
            navigation.navigate('ProductList'); // Navegar de volta para a lista de produtos
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.error || 'Erro ao excluir produto');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir o produto ${produto.nome}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: handleDeleteProduct },
            ]
        );
    };

    return (
        <View>
            <Text>Você está prestes a excluir o produto: {produto.nome}</Text>
            <Button title="Excluir Produto" onPress={confirmDelete} />
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default DeleteProduct;
