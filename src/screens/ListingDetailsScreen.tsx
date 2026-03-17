import React from 'react';
import { 
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'ListingDetails'>;

export default function ListingDetailsScreen({ route, navigation }: Props) {
  const { listing } = route.params;
  const heroImage = listing.image ? { uri: listing.image } : { uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80' };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        <View style={styles.imageContainer}>
          <Image source={heroImage} style={styles.heroImage} />
          
          <SafeAreaView style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#1f2937" />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity style={[styles.iconButton, { marginRight: 12 }]}>
                <Ionicons name="heart-outline" size={24} color="#1f2937" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="share-social-outline" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{listing.title}</Text>
          </View>
          
          <View style={styles.badgeRow}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>APARTMENT</Text>
            </View>
            <Ionicons name="star" size={16} color="#fbbf24" style={{ marginLeft: 12, marginRight: 4 }} />
            <Text style={styles.ratingText}>{listing.rating} <Text style={styles.reviewCount}>(1,275 reviews)</Text></Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statPill}><Ionicons name="bed-outline" size={16} color="#3b82f6" /><Text style={styles.statText}>2 Beds</Text></View>
            <View style={styles.statPill}><Ionicons name="water-outline" size={16} color="#3b82f6" /><Text style={styles.statText}>2 Bath</Text></View>
            <View style={styles.statPill}><Ionicons name="expand-outline" size={16} color="#3b82f6" /><Text style={styles.statText}>1200 sqft</Text></View>
          </View>

          <Text style={styles.sectionTitle}>Agent</Text>
          <View style={styles.agentCard}>
            <Image source={{ uri: 'https://placehold.co/100x100/png?text=Agent' }} style={styles.agentImage} />
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>Natasya Wilodra</Text>
              <Text style={styles.agentRole}>Owner</Text>
            </View>
            <View style={styles.agentActions}>
              <TouchableOpacity style={styles.actionIcon}><Ionicons name="chatbubble-ellipses-outline" size={20} color="#3b82f6" /></TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}><Ionicons name="call-outline" size={20} color="#3b82f6" /></TouchableOpacity>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.descriptionText}>
            Sleek, modern 2-bedroom apartment with open living space, high-end finishes, and city views. Minutes from downtown, dining, and transit.
          </Text>

          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {['Car Parking', 'Swimming', 'Gym & Fit', 'Restaurant', 'Wi-Fi', 'Pet Center', 'Sport Center', 'Laundry'].map((item, index) => (
              <View key={index} style={styles.facilityItem}>
                <View style={styles.facilityIconCircle}>
                  <Ionicons name="checkmark-circle-outline" size={24} color="#3b82f6" />
                </View>
                <Text style={styles.facilityText}>{item}</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
      
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceText}>${listing.price}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  imageContainer: { width: '100%', height: 350, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  headerActions: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  rightActions: { flexDirection: 'row' },
  contentContainer: { padding: 24, backgroundColor: '#ffffff', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', flex: 1 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  typeBadge: { backgroundColor: '#eff6ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  typeBadgeText: { color: '#3b82f6', fontSize: 10, fontWeight: 'bold' },
  ratingText: { fontSize: 14, fontWeight: 'bold', color: '#1f2937' },
  reviewCount: { color: '#9ca3af', fontWeight: 'normal' },
  statsRow: { flexDirection: 'row', marginBottom: 24 },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, marginRight: 12 },
  statText: { marginLeft: 6, fontSize: 14, color: '#4b5563', fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16, marginTop: 8 },
  agentCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  agentImage: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  agentRole: { fontSize: 14, color: '#6b7280' },
  agentActions: { flexDirection: 'row' },
  actionIcon: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  descriptionText: { fontSize: 15, color: '#6b7280', lineHeight: 24, marginBottom: 24 },
  facilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 40 },
  facilityItem: { width: '22%', alignItems: 'center', marginBottom: 16 },
  facilityIconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  facilityText: { fontSize: 12, color: '#4b5563', textAlign: 'center' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  priceLabel: { fontSize: 14, color: '#6b7280' },
  priceText: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  bookButton: { backgroundColor: '#3b82f6', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16 },
  bookButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
