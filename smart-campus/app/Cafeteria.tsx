import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

/**
 * Indian menu example with prices in ₹.
 * Add to cart, view cart modal, remove, checkout.
 */

type Dish = { id: string; name: string; price: number; desc?: string };

export default function Cafeteria() {
  const menu: Dish[] = [
    { id: "d1", name: "Paneer Butter Masala + Rice", price: 120, desc: "Paneer in creamy tomato gravy" },
    { id: "d2", name: "Masala Dosa", price: 80, desc: "Crispy dosa with potato masala" },
    { id: "d3", name: "Chole Bhature", price: 100, desc: "Spicy chole with bhature" },
    { id: "d4", name: "Veg Thali", price: 140, desc: "Seasonal vegetable curry + roti + rice" },
    { id: "d5", name: "Samosa (2 pcs)", price: 40, desc: "Crispy potato samosas" },
    { id: "d6", name: "Masala Chai", price: 20, desc: "Spiced tea" },
  ];

  const [cart, setCart] = useState<{ dish: Dish; qty: number }[]>([]);
  const [cartVisible, setCartVisible] = useState(false);

  const addToCart = (dish: Dish) => {
    setCart(prev => {
      const found = prev.find(p => p.dish.id === dish.id);
      if (found) return prev.map(p => p.dish.id === dish.id ? { ...p, qty: p.qty + 1 } : p);
      return [{ dish, qty: 1 }, ...prev];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.dish.id !== id));
  };

  const changeQty = (id: string, delta: number) => {
    setCart(prev => prev.flatMap(p => {
      if (p.dish.id !== id) return p;
      const newQty = p.qty + delta;
      if (newQty <= 0) return [];
      return [{ ...p, qty: newQty }];
    }));
  };

  const total = cart.reduce((s, c) => s + c.dish.price * c.qty, 0);

  const checkout = () => {
    // Implement checkout logic
    setCart([]);
    setCartVisible(false);
    // show toast or alert (left as exercise)
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#FFF4E6", "#FFFFFF"]} style={styles.header}>
        <Text style={styles.title}>🍛 Cafeteria</Text>
        <Text style={styles.sub}>Fresh & affordable — add to cart and checkout</Text>
      </LinearGradient>

      <FlatList
        contentContainerStyle={{ padding: 14 }}
        data={menu}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDesc}>{item.desc}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>₹{item.price}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                <FontAwesome5 name="cart-plus" size={16} color="#fff" />
                <Text style={styles.addText}> Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.cartFloat} onPress={() => setCartVisible(true)}>
        <MaterialIcons name="shopping-cart" size={22} color="#fff" />
        <Text style={styles.cartCount}>{cart.reduce((s, c) => s + c.qty, 0)}</Text>
      </TouchableOpacity>

      <Modal visible={cartVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Your Cart</Text>

            {cart.length === 0 ? (
              <Text style={styles.empty}>Your cart is empty.</Text>
            ) : (
              <>
                <FlatList
                  data={cart}
                  keyExtractor={(c) => c.dish.id}
                  renderItem={({ item }) => (
                    <View style={styles.cartRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cartName}>{item.dish.name}</Text>
                        <Text style={styles.cartPrice}>₹{item.dish.price} x {item.qty}</Text>
                      </View>
                      <View style={styles.qtyRow}>
                        <Pressable onPress={() => changeQty(item.dish.id, -1)} style={styles.qtyBtn}><Text>-</Text></Pressable>
                        <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                        <Pressable onPress={() => changeQty(item.dish.id, 1)} style={styles.qtyBtn}><Text>+</Text></Pressable>
                      </View>
                      <Pressable onPress={() => removeFromCart(item.dish.id)} style={{ marginLeft: 12 }}>
                        <MaterialIcons name="delete" size={20} color="#d14343" />
                      </Pressable>
                    </View>
                  )}
                />

                <View style={styles.summary}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalAmt}>₹{total}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
                  <Pressable onPress={() => setCartVisible(false)} style={styles.modalCancel}><Text style={{ color: "#444" }}>Close</Text></Pressable>
                  <Pressable onPress={checkout} style={styles.checkoutBtn}><Text style={{ color: "#fff", fontWeight: "700" }}>Checkout</Text></Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF7F0" },
  header: { padding: 18, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  title: { fontSize: 22, fontWeight: "800", color: "#8A3E00" },
  sub: { fontSize: 13, color: "#A76310", marginTop: 6 },

  card: { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: "row", alignItems: "center", elevation: 2 },
  dishName: { fontSize: 15, fontWeight: "800", color: "#3a2f2f" },
  dishDesc: { color: "#777", marginTop: 6 },
  price: { fontSize: 14, fontWeight: "700", color: "#333" },

  addBtn: { backgroundColor: "#E64A19", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, marginTop: 10, flexDirection: "row", alignItems: "center" },
  addText: { color: "#fff", fontWeight: "700" },

  cartFloat: { position: "absolute", right: 18, bottom: 20, backgroundColor: "#FF7043", padding: 12, borderRadius: 28, flexDirection: "row", alignItems: "center", elevation: 5 },
  cartCount: { color: "#fff", marginLeft: 8, fontWeight: "800" },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#fff", padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: "70%" },

  modalTitle: { fontSize: 18, fontWeight: "800" },
  empty: { marginTop: 20, color: "#999", textAlign: "center" },

  cartRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#f0f0f0" },
  cartName: { fontWeight: "700" },
  cartPrice: { color: "#8a8a8a", marginTop: 4 },

  qtyRow: { flexDirection: "row", alignItems: "center" },
  qtyBtn: { backgroundColor: "#f2f2f2", padding: 6, borderRadius: 6 },

  summary: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" },
  totalText: { fontWeight: "800", fontSize: 16 },
  totalAmt: { fontWeight: "800", fontSize: 16 },

  modalCancel: { padding: 10, marginRight: 8 },
  checkoutBtn: { backgroundColor: "#EF6C00", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
});
