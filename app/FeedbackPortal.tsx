import { LinearGradient } from "expo-linear-gradient";
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
 * Add and edit feedback with timestamp and nicer visuals
 */

type Feedback = { id: string; name: string; message: string; time: string };

export default function FeedbackPortal() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([
    { id: "f1", name: "Asha Patel", message: "Cafeteria could offer more veg options.", time: new Date().toLocaleString() },
    { id: "f2", name: "Rohan Mehta", message: "Please increase library timings.", time: new Date().toLocaleString() },
  ]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [editing, setEditing] = useState<Feedback | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const submit = () => {
    if (!name.trim() || !message.trim()) return;
    const now = new Date().toLocaleString();
    if (editing) {
      setFeedbackList(prev => prev.map(f => f.id === editing.id ? { ...f, name: name.trim(), message: message.trim(), time: now } : f));
      setEditing(null);
    } else {
      const newItem: Feedback = { id: Date.now().toString(), name: name.trim(), message: message.trim(), time: now };
      setFeedbackList([newItem, ...feedbackList]);
    }
    setName("");
    setMessage("");
    setModalVisible(false);
  };

  const startEdit = (f: Feedback) => {
    setEditing(f);
    setName(f.name);
    setMessage(f.message);
    setModalVisible(true);
  };

  const remove = (id: string) => setFeedbackList(prev => prev.filter(p => p.id !== id));

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#FFF7FB", "#FFFFFF"]} style={styles.header}>
        <Text style={styles.title}>💬 Feedback Portal</Text>
        <Text style={styles.sub}>Share feedback — admin will see timestamps</Text>
      </LinearGradient>

      <View style={{ padding: 14 }}>
        <TouchableOpacity style={styles.newBtn} onPress={() => { setEditing(null); setName(""); setMessage(""); setModalVisible(true); }}>
          <Text style={{ color: "#fff", fontWeight: "800" }}>+ Add Feedback</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 40 }}
        data={feedbackList}
        keyExtractor={(f) => f.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.msg}>"{item.message}"</Text>
              <Text style={styles.by}>— {item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={{ marginLeft: 12 }}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => startEdit(item)}>
                <Text style={{ color: "#1976D2", fontWeight: "700" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconBtn, { marginTop: 8 }]} onPress={() => remove(item.id)}>
                <Text style={{ color: "#d14343", fontWeight: "700" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontWeight: "800", fontSize: 16 }}>{editing ? "Edit Feedback" : "New Feedback"}</Text>
            <TextInput placeholder="Your name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Your feedback" value={message} onChangeText={setMessage} style={[styles.input, { height: 100 }]} multiline />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Pressable onPress={() => setModalVisible(false)} style={{ padding: 10 }}>
                <Text style={{ color: "#666" }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={submit} style={{ backgroundColor: "#1976D2", padding: 10, borderRadius: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "800" }}>{editing ? "Save" : "Submit"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFDF6" },
  header: { padding: 16, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
  title: { fontSize: 20, fontWeight: "800", color: "#4A148C" },
  sub: { color: "#6a3f80", marginTop: 6 },

  newBtn: { backgroundColor: "#6A1B9A", padding: 12, borderRadius: 10, alignItems: "center" },

  card: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 12, flexDirection: "row", elevation: 2 },
  msg: { fontStyle: "italic", fontSize: 14 },
  by: { marginTop: 8, fontWeight: "700" },
  time: { marginTop: 6, color: "#888", fontSize: 12 },

  iconBtn: { padding: 6 },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "88%", backgroundColor: "#fff", padding: 16, borderRadius: 12, elevation: 8 },
  input: { marginTop: 12, borderWidth: 1, borderColor: "#e6e6e6", padding: 10, borderRadius: 8 },
});
