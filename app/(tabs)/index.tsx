import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { getCurrentUser } from '../utils/auth';

// 🔹 Backend base URL — make sure to replace this IP with your current local IP
const API_URL = 'http://10.231.26.111:5000/api'; 

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [backendMessage, setBackendMessage] = useState<string>('Connecting to backend...');

  // ✅ Load user + check backend connection
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUserAndBackend = async () => {
        try {
          // 🔹 Get local user (Firebase Auth or local)
          const currentUser = await getCurrentUser();
          if (isActive) setUser(currentUser);

          // 🔹 Test backend connection
          const response = await fetch(`${API_URL}/test`);
          const data = await response.json();
          console.log("✅ Backend response:", data);
          if (isActive) setBackendMessage(data.message || "✅ Backend Connected Successfully!");
        } catch (e) {
          console.warn("⚠️ Backend or user fetch error:", e);
          if (isActive) setBackendMessage("❌ Failed to connect to backend");
        }
      };

      fetchUserAndBackend();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // 🧩 Optional: Automatically log connection result once on first mount
  useEffect(() => {
    const testOnce = async () => {
      try {
        const response = await fetch(`${API_URL}/test`);
        const data = await response.json();
        console.log("🌐 One-time backend check:", data);
      } catch (error) {
        console.error("Backend check failed:", error);
      }
    };
    testOnce();
  }, []);

  const initials =
    user?.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase() || 'GU'; // GU = Guest User

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* --- Header with Profile Avatar --- */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.banner}
        />
        <TouchableOpacity
          onPress={() => router.push('/profile/profile')}
          style={styles.avatarContainer}
        >
          <Avatar.Text
            size={45}
            label={initials}
            style={{ backgroundColor: theme.colors.primary }}
          />
        </TouchableOpacity>
      </View>

      {/* --- Title and Subtitle --- */}
      <Text
        variant="headlineLarge"
        style={[styles.title, { color: theme.colors.primary }]}
      >
        Welcome to Smart Campus 🎓
      </Text>

      <Text
        style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
      >
        Your digital companion for campus life — events, classes, and more!
      </Text>

      {/* 🔹 Show backend connection status */}
      <Card style={styles.statusCard} mode="outlined">
        <Card.Content>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: backendMessage.includes('✅') ? 'green' : 'red',
            }}
          >
            {backendMessage}
          </Text>
        </Card.Content>
      </Card>

      {/* --- Cards --- */}
      <View style={styles.cardsContainer}>
        <Card style={styles.card} mode="elevated">
          <Card.Title title="🎉 Campus Events" titleVariant="titleLarge" />
          <Card.Content>
            <Text>Stay updated with upcoming fests, seminars, and workshops.</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => router.push('/(tabs)/explore')}
            >
              Explore
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Title title="📚 Class Schedule" titleVariant="titleLarge" />
          <Card.Content>
            <Text>Track your classes and attendance easily.</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={() => router.push('/(tabs)/schedule')}
            >
              View Schedule
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Title title="📢 Announcements" titleVariant="titleLarge" />
          <Card.Content>
            <Text>Get all campus updates and notifications in one place.</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="text"
              onPress={() => router.push('/(tabs)/announcements')}
            >
              View
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    width: 160,
    height: 160,
    borderRadius: 20,
  },
  avatarContainer: {
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  statusCard: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 16,
    padding: 8,
  },
  cardsContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    borderRadius: 16,
    paddingBottom: 6,
  },
});
