import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Fade in text and scale up logo
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start(() => {
      // 2. Wait a bit, then fade out the whole screen
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      }, 700); // 800ms fade in + 700ms hold + 400ms fade out = ~1.9s total
    });
  }, []);

  return (
    <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        <Text style={styles.logoIcon}>🔫</Text>
        <Animated.Text style={[styles.splashTitle, { opacity: textOpacity }]}>
          Gun Library
        </Animated.Text>
        <Animated.Text style={[styles.splashSubtitle, { opacity: textOpacity }]}>
          Data & Analytics
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="light" />

      {!appReady && (
        <View style={StyleSheet.absoluteFill}>
          <SplashScreen onFinish={() => setAppReady(true)} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure it covers everything
  },
  logoIcon: {
    fontSize: 72,
    marginBottom: Spacing.md,
  },
  splashTitle: {
    ...Typography.h1,
    color: Colors.text,
    letterSpacing: 1.5,
  },
  splashSubtitle: {
    ...Typography.body,
    color: Colors.accent,
    marginTop: Spacing.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
  }
});
