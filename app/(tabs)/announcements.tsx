import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { getCurrentUser } from '../utils/auth';
import { StyleSheet } from 'react-native';


export default function AnnouncementsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // 🔄 Refresh user whenever tab gains focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      };
      fetchUser();
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
      {/* --- Header --- */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
          📢 Announcements
        </Text>

        {/* --- Profile Initials Icon --- */}
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

      {/* --- Example Announcements --- */}
      <Card style={styles.card} mode="elevated">
        <Card.Title title="🎉 Holiday Notice" />
        <Card.Content>
          <Text>Campus will remain closed this Friday for Diwali celebrations.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Title title="🤖 Workshop: AI in Education" />
        <Card.Content>
          <Text>Join us for a hands-on session on AI tools for students.</Text>
        </Card.Content>
      </Card>

      {/* --- Default Message if No Announcements --- */}
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No new announcements right now.</Text>
      </View>

      {/* --- Login / Signup buttons (only if user is not logged in) --- */}
      {!user && (
        <View style={styles.authButtons}>
          <Button
            mode="contained"
            onPress={() => router.push('/auth/login')}
            style={styles.authButton}
          >
            Login
          </Button>
          <Button
            mode="outlined"
            onPress={() => router.push('/auth/signup')}
            style={styles.authButton}
          >
            Sign Up
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: { marginRight: 10 },
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
  emptyContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  authButtons: {
    marginTop: 30,
    alignItems: 'center',
  },
  authButton: {
    width: '90%',
    marginVertical: 5,
    borderRadius: 30,
  },
});


