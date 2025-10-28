import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LostFound() {
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Wallet",
      location: "Library",
      desc: "Brown leather wallet with ID inside.",
      time: "Oct 26, 2025 - 10:15 AM",
      image:
        "https://cdn-icons-png.flaticon.com/512/891/891462.png",
      colors: ["#FF6B6B", "#F94D6A"],
    },
    {
      id: "2",
      name: "Umbrella",
      location: "Cafeteria",
      desc: "Black umbrella left on a chair.",
      time: "Oct 25, 2025 - 2:45 PM",
      image:
        "https://cdn-icons-png.flaticon.com/512/415/415682.png",
      colors: ["#36D1DC", "#5B86E5"],
    },
    {
      id: "3",
      name: "USB Drive",
      location: "Computer Lab",
      desc: "Silver 16GB SanDisk USB drive.",
      time: "Oct 24, 2025 - 11:20 AM",
      image:
        "https://cdn-icons-png.flaticon.com/512/907/907045.png",
      colors: ["#FF9966", "#FF5E62"],
    },
    {
      id: "4",
      name: "ID Card",
      location: "Sports Complex",
      desc: "Student ID of Rahul Mehta, B.Tech 3rd year.",
      time: "Oct 23, 2025 - 9:10 AM",
      image:
        "https://cdn-icons-png.flaticon.com/512/3022/3022253.png",
      colors: ["#56CCF2", "#2F80ED"],
    },
    {
      id: "5",
      name: "Water Bottle",
      location: "Hostel Block B",
      desc: "Blue steel water bottle with a dent on cap.",
      time: "Oct 22, 2025 - 4:50 PM",
      image:
        "https://cdn-icons-png.flaticon.com/512/869/869636.png",
      colors: ["#43E97B", "#38F9D7"],
    },
    {
      id: "6",
      name: "AirPods",
      location: "Auditorium",
      desc: "White AirPods case labeled 'Sanya'.",
      time: "Oct 21, 2025 - 6:00 PM",
      image:
        "https://cdn-icons-png.flaticon.com/512/808/808439.png",
      colors: ["#FFB75E", "#ED8F03"],
    },
  ]);

  const addItem = () => {
    if (!item || !location || !description) {
      Alert.alert("Please fill in all fields!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: item,
      location,
      desc: description,
      time: new Date().toLocaleString(),
      image: "https://cdn-icons-png.flaticon.com/512/1484/1484817.png",
      colors: ["#36D1DC", "#5B86E5"],
    };

    setItems([newItem, ...items]);
    setItem("");
    setLocation("");
    setDescription("");
  };

  const renderItem = ({ item }) => (
    <LinearGradient colors={item.colors} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDesc}>{item.desc}</Text>
      <Text style={styles.itemLoc}>📍 {item.location}</Text>
      <Text style={styles.itemTime}>🕒 {item.time}</Text>
    </LinearGradient>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Lost & Found</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />

      <View style={styles.formContainer}>
        <Text style={styles.subHeader}>Add a Lost Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Item Name"
          placeholderTextColor="#888"
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Location Found/Lost"
          placeholderTextColor="#888"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity onPress={addItem}>
          <LinearGradient colors={["#43E97B", "#38F9D7"]} style={styles.button}>
            <Text style={styles.buttonText}>Add Item</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  row: { justifyContent: "space-evenly" },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginBottom: 8 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  itemDesc: { fontSize: 12, color: "#fff", opacity: 0.9, textAlign: "center" },
  itemLoc: { fontSize: 12, color: "#fff", marginTop: 4 },
  itemTime: { fontSize: 11, color: "#f0f0f0", marginTop: 2 },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
