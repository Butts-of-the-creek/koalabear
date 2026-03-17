import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Listing } from '../types/Listing';

interface Props {
  listing: Listing;
  onPress: () => void;
}

export default function PropertyCard({ listing, onPress }: Props) {
  // Fallback if no images are provided
  const imageUrl = listing.images.length > 0 
    ? { uri: listing.images[0] } 
    : {uri: 'https://placehold.co/600x400/png?text=No+Image'};

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{listing.title}</Text>
          <Text style={styles.price}>R{listing.price}/mo</Text>
        </View>
        <Text style={styles.location}>{listing.location}</Text>
        <Text style={styles.amenities}>{listing.wifi ? '✅ Free WiFi' : '❌ No WiFi'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amenities: {
    fontSize: 12,
    color: '#888',
  }
});
