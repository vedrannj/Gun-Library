import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, StatusBar, Platform } from 'react-native';
import { Colors, Spacing, FontSize } from '@/theme';
import SearchEngine from '@/components/SearchEngine';
import WeaponCard from '@/components/WeaponCard';
import CardSkeleton from '@/components/CardSkeleton';
import type { Weapon } from '@/types';

export default function HomeScreen() {
  const [results, setResults] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);

  const handleResults = useCallback((data: Weapon[]) => {
    setResults(data);
  }, []);

  const handleLoading = useCallback((state: boolean) => {
    setLoading(state);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Gun Library</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {results.length}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Military Equipment Database</Text>
      </View>

      {/* Search */}
      <SearchEngine onResults={handleResults} onLoading={handleLoading} />

      {/* Results */}
      {loading ? (
        <View>
          <CardSkeleton />
          <CardSkeleton />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <WeaponCard weapon={item} index={index} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptySubtitle}>
                Try a different search term
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.xl,
    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight ?? 0) + Spacing.md
        : 60,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: Colors.accent,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    minWidth: 32,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: FontSize.xs,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: Spacing.xxxl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textDim,
  },
});
