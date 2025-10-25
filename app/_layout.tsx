import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { CombinedDarkTheme, CombinedLightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getCurrentUser } from './utils/auth';

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
        if (user) {
          router.replace('/(tabs)'); // user logged in
        } else {
          router.replace('/login'); // no user → login first
        }
      } catch (error) {
        console.error('Error checking user:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </ThemeProvider>
    </PaperProvider>
  );
}
