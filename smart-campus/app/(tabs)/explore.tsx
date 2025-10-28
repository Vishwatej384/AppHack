import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ExploreScreen() {
  const router = useRouter();

  const features = [
    {
      title: "Lost & Found",
      desc: "Report or claim lost items.",
      icon: <MaterialIcons name="search" size={28} color="#fff" />,
      colors: ["#FF6B6B", "#F94D6A"],
      route: "/LostFound",
    },
    {
      title: "Library",
      desc: "Borrow, return, or request books.",
      icon: <FontAwesome5 name="book" size={24} color="#fff" />,
      colors: ["#26C6DA", "#00ACC1"],
      route: "/Library",
    },
    {
      title: "Cafeteria",
      desc: "View menu and rate food.",
      icon: <FontAwesome5 name="hamburger" size={24} color="#fff" />,
      colors: ["#FF7043", "#F4511E"],
      route: "/Cafeteria",
    },
    {
      title: "StudentClubs",
      desc: "Join and manage campus clubs.",
      icon: <FontAwesome5 name="users" size={24} color="#fff" />,
      colors: ["#8E2DE2", "#4A00E0"],
      route: "/StudentClubs",
    },
    {
      title: "Feedback",
      desc: "Send feedback to administration.",
      icon: <Entypo name="chat" size={26} color="#fff" />,
      colors: ["#FFA726", "#FB8C00"],
      route: "/FeedbackPortal",
    },
    {
      title: "Sports",
      desc: "Book courts or view schedules.",
      icon: <FontAwesome5 name="football-ball" size={24} color="#fff" />,
      colors: ["#1E90FF", "#0066FF"],
      route: "/SportsComplex",
    },
  ];

  return (
    <LinearGradient colors={["#F5F7FA", "#C3CFE2"]} style={styles.container}>
      <Text style={styles.title}>Explore Campus</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              onPress={() => router.push(item.route)}
              style={styles.cardWrapper}
            >
              <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
                <View style={styles.icon}>{item.icon}</View>
                <View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222",
    marginTop: 60,
    marginLeft: 25,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  scroll: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  cardWrapper: {
    width: "45%",
    marginVertical: 12,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    height: 160,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  icon: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 10,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardDesc: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.85,
    marginTop: 3,
  },
});
