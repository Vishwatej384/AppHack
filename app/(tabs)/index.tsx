import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { getCurrentUser } from '../utils/auth';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
  React.useCallback(() => {
    let isActive = true;

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (isActive) setUser(currentUser);
      } catch (e) {
        console.warn('fetchUser error', e);
      }
    };

    fetchUser();

    return () => {
      isActive = false;
    };
  }, [])
);

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
  cardsContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    borderRadius: 16,
    paddingBottom: 6,
  },
});
