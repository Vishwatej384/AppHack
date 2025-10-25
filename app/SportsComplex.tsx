import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/**
 * Predefined sports with booking option (simple date/time text input)
 */

type Sport = { id: string; name: string; desc: string; iconName: string };

export default function SportsComplex() {
  const initial: Sport[] = [
    { id: "s1", name: "Cricket", desc: "Ground booking & net practice", iconName: "cricket" },
    { id: "s2", name: "Football", desc: "Pitch for 11-a-side or practice", iconName: "football-ball" },
    { id: "s3", name: "Badminton", desc: "Indoor courts booking", iconName: "volleyball-ball" },
    { id: "s4", name: "Basketball", desc: "Hoop courts & training", iconName: "basketball-ball" },
    { id: "s5", name: "Table Tennis", desc: "TT tables for practice", iconName: "table-tennis" },
  ];

  const [sports] = useState<Sport[]>(initial);
  const [bookingModal, setBookingModal] = useState(false);
  const [activeSport, setActiveSport] = useState<Sport | null>(null);
  const [slotDate, setSlotDate] = useState<string>("");
  const [slotTime, setSlotTime] = useState<string>("");
  const [bookings, setBookings] = useState<{ id: string; sport: string; date: string; time: string }[]>([]);

  const openBooking = (s: Sport) => {
    setActiveSport(s);
    setSlotDate(new Date().toISOString().slice(0, 10));
    setSlotTime("17:00 - 18:00");
    setBookingModal(true);
  };

  const confirmBooking = () => {
    if (!activeSport || !slotDate || !slotTime) return;
    const id = Date.now().toString();
    setBookings(prev => [{ id, sport: activeSport.name, date: slotDate, time: slotTime }, ...prev]);
    setBookingModal(false);
    setActiveSport(null);
    setSlotDate("");
    setSlotTime("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>🏟️ Sports Complex</Text>
        <Text style={styles.sub}>Book slots and view upcoming bookings</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 14 }}
        data={sports}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.iconWrap}>
                <FontAwesome5 name={item.iconName as any} size={20} color="#fff" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.sportName}>{item.name}</Text>
                <Text style={styles.sportDesc}>{item.desc}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.bookBtn} onPress={() => openBooking(item)}>
              <Text style={{ color: "#fff", fontWeight: "800" }}>Book Slot</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={{ padding: 14 }}>
        <Text style={{ fontSize: 16, fontWeight: "800", marginBottom: 8 }}>Your Bookings</Text>
        {bookings.length === 0 ? <Text style={{ color: "#888" }}>No bookings yet.</Text> : (
          bookings.map(b => (
            <View key={b.id} style={styles.bookingRow}>
              <Text style={{ fontWeight: "700" }}>{b.sport}</Text>
              <Text style={{ color: "#666" }}>{b.date} • {b.time}</Text>
            </View>
          ))
        )}
      </View>

      <Modal visible={bookingModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontWeight: "800", fontSize: 16 }}>{activeSport?.name}</Text>
            <Text style={{ color: "#666", marginTop: 6 }}>{activeSport?.desc}</Text>

            <Text style={{ marginTop: 12, color: "#555" }}>Select Date (YYYY-MM-DD)</Text>
            <TextInput style={styles.input} value={slotDate} onChangeText={setSlotDate} placeholder="2025-10-31" />

            <Text style={{ marginTop: 12, color: "#555" }}>Preferred Time (e.g., 17:00 - 18:00)</Text>
            <TextInput style={styles.input} value={slotTime} onChangeText={setSlotTime} placeholder="17:00 - 18:00" />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 14 }}>
              <Pressable onPress={() => setBookingModal(false)} style={{ padding: 10, marginRight: 8 }}>
                <Text style={{ color: "#666" }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmBooking} style={{ backgroundColor: "#0D47A1", padding: 10, borderRadius: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "800" }}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFF" },
  header: { backgroundColor: "#E8F0FF", padding: 16, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  title: { fontSize: 20, fontWeight: "800", color: "#0D47A1" },
  sub: { color: "#345b9a", marginTop: 6 },

  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 2 },
  iconWrap: { backgroundColor: "#0D47A1", padding: 12, borderRadius: 12 },
  sportName: { fontWeight: "800" },
  sportDesc: { color: "#666", marginTop: 4 },
  bookBtn: { backgroundColor: "#1976D2", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },

  bookingRow: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 8, elevation: 1 },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "88%", backgroundColor: "#fff", padding: 16, borderRadius: 12, elevation: 6 },
  input: { marginTop: 8, borderWidth: 1, borderColor: "#eee", padding: 10, borderRadius: 8 },
});
