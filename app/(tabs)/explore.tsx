import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function ExploreScreen() {
  const features = [
    {
      title: "Lost & Found",
      desc: "Report or claim lost belongings easily.",
      icon: <MaterialIcons name="search" size={32} color="#fff" />,
      colors: ["#FF512F", "#DD2476"] as const,
    },
    {
      title: "Student Clubs",
      desc: "Join communities and grow your passion.",
      icon: <FontAwesome5 name="users" size={28} color="#fff" />,
      colors: ["#4A3C6A", "#191654"] as const,
    },
    {
      title: "Feedback Portal",
      desc: "Share your thoughts to improve campus life.",
      icon: <Ionicons name="chatbubbles" size={30} color="#fff" />,
      colors: ["#F7971E", "#FFD200"] as const,
    },
  ] as const;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerText}>
          Explore Campus 🌟
        </Text>
        <Text style={styles.subtitle}>
          Discover features that make your campus life smarter.
        </Text>
      </View>

      {/* FEATURE CARDS */}
      {features.map((feature, index) => (
        <Card key={index} style={styles.card} mode="elevated">
          <LinearGradient
            colors={feature.colors}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iconContainer}>{feature.icon}</View>
            <View style={styles.textContainer}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                {feature.title}
              </Text>
              <Text style={styles.cardDesc}>{feature.desc}</Text>
            </View>
          </LinearGradient>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 6,
  },
  card: {
    borderRadius: 16,
    marginVertical: 10,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardDesc: {
    color: "#f3f4f6",
    marginTop: 4,
  },
});
