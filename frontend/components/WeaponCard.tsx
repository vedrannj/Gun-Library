import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../theme';
import type { Weapon } from '../types';

interface WeaponCardProps {
    weapon: Weapon;
    index: number;
}

export default function WeaponCard({ weapon, index }: WeaponCardProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 60,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: index * 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim, index]);

    // Determine semantic color based on class
    let classColor = Colors.types.default;
    const wClass = weapon.class?.toLowerCase() || '';
    if (wClass.includes('assault')) classColor = Colors.types.assaultRifle;
    else if (wClass.includes('handgun') || wClass.includes('pistol')) classColor = Colors.types.handgun;
    else if (wClass.includes('sniper')) classColor = Colors.types.sniper;
    else if (wClass.includes('submachine')) classColor = Colors.types.submachine;
    else if (wClass.includes('battle')) classColor = Colors.types.battleRifle;

    return (
        <Animated.View
            style={[
                styles.card,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
        >
            <View style={[styles.accentBar, { backgroundColor: classColor }]} />

            {weapon.imageUrl ? (
                <Image
                    source={{ uri: weapon.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <View style={[styles.image, styles.noImage]}>
                    <Text style={styles.noImageIcon}>􀥆</Text>
                    <Text style={styles.noImageText}>IMAGE UNAVAILABLE</Text>
                </View>
            )}

            <View style={styles.body}>
                <View style={styles.headerRow}>
                    <Text style={styles.name}>{weapon.name}</Text>
                    <View style={[styles.classPill, { backgroundColor: classColor + '20', borderColor: classColor + '40' }]}>
                        <Text style={[styles.classText, { color: classColor }]}>{weapon.class}</Text>
                    </View>
                </View>

                <Text style={styles.description} numberOfLines={3}>
                    {weapon.description}
                </Text>

                <View style={styles.divider} />

                <View style={styles.metaRow}>
                    <View style={styles.metaChip}>
                        <Text style={styles.metaLabel}>CALIBER</Text>
                        <Text style={styles.metaValue} numberOfLines={1}>{weapon.calibre}</Text>
                    </View>
                    <View style={styles.metaChip}>
                        <Text style={styles.metaLabel}>ORIGIN</Text>
                        <Text style={styles.metaValue} numberOfLines={1}>{weapon.country}</Text>
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
        borderRadius: Radii.lg,
        marginBottom: Spacing.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    accentBar: {
        height: 4,
        width: '100%',
    },
    image: {
        width: '100%' as unknown as number,
        height: 160,
        backgroundColor: Colors.surfaceLight,
    },
    noImage: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    noImageIcon: {
        fontSize: 28,
        color: Colors.textMuted,
        opacity: 0.4,
    },
    noImageText: {
        color: Colors.textMuted,
        ...Typography.caption,
        letterSpacing: 1,
    },
    body: {
        padding: Spacing.lg,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
        gap: Spacing.sm,
    },
    name: {
        ...Typography.h3,
        color: Colors.text,
        flex: 1,
    },
    classPill: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: Radii.pill,
        borderWidth: 1,
    },
    classText: {
        ...Typography.pill,
    },
    description: {
        ...Typography.body,
        color: Colors.textMuted,
        marginBottom: Spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.sm,
    },
    metaRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.xs,
    },
    metaChip: {
        flex: 1,
        backgroundColor: Colors.surfaceLight,
        borderRadius: Radii.md,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.sm,
        alignItems: 'center',
    },
    metaLabel: {
        ...Typography.caption,
        fontSize: 10,
        color: Colors.textMuted,
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    metaValue: {
        ...Typography.caption,
        color: Colors.text,
        fontWeight: '700',
    },
});
