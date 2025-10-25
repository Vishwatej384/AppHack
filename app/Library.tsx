import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Book = {
  id: string;
  title: string;
  author: string;
  available: boolean;
};

export default function Library() {
  const initialBooks: Book[] = [
    { id: "1", title: "The Discovery of India", author: "Jawaharlal Nehru", available: true },
    { id: "2", title: "Gitanjali", author: "Rabindranath Tagore", available: true },
    { id: "3", title: "White Tiger", author: "Aravind Adiga", available: true },
    { id: "4", title: "Midnight's Children", author: "Salman Rushdie", available: true },
    { id: "5", title: "The Guide", author: "R.K. Narayan", available: true },
    { id: "6", title: "Malgudi Days", author: "R.K. Narayan", available: true },
  ];

  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [borrowModalVisible, setBorrowModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [dateInput, setDateInput] = useState<string>("");

  const openBorrow = (book: Book) => {
    setSelectedBook(book);
    const today = new Date();
    setDateInput(today.toISOString().slice(0, 10)); // YYYY-MM-DD
    setBorrowModalVisible(true);
  };

  const confirmBorrow = () => {
    if (!selectedBook) return;
    // mark unavailable
    setBooks((prev) => prev.map(b => b.id === selectedBook.id ? { ...b, available: false } : b));
    setBorrowModalVisible(false);
    setSelectedBook(null);
    setDateInput("");
    // In future: persist or send to server
  };

  const cancelBorrow = () => {
    setBorrowModalVisible(false);
    setSelectedBook(null);
    setDateInput("");
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#E6F8FF", "#FFFFFF"]} style={styles.header}>
        <Text style={styles.headerTitle}>📚 Library</Text>
        <Text style={styles.headerSub}>Borrow books — choose a return date</Text>
      </LinearGradient>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={books}
        keyExtractor={(b) => b.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>by {item.author}</Text>
              <Text style={[styles.badge, { backgroundColor: item.available ? "#CFF8E1" : "#FFE3E3" }]}>
                {item.available ? "Available" : "Borrowed"}
              </Text>
            </View>

            <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: item.available ? "#0f8a5f" : "#999" }]}
                disabled={!item.available}
                onPress={() => openBorrow(item)}
              >
                <Text style={styles.buttonText}>{item.available ? "Borrow" : "Unavailable"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  // simple remove book (admin style), optional
                  setBooks(prev => prev.filter(b => b.id !== item.id));
                }}
              >
                <MaterialIcons name="delete" size={20} color="#d14343" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No books found.</Text>}
      />

      <Modal visible={borrowModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Borrow Book</Text>
            <Text style={styles.modalLabel}>Book</Text>
            <Text style={styles.modalBook}>{selectedBook?.title}</Text>

            <Text style={[styles.modalLabel, { marginTop: 12 }]}>Select Borrow Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.modalInput}
              value={dateInput}
              onChangeText={setDateInput}
              placeholder="2025-10-31"
              keyboardType={Platform.OS === "ios" ? "default" : "numeric"}
            />

            <View style={styles.modalRow}>
              <Pressable style={styles.modalCancel} onPress={cancelBorrow}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalConfirm} onPress={confirmBorrow}>
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </Pressable>
            </View>
            <Text style={styles.smallNote}><Entypo name="info-with-circle" size={14} /> Borrow date will help admin track returns.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F1F7FB" },
  header: { padding: 18, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, elevation: 2 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#074E68" },
  headerSub: { fontSize: 13, color: "#2E6B7A", marginTop: 6 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  bookTitle: { fontSize: 16, fontWeight: "700", color: "#1E3A43" },
  bookAuthor: { fontSize: 13, color: "#55777F", marginTop: 4 },
  badge: { marginTop: 8, alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, fontWeight: "700" },

  button: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "700" },

  iconBtn: { marginTop: 10 },

  empty: { textAlign: "center", marginTop: 30, color: "#9aa9b0" },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "86%", backgroundColor: "#fff", borderRadius: 12, padding: 18, elevation: 6 },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  modalLabel: { fontSize: 12, color: "#666", marginTop: 6 },
  modalBook: { fontSize: 15, fontWeight: "700", color: "#123", marginTop: 6 },
  modalInput: { marginTop: 8, borderWidth: 1, borderColor: "#e6e9eb", padding: 10, borderRadius: 8 },
  modalRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 14 },
  modalCancel: { paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 },
  modalCancelText: { color: "#666" },
  modalConfirm: { backgroundColor: "#1E88E5", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  modalConfirmText: { color: "#fff", fontWeight: "700" },
  smallNote: { marginTop: 10, fontSize: 12, color: "#888", marginLeft: 4 },
});
