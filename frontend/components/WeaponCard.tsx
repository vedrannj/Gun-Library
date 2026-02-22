import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '@/theme';
import type { Weapon } from '@/types';

interface WeaponCardProps {
    weapon: Weapon;
    index: number;
}

export default function WeaponCard({ weapon, index }: WeaponCardProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 80,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: index * 80,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim, index]);

    return (
        <Animated.View
            style={[
                styles.card,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
        >
            {/* Accent bar */}
            <View style={styles.accentBar} />

            {weapon.imageUrl ? (
                <Image
                    source={{ uri: weapon.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <View style={[styles.image, styles.noImage]}>
                    <Text style={styles.noImageIcon}>🔫</Text>
                    <Text style={styles.noImageText}>No Image</Text>
                </View>
            )}

            <View style={styles.body}>
                <Text style={styles.name}>{weapon.name}</Text>
                <Text style={styles.description} numberOfLines={3}>
                    {weapon.description}
                </Text>

                <View style={styles.divider} />

                <View style={styles.metaRow}>
                    <View style={styles.metaChip}>
                        <Text style={styles.metaLabel}>ORIGIN</Text>
                        <Text style={styles.metaValue}>{weapon.country}</Text>
                    </View>
                    <View style={styles.metaChip}>
                        <Text style={styles.metaLabel}>YEAR</Text>
                        <Text style={styles.metaValue}>{weapon.year}</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        marginBottom: Spacing.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },
    accentBar: {
        height: 3,
        backgroundColor: Colors.accent,
    },
    image: {
        width: '100%' as unknown as number,
        height: 180,
        backgroundColor: Colors.surfaceLight,
    },
    noImage: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    noImageIcon: {
        fontSize: 32,
        opacity: 0.4,
    },
    noImageText: {
        color: Colors.textDim,
        fontSize: FontSize.sm,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    body: {
        padding: Spacing.lg,
    },
    name: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: Spacing.sm,
        letterSpacing: 0.3,
    },
    description: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.md,
    },
    metaRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    metaChip: {
        flex: 1,
        backgroundColor: Colors.surfaceLight,
        borderRadius: Radius.sm,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
    metaLabel: {
        fontSize: FontSize.xs,
        color: Colors.textDim,
        fontWeight: '600',
        letterSpacing: 1.2,
        marginBottom: 2,
    },
    metaValue: {
        fontSize: FontSize.sm,
        color: Colors.text,
        fontWeight: '700',
    },
});
