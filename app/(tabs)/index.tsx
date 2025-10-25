import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.banner}
      />

      <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
        Welcome to Smart Campus 🎓
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        Your digital companion for campus life — events, classes, and more!
      </Text>

      <View style={styles.cardsContainer}>
        <Card style={styles.card} mode="elevated">
          <Card.Title
            title="🎉 Campus Events"
            titleVariant="titleLarge"
          />
          <Card.Content>
            <Text>
              Stay updated with upcoming fests, seminars, and workshops.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => alert('Explore Events')}>
              Explore
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Title
            title="📚 Class Schedule"
            titleVariant="titleLarge"
          />
          <Card.Content>
            <Text>Track your classes and attendance easily.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" onPress={() => alert('View Schedule')}>
              View Schedule
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Title
            title="📢 Announcements"
            titleVariant="titleLarge"
          />
          <Card.Content>
            <Text>Get all campus updates and notifications in one place.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => alert('See Announcements')}>
              View
            </Button>
          </Card.Actions>
        </Card>
      </View>

      <Button
        mode="contained-tonal"
        style={styles.bigButton}
        onPress={() => alert('Profile Page Coming Soon')}>
        Go to Profile
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  banner: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 6,
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
  bigButton: {
    marginTop: 30,
    width: '90%',
    borderRadius: 30,
  },
});
