import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const categories = [
  {
    name: 'Fruits',
    description: 'Fruits are nature\'s candy! They are packed with vitamins, minerals, and antioxidants.',
    image: require('./assets/fruit.png'),
  },
  {
    name: 'Vegetables',
    description: 'Vegetables are essential for a balanced diet. They provide vital nutrients and fiber that help maintain a healthy digestive system and reduce the risk of chronic diseases.',
    image: require('./assets/veggy.png'),
  },
  {
    name: 'Grains',
    description: 'Grains, such as rice, wheat, and oats, are rich in carbohydrates, providing energy for your body. Whole grains are a great source of fiber and essential nutrients.',
    image: require('./assets/dish.png'),
  },
  {
    name: 'Proteins',
    description: 'Proteins are crucial for building and repairing tissues. They play a key role in various bodily functions, including the production of hormones and enzymes.',
    image: require('./assets/act.jpg'),
  },
];

export default function Content({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const jogAnimations = categories.reduce((acc, category) => {
    acc[category.name] = useRef(new Animated.Value(0)).current;
    return acc;
  }, {});

  const animateJogger = (category) => {
    jogAnimations[category].setValue(0);
    Animated.timing(jogAnimations[category], {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => animateJogger(category));
  };

  useEffect(() => {
    if (selectedCategory) {
      animateJogger(selectedCategory);
    }
  }, [selectedCategory]);

  const joggerTranslateX = (category) => jogAnimations[category].interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const renderCategoryContent = () => {
    if (!selectedCategory) return null;

    const categoryData = categories.find(cat => cat.name === selectedCategory);
    return (
      <ScrollView style={styles.descriptionContainer}>
        <TouchableOpacity style={styles.card} onPress={() => setSelectedCategory(categoryData.name)}>
          <Text style={styles.cardText}>{categoryData.name}</Text>
          <Animated.Image
            source={categoryData.image}
            style={[styles.cardIcon, { transform: [{ translateX: joggerTranslateX(categoryData.name) }] }]}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{categoryData.description}</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedCategory && (
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.categorySelection}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.name}
            style={styles.categoryCard}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Image source={category.image} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderCategoryContent()}
      {!selectedCategory && (
        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Landing')}>
            <Icon name="home" size={24} color="#000" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
            <Icon name="user" size={24} color="#000" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#6A1B9A',
    borderRadius: 50,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  categorySelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  categoryCard: {
    width: '45%',
    backgroundColor: '#EDE7F6',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  descriptionContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  cardIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
  },
});
