import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from '../services/authService';

type Props = {
  navigation: NativeStackNavigationProp<any, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'landlord'>('student');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all details.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.register(email, password, role);
      Alert.alert('Welcome!', 'Your account has been successfully created.');
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the premier student housing network.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password (min 6 chars)"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.roleLabel}>I am a...</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'student' && styles.roleButtonActive]}
              onPress={() => setRole('student')}
            >
              <Text style={[styles.roleText, role === 'student' && styles.roleTextActive]}>Student</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.roleButton, role === 'landlord' && styles.roleButtonActive]}
              onPress={() => setRole('landlord')}
            >
              <Text style={[styles.roleText, role === 'landlord' && styles.roleTextActive]}>Landlord</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Sign Up</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Reusing the same core styles from Login to maintain design consistency
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { flex: 1, padding: 24, justifyContent: 'space-between' },
  headerContainer: { marginTop: 40, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: '800', color: '#1f2937', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#6b7280', lineHeight: 24 },
  form: { flex: 1 },
  input: {
    backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb',
    padding: 18, borderRadius: 12, marginBottom: 16, fontSize: 16, color: '#1f2937',
  },
  roleLabel: { fontSize: 14, fontWeight: '600', color: '#4b5563', marginBottom: 12, marginTop: 8 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  roleButton: {
    flex: 1, padding: 16, borderWidth: 1, borderColor: '#e5e7eb',
    borderRadius: 12, marginHorizontal: 4, alignItems: 'center', backgroundColor: '#f9fafb'
  },
  roleButtonActive: { backgroundColor: '#eff6ff', borderColor: '#3b82f6' },
  roleText: { fontSize: 15, color: '#6b7280', fontWeight: '500' },
  roleTextActive: { color: '#3b82f6', fontWeight: 'bold' },
  primaryButton: {
    backgroundColor: '#3b82f6', padding: 18, borderRadius: 12, alignItems: 'center',
    shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8,
  },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 },
  footerText: { color: '#6b7280', fontSize: 15 },
  footerLink: { color: '#3b82f6', fontSize: 15, fontWeight: 'bold' }
});
