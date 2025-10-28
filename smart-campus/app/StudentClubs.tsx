import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Club = {
  id: string;
  name: string;
  leader: string;
  description: string;
  members: number;
  joined?: boolean;
};

export default function StudentClubs() {
  const initial: Club[] = [
    { id: "c1", name: "Tech & Robotics Club", leader: "Rahul Sharma", description: "Coding, robotics projects & workshops", members: 34 },
    { id: "c2", name: "Drama & Theatre", leader: "Priya Desai", description: "Plays, improv and stagecraft", members: 21 },
    { id: "c3", name: "Environment Club", leader: "Anil Kapoor", description: "Campus cleanups and sustainability", members: 28 },
    { id: "c4", name: "Music & Cultural", leader: "Neha Verma", description: "Music, dance, cultural events", members: 40 },
    { id: "c5", name: "Debate Society", leader: "Vikram Patel", description: "Debates, public speaking & quizzes", members: 18 },
    { id: "c6", name: "Art & Design", leader: "Sana Iqbal", description: "Sketching, digital design & exhibitions", members: 26 },
  ];

  const [clubs, setClubs] = useState<Club[]>(initial);
  const [activeClub, setActiveClub] = useState<Club | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openClub = (club: Club) => {
    setActiveClub(club);
    setModalVisible(true);
  };

  const toggleJoin = (id: string) => {
    setClubs(prev => prev.map(c => c.id === id ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 } : c));
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#F0F7FF", "#FFFFFF"]} style={styles.header}>
        <Text style={styles.title}>🎯 Student Clubs</Text>
        <Text style={styles.sub}>Discover groups & join what you love</Text>
      </LinearGradient>

      <FlatList
        contentContainerStyle={{ padding: 14 }}
        data={clubs}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => openClub(item)}>
            <View style={styles.clubCard}>
              <View style={styles.leftIcon}>
                <FontAwesome5 name="users" size={20} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.clubName}>{item.name}</Text>
                <Text style={styles.clubLeader}>Lead: {item.leader}</Text>
                <Text style={styles.clubMembers}>{item.members} members</Text>
              </View>
              <TouchableOpacity onPress={() => toggleJoin(item.id)} style={[styles.joinBtn, { backgroundColor: item.joined ? "#B2DFDB" : "#4CAF50" }]}>
                <Text style={{ fontWeight: "700" }}>{item.joined ? "Joined" : "Join"}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{activeClub?.name}</Text>
            <Text style={styles.modalLead}>Leader: {activeClub?.leader}</Text>
            <Text style={styles.modalDesc}>{activeClub?.description}</Text>
            <Text style={styles.modalMembers}>{activeClub?.members} members</Text>

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }}>
              <Pressable onPress={() => setModalVisible(false)} style={{ padding: 10, marginRight: 8 }}>
                <Text style={{ color: "#555" }}>Close</Text>
              </Pressable>
              <Pressable onPress={() => { if (activeClub) toggleJoin(activeClub.id); setModalVisible(false); }} style={{ backgroundColor: "#1976D2", padding: 10, borderRadius: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>{activeClub?.joined ? "Leave" : "Join"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7FBFF" },
  header: { padding: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  title: { fontSize: 22, fontWeight: "800", color: "#0B4F72" },
  sub: { color: "#3b6f86", marginTop: 6 },

  clubCard: { backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12, flexDirection: "row", alignItems: "center", elevation: 2 },
  leftIcon: { backgroundColor: "#1976D2", padding: 12, borderRadius: 12, marginRight: 12 },
  clubName: { fontWeight: "800", fontSize: 15 },
  clubLeader: { color: "#666", marginTop: 4 },
  clubMembers: { color: "#9aa", marginTop: 4, fontSize: 12 },
  joinBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "86%", backgroundColor: "#fff", padding: 18, borderRadius: 12, elevation: 8 },
  modalTitle: { fontWeight: "800", fontSize: 18 },
  modalLead: { marginTop: 8, color: "#444" },
  modalDesc: { marginTop: 10, color: "#666" },
  modalMembers: { marginTop: 12, fontWeight: "700" },
});
