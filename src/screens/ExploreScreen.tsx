import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, FlatList, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data matching your Figma list
const SEARCH_RESULTS = [
  { id: '1', title: 'Lucky Lake Apartments', location: 'Beijing, China', price: 1234, rating: 4.8, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
  { id: '2', title: 'Home Away From Home', location: 'Beijing, China', price: 1234, rating: 4.8, image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80' },
  { id: '3', title: 'Tranquil Tavern', location: 'Beijing, China', price: 1234, rating: 4.8, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80' },
  { id: '4', title: 'Tropicana Del Norte', location: 'Beijing, China', price: 1234, rating: 4.8, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80' },
];

const CATEGORIES = ['All', 'House', 'Villa', 'Apartments', 'Others'];

export default function ExploreScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('Beijing China');

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.resultCard}
      onPress={() => navigation.navigate('ListingDetails', { listing: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#fbbf24" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search for Your Ideal Home</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search something"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          style={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryPill, activeCategory === item && styles.categoryPillActive]}
              onPress={() => setActiveCategory(item)}
            >
              <Text style={[styles.categoryText, activeCategory === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>Found 182 Apartments</Text>
      </View>

      <FlatList 
        data={SEARCH_RESULTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  iconButton: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  searchSection: { paddingHorizontal: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, height: 50, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1f2937' },
  filterButton: { padding: 4 },
  categoryList: { marginBottom: 20 },
  categoryPill: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 10 },
  categoryPillActive: { backgroundColor: '#3b82f6' },
  categoryText: { color: '#4b5563', fontWeight: '500', fontSize: 14 },
  categoryTextActive: { color: '#ffffff' },
  resultsHeader: { paddingHorizontal: 20, marginBottom: 16 },
  resultsCount: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  resultsList: { paddingHorizontal: 20, paddingBottom: 20 },
  resultCard: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#f3f4f6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  imageContainer: { position: 'relative', width: 100, height: 100 },
  cardImage: { width: '100%', height: '100%', borderRadius: 12 },
  ratingBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  ratingText: { marginLeft: 4, fontSize: 10, fontWeight: 'bold', color: '#1f2937' },
  cardContent: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', flex: 1, marginRight: 8 },
  cardLocation: { fontSize: 13, color: '#6b7280', marginBottom: 12 },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#3b82f6' }
});
