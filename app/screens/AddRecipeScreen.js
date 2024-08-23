import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookTime, setCookTime] = useState('');

  const saveRecipe = async () => {
    const recipe = {
      id: Date.now().toString(),
      title,
      ingredients: ingredients.split(','),
      cookTime,
    };

    const storedRecipes = await AsyncStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    recipes.push(recipe);
    await AsyncStorage.setItem('recipes', JSON.stringify(recipes));

    navigation.navigate('Home');
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Ingredients (comma separated)" value={ingredients} onChangeText={setIngredients} />
      <TextInput placeholder="Cook Time" value={cookTime} onChangeText={setCookTime} />
      <Button title="Save Recipe" onPress={saveRecipe} />
    </View>
  );
}
