import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { getCurrentUser } from '@/app/utils/auth'; // ✅ Correct import path
import { CombinedDarkTheme, CombinedLightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Themes
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  const paperTheme = isDark ? CombinedDarkTheme : CombinedLightTheme;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();

        // Small delay for smoother transition
        setTimeout(() => {
          if (user) {
            router.replace('/(tabs)'); // ✅ Go to main tabs when logged in
          } else {
            router.replace('/auth/login'); // ✅ Go to login when logged out
          }
        }, 800);
      } catch (error) {
        console.error('Error checking user:', error);
        router.replace('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Splash / Loading screen
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDark ? '#000' : '#fff',
        }}
      >
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </View>
    );
  }

  // Main App Navigation
  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          {/* ✅ Main Tabs - Home, Explore, Announcements, Schedule, Profile */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* ✅ Modal (Optional) */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              title: 'Modal',
            }}
          />

          {/* ✅ Auth Screens */}
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style={isDark ? 'light' : 'dark'} />
      </ThemeProvider>
    </PaperProvider>
  );
}
