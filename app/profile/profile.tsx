import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { getCurrentUser, logoutUser } from '../utils/auth';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/login');
  };

  const initials =
    user?.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase() || 'GU'; // GU = Guest User

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
      }}
    >
      <Card mode="elevated" style={{ borderRadius: 20, marginTop: 40 }}>
        <Card.Title
          title={user?.name || 'Guest User'}
          subtitle={user?.role || 'No role assigned'}
          left={(props) => (
            <Avatar.Text
              {...props}
              label={initials}
              style={{ backgroundColor: theme.colors.primary }}
            />
          )}
        />
        <Card.Content>
          <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
            👋 {user?.name ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome, guest!'}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Email: {user?.email || 'Not provided'}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Role: {user?.role || 'Not specified'}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Department: {user?.department || 'Not assigned'}
          </Text>
        </Card.Content>
        <Card.Actions>
          {user ? (
            <Button mode="outlined" onPress={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button mode="contained" onPress={() => router.push('/login')}>
              Login
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
}
