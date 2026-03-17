import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Built into Expo

// Screens
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Stubs for the new tabs
import { View, Text } from 'react-native';
const ExploreStub = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Explore Screen</Text></View>;
const ProfileStub = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile Screen</Text></View>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// The Bottom Tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6', // Your brand blue
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { borderTopWidth: 0, elevation: 10, height: 60, paddingBottom: 8 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Explore') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen}/>
      <Tab.Screen name="Profile" component={ProfileStub} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* Main App (with tabs) */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        
        {/* Modals / Details (No tabs) */}
        <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
