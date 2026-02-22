import React from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '@/theme';

interface InfoCardProps {
  title: string;
  body: string;
  accent?: string;
}

function InfoCard({ title, body, accent }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardAccent, accent ? { backgroundColor: accent } : null]} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{body}</Text>
      </View>
    </View>
  );
}

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.subtitle}>App Information & Disclaimer</Text>
      </View>

      <InfoCard
        title="Gun Library"
        body="An encyclopedic reference application for military equipment. All data is sourced from publicly available databases for educational purposes only."
        accent={Colors.accent}
      />

      <InfoCard
        title="Disclaimer"
        body="This application does not facilitate the purchase, sale, or transfer of any firearms or ammunition. It is intended strictly as an educational and reference tool."
        accent={Colors.warning}
      />

      <InfoCard
        title="Data Sources"
        body="Equipment data is aggregated from open military databases and publicly available encyclopedic sources. Data is refreshed automatically on a daily schedule."
        accent={Colors.accentAlt}
      />

      <InfoCard
        title="Privacy"
        body="This application does not collect, store, or transmit any personal user data. All search queries are processed on the local backend server."
        accent={Colors.success}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Gun Library v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight ?? 0) + Spacing.md
        : 60,
    paddingBottom: Spacing.xxxl,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
  },
  cardAccent: {
    width: 4,
    backgroundColor: Colors.accent,
  },
  cardBody: {
    flex: 1,
    padding: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  cardText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.textDim,
  },
});
