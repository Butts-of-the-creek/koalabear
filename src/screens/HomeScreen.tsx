import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  Image, TextInput, TouchableOpacity, FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Dummy data matching your UI vibe
const FEATURED = [
  { id: '1', title: 'Meritalia Villa', location: 'New York, US', price: 12219, rating: 4.8, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Modernica Apt', location: 'New York, US', price: 22452, rating: 4.9, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
];

const CATEGORIES = ['All', 'House', 'Villa', 'Apartments', 'Others'];

export default function HomeScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Custom Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: 'https://placehold.co/100x100/png?text=You' }} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.username}>KoalaBear User</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellIcon}>
            <Ionicons name="notifications-outline" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Fake Search Bar (will navigate to Explore later) */}
        <TouchableOpacity style={styles.searchBarContainer} activeOpacity={0.8}>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <Text style={styles.searchText}>Search something</Text>
          <View style={styles.filterIcon}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredList}>
          {FEATURED.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.featuredCard}
              onPress={() => navigation.navigate('ListingDetails', { listing: item })}
            >
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#fbbf24" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredLocation}>{item.location}</Text>
                <View style={styles.featuredBottomRow}>
                  <Text style={styles.featuredPrice}>${item.price}</Text>
                  <Ionicons name="heart-outline" size={20} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Recommendation</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryPill, activeCategory === cat && styles.categoryPillActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Placeholder for the vertical list */}
        <View style={styles.recommendationGrid}>
            <Text style={{textAlign: 'center', color: '#9ca3af', marginTop: 20}}>
              Vertical property cards will render here.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  greeting: { fontSize: 12, color: '#6b7280' },
  username: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  bellIcon: { padding: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 20 },
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 32 },
  searchText: { flex: 1, marginLeft: 12, color: '#9ca3af', fontSize: 16 },
  filterIcon: { backgroundColor: '#3b82f6', padding: 8, borderRadius: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
  seeAll: { fontSize: 14, color: '#3b82f6', fontWeight: '600' },
  featuredList: { marginBottom: 32 },
  featuredCard: { width: 260, height: 320, marginRight: 16, borderRadius: 24, overflow: 'hidden' },
  featuredImage: { width: '100%', height: '100%', position: 'absolute' },
  ratingBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: 'bold' },
  featuredInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'rgba(0,0,0,0.4)' },
  featuredTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  featuredLocation: { color: '#e5e7eb', fontSize: 12, marginBottom: 8 },
  featuredBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featuredPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  categoryList: { marginBottom: 24 },
  categoryPill: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 12 },
  categoryPillActive: { backgroundColor: '#3b82f6' },
  categoryText: { color: '#4b5563', fontWeight: '500' },
  categoryTextActive: { color: '#ffffff' },
  recommendationGrid: { flex: 1 }
});
