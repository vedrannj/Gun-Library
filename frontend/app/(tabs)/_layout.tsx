import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text, StyleSheet, View } from 'react-native';
import { Colors, Typography, Spacing } from '@/theme';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'android' ? 64 : 84,
          paddingBottom: Platform.OS === 'android' ? Spacing.sm : Spacing.xxl,
          paddingTop: Spacing.sm,
        },
        tabBarLabelStyle: {
          ...Typography.caption,
          fontWeight: '700',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused }) => (
            <TabIcon label="📖" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'About',
          tabBarIcon: ({ focused }) => (
            <TabIcon label="ℹ️" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    borderRadius: 8,
  },
  iconContainerFocused: {
    backgroundColor: Colors.accentMuted,
  },
  icon: {
    fontSize: 22,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
});
