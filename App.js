// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProductList from './components/Products/ProductList';
import AddProduct from './components/Products/AddProduct';
import EditProduct from './components/Products/EditProduct';
import DeleteProduct from './components/Products/DeleteProduct';
import ProductSearch from './components/Products/ProductSearch';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: true }} // Oculta o cabeçalho
                />
                <Stack.Screen 
                    name="ProductList" 
                    component={ProductList} 
                    options={{ headerShown: true }} // Exibe o cabeçalho
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register} 
                    options={{ headerShown: true }} />
                <Stack.Screen 
                    name="AddProduct" 
                    component={AddProduct} 
                    options={{ headerShown: true }} // Exibe o cabeçalho
                />
                <Stack.Screen 
                    name="EditProduct" 
                    component={EditProduct} 
                    options={{ headerShown: true }} // Exibe o cabeçalho
                />
                <Stack.Screen 
                    name="DeleteProduct" 
                    component={DeleteProduct} 
                    options={{ headerShown: true }} // Exibe o cabeçalho
                />
                <Stack.Screen 
                    name="ProductSearch" 
                    component={ProductSearch} 
                    options={{ headerShown: true }} // Exibe o cabeçalho
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
