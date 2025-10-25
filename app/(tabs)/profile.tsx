import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';

export default function ProfileScreen() {
  const theme = useTheme();

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
          title="Tejas Keerthi"
          subtitle="Smart Campus Member"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Content>
          <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
            👋 Welcome back, Tejas! Here’s your profile overview.
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Email: tejas@smartcampus.edu
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Role: Student
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Department: Computer Science
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => console.log('Edit Profile')}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log('Logout')}
          >
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
