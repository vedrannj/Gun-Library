import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, Radius } from '@/theme';

/**
 * A pulsing skeleton placeholder that mimics a WeaponCard shape
 * while data is loading. Creates a premium "shimmer" feel.
 */
export default function CardSkeleton() {
    const pulseAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, [pulseAnim]);

    return (
        <Animated.View style={[styles.card, { opacity: pulseAnim }]}>
            <View style={styles.accentBar} />
            <View style={styles.imagePlaceholder} />
            <View style={styles.body}>
                <View style={styles.titleBar} />
                <View style={styles.lineBar} />
                <View style={styles.lineBarShort} />
                <View style={styles.divider} />
                <View style={styles.metaRow}>
                    <View style={styles.metaChip} />
                    <View style={styles.metaChip} />
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
    },
    accentBar: {
        height: 3,
        backgroundColor: Colors.accent,
    },
    imagePlaceholder: {
        height: 180,
        backgroundColor: Colors.surfaceLight,
    },
    body: {
        padding: Spacing.lg,
    },
    titleBar: {
        height: 20,
        width: '60%' as unknown as number,
        backgroundColor: Colors.surfaceLight,
        borderRadius: Radius.sm,
        marginBottom: Spacing.md,
    },
    lineBar: {
        height: 14,
        width: '100%' as unknown as number,
        backgroundColor: Colors.surfaceLight,
        borderRadius: Radius.sm,
        marginBottom: Spacing.sm,
    },
    lineBarShort: {
        height: 14,
        width: '75%' as unknown as number,
        backgroundColor: Colors.surfaceLight,
        borderRadius: Radius.sm,
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
        height: 40,
        backgroundColor: Colors.surfaceLight,
        borderRadius: Radius.sm,
    },
});
