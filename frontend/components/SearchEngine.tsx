import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, StyleSheet, Animated, Platform } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../theme';
import type { Weapon } from '../types';

const API_BASE =
    Platform.OS === 'web' ? '' : Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

interface SearchEngineProps {
    onResults: (data: Weapon[]) => void;
    onLoading: (loading: boolean) => void;
    fetchOnMount?: boolean; // New prop for empty state
}

export default function SearchEngine({ onResults, onLoading, fetchOnMount = false }: SearchEngineProps) {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const glowAnim = useRef(new Animated.Value(0)).current;

    const fetchResults = useCallback(
        async (searchQuery: string) => {
            if (!searchQuery && !fetchOnMount) {
                onResults([]);
                return;
            }
            onLoading(true);
            try {
                const res = await fetch(
                    `${API_BASE}/api/search?q=${encodeURIComponent(searchQuery)}`
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: Weapon[] = await res.json();
                onResults(data);
            } catch (err) {
                console.error('Search error:', err);
                onResults([]);
            } finally {
                onLoading(false);
            }
        },
        [onResults, onLoading, fetchOnMount]
    );

    useEffect(() => {
        if (fetchOnMount) {
            fetchResults('');
        }
    }, [fetchResults, fetchOnMount]);

    useEffect(() => {
        Animated.timing(glowAnim, {
            toValue: focused ? 1 : 0,
            duration: 200,
            useNativeDriver: false, // borderColor doesn't support native driver
        }).start();
    }, [focused, glowAnim]);

    const handleSearch = (text: string) => {
        setQuery(text);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => fetchResults(text), 300);
    };

    const borderColor = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.border, Colors.accent],
    });

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.inputContainer, { borderColor }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Search firearms or calibers..."
                    placeholderTextColor={Colors.textMuted}
                    value={query}
                    onChangeText={handleSearch}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: Spacing.xl,
    },
    inputContainer: {
        backgroundColor: Colors.surface,
        borderRadius: Radii.lg,
        borderWidth: 1.5,
        overflow: 'hidden',
    },
    input: {
        color: Colors.text,
        ...Typography.body,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
    },
});
