import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://10.231.26.111:5000/api"; // ⚠️ Update to your IP if needed

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // 🟢 Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/announcements`);
      const data = await res.json();
      if (data.success) setAnnouncements(data.announcements);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  // 🟠 Add or Edit announcement
  const saveAnnouncement = async () => {
    if (!title || !details) {
      Alert.alert("Missing Fields", "Please fill in both Title and Details");
      return;
    }

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `${API_URL}/announcements/${selectedId}`
        : `${API_URL}/announcements`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, details }),
      });

      const data = await res.json();
      if (data.success) {
        Alert.alert("✅ Success", data.message);
        setModalVisible(false);
        setTitle("");
        setDetails("");
        setEditMode(false);
        setSelectedId(null);
        fetchAnnouncements();
      } else {
        Alert.alert("❌ Error", data.message);
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  // 🗑️ Delete announcement
  const deleteAnnouncement = async (id: number) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(`${API_URL}/announcements/${id}`, {
              method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
              Alert.alert("🗑️ Deleted", "Announcement removed");
              fetchAnnouncements();
            }
          } catch (error) {
            console.error("Error deleting:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📢 Announcements</Text>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.details}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    setTitle(item.title);
                    setDetails(item.details);
                    setSelectedId(item.id);
                    setEditMode(true);
                    setModalVisible(true);
                  }}
                  style={styles.editButton}
                >
                  <Text style={{ color: "white" }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteAnnouncement(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={{ color: "white" }}>Del</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditMode(false);
          setTitle("");
          setDetails("");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>＋ Add Announcement</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              {editMode ? "Edit Announcement" : "Add Announcement"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Details"
              multiline
              value={details}
              onChangeText={setDetails}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#4CAF50" }]}
                onPress={saveAnnouncement}
              >
                <Text style={styles.buttonText}>
                  {editMode ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#E74C3C" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 15, color: "#555" },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
    padding: 6,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "85%",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
