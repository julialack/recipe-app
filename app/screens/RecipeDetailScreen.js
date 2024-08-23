import React from 'react';
import { View, Text } from 'react-native';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;

  return (
    <View>
      <Text>Title: {recipe.title}</Text>
      <Text>Ingredients: {recipe.ingredients.join(', ')}</Text>
      <Text>Cook Time: {recipe.cookTime}</Text>
    </View>
  );
}
