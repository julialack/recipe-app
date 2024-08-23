import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Hämta recept från AsyncStorage
  useEffect(() => {
    const fetchRecipes = async () => {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    };
    fetchRecipes();
  }, []);

  // Filtrera recept baserat på sökfrågan
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase())) ||
    recipe.cookTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
              {item.title}
            </Text>
            <Button title="Delete" onPress={() => deleteRecipe(item.id)} />
          </View>
        )}
      />
      <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')} />
    </View>
  );
}
