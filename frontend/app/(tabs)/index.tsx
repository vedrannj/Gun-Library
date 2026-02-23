import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, StatusBar, Platform, ScrollView } from 'react-native';
import { Colors, Spacing, Typography, Radii } from '@/theme';
import SearchEngine from '@/components/SearchEngine';
import WeaponCard from '@/components/WeaponCard';
import CardSkeleton from '@/components/CardSkeleton';
import type { Weapon } from '@/types';

export default function HomeScreen() {
  const [results, setResults] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResults = useCallback((data: Weapon[]) => {
    setResults(data);
    setHasSearched(true);
  }, []);

  const handleLoading = useCallback((state: boolean) => {
    setLoading(state);
    if (state) setHasSearched(true);
  }, []);

  const renderDiscoveryContainer = () => (
    <ScrollView style={styles.discoveryContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.discoveryHeader}>Browse by Class</Text>
      <View style={styles.chipGrid}>
        {['Assault Rifle', 'Handgun', 'Sniper Rifle', 'Submachine Gun', 'Battle Rifle'].map(cat => (
          <View key={cat} style={styles.discoveryChip}>
            <Text style={styles.discoveryChipText}>{cat}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.discoveryHeader}>Browse by Caliber</Text>
      <View style={styles.chipGrid}>
        {['9×19mm Parabellum', '5.56×45mm NATO', '7.62×39mm', '.45 ACP', '.338 Lapua'].map(cal => (
          <View key={cal} style={styles.discoveryChip}>
            <Text style={styles.discoveryChipText}>{cal}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerIcon}>💡</Text>
        <Text style={styles.infoBannerText}>
          Use the search engine above to filter military equipment by name, origin country, class, or caliber.
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Gun Library</Text>
          {hasSearched && !loading && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{results.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>Military Equipment Database</Text>
      </View>

      {/* Search */}
      <SearchEngine onResults={handleResults} onLoading={handleLoading} fetchOnMount={false} />

      {/* Content Area */}
      {loading ? (
        <View>
          <CardSkeleton />
          <CardSkeleton />
        </View>
      ) : !hasSearched ? (
        renderDiscoveryContainer()
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <WeaponCard weapon={item} index={index} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>􀊫</Text>
          <Text style={styles.emptyTitle}>NO RESULTS DIRECTORY</Text>
          <Text style={styles.emptySubtitle}>
            Try checking spelling or scanning different calibers.
          </Text>
        </View>
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
    marginBottom: Spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  badge: {
    backgroundColor: Colors.accent,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    ...Typography.pill,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
    opacity: 0.3,
    color: Colors.textMuted,
  },
  emptyTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  discoveryContainer: {
    flex: 1,
  },
  discoveryHeader: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  discoveryChip: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radii.pill,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  discoveryChipText: {
    ...Typography.caption,
    color: Colors.text,
  },
  infoBanner: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radii.md,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  infoBannerIcon: {
    fontSize: 24,
  },
  infoBannerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    flex: 1,
    lineHeight: 20,
  }
});
