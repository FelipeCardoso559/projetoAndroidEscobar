// components/Products/EditProduct.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProduct = ({ route, navigation }) => {
    const { produto, fetchProducts } = route.params; // Obter fetchProducts dos parâmetros

    const [nome, setNome] = useState(produto.nome);
    const [quantidade, setQuantidade] = useState(String(produto.quantidade));
    const [preco, setPreco] = useState(String(produto.preco));
    const [descricao, setDescricao] = useState(produto.descricao);
    const [imagem, setImagem] = useState(produto.imagem);

    const handleEditProduct = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error("Token de autenticação não encontrado. Faça login novamente.");
            }

            const response = await axios.put(
                "https://backend-aula.vercel.app/app/produtos",
                {
                    id: produto._id,
                    nome,
                    quantidade: parseInt(quantidade, 10),
                    preco: parseFloat(preco),
                    descricao,
                    imagem,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Produto atualizado com sucesso:", response.data);
            Alert.alert("Sucesso", "Produto atualizado com sucesso.");
            fetchProducts(); // Chame fetchProducts para atualizar a lista de produtos
            navigation.goBack(); // Retornar à lista de produtos
        } catch (error) {
            console.error("Erro ao editar produto:", error.message);
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                placeholder="Nome do Produto"
                value={nome}
                onChangeText={setNome}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Preço"
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Imagem (URL ou Base64)"
                value={imagem}
                onChangeText={setImagem}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Salvar Alterações" onPress={handleEditProduct} />
        </View>
    );
};

export default EditProduct;
