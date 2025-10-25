import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Avatar, Button, Card, Text, useTheme } from "react-native-paper";
import { addUser, testConnection } from "../utils/api"; // ✅ backend connection
import { getCurrentUser, logoutUser } from "../utils/auth";

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<string>("Checking connection...");
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch user & check backend connection
  useEffect(() => {
    const fetchUserAndCheckBackend = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const res: any = await testConnection();
        let message = "Backend responded but no message found";
        if (res) {
          if (typeof res === "string") message = res;
          else if (res.message) message = res.message;
          else if (res.data?.message) message = res.data.message;
        }

        setBackendStatus(`✅ Backend Connected: ${message}`);
      } catch (error) {
        console.error("Backend connection failed:", error);
        setBackendStatus("❌ Backend not responding");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCheckBackend();
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    await logoutUser();
    router.replace("../auth/login");
  };

  // ✅ Sync user with backend
  const handleSyncUser = async () => {
    if (user?.name && user?.email) {
      try {
        const res = await addUser(user.name, user.email);
        alert(res?.message || "Synced with backend!");
      } catch (error) {
        alert("❌ Failed to sync user. Check backend connection.");
      }
    } else {
      alert("⚠️ User data missing!");
    }
  };

  // ✅ Avatar initials
  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "GU"; // Guest User

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
      }}
    >
      <Card mode="elevated" style={{ borderRadius: 20, marginTop: 40 }}>
        <Card.Title
          title={user?.name || "Guest User"}
          subtitle={user?.role || "No role assigned"}
          left={(props) => (
            <Avatar.Text
              {...props}
              label={initials}
              style={{ backgroundColor: theme.colors.primary }}
            />
          )}
        />

        <Card.Content>
          <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
            👋{" "}
            {user?.name
              ? `Welcome back, ${user.name.split(" ")[0]}!`
              : "Welcome, guest!"}
          </Text>

          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Email: {user?.email || "Not provided"}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Role: {user?.role || "Not specified"}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Department: {user?.department || "Not assigned"}
          </Text>

          {/* ✅ Backend Connection Status */}
          {loading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.primary}
              style={{ marginTop: 20 }}
            />
          ) : (
            <Text
              style={{
                marginTop: 20,
                color: backendStatus.includes("✅") ? "green" : "red",
              }}
            >
              {backendStatus}
            </Text>
          )}
        </Card.Content>

        <Card.Actions style={{ justifyContent: "space-between" }}>
          {user ? (
            <>
              <Button mode="outlined" onPress={handleLogout}>
                Logout
              </Button>
              <Button mode="contained" onPress={handleSyncUser}>
                Sync with Backend
              </Button>
            </>
          ) : (
            <Button mode="contained" onPress={() => router.push("../auth/login")}>
              Login
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
}
