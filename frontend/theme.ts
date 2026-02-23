/**
 * Design system tokens for the Gun Library app.
 * Premium Midnight & Indigo iOS-style Palette.
 */

export const Colors = {
    /** True black background for OLED screens */
    bg: '#000000',
    /** Dark slate/midnight for elevated surfaces */
    surface: '#1C1C1E',
    /** Slightly lighter for deeper elevation */
    surfaceLight: '#2C2C2E',
    /** Primary text (pure white for stark contrast) */
    text: '#FFFFFF',
    /** Secondary text (subtle gray) */
    textMuted: '#8E8E93',
    /** Premium Indigo accent color */
    accent: '#5E5CE6',
    /** Subtle accent for backgrounds/chips */
    accentMuted: 'rgba(94, 92, 230, 0.15)',
    /** Pure Apple-like border color */
    border: '#2C2C2E',

    // Specific category/class colors to make UI pop
    types: {
        assaultRifle: '#FF3B30', // Red
        handgun: '#34C759',      // Green
        sniper: '#FF9F0A',       // Orange
        submachine: '#32ADE6',   // Cyan
        battleRifle: '#AF52DE',  // Purple
        default: '#8E8E93',
    }
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const Radii = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 9999,
};

export const Typography = {
    h1: { fontSize: 34, fontWeight: '800' as const, letterSpacing: 0.5 },
    h2: { fontSize: 28, fontWeight: '700' as const, letterSpacing: 0.3 },
    h3: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    caption: { fontSize: 13, fontWeight: '500' as const },
    pill: { fontSize: 12, fontWeight: '700' as const, letterSpacing: 0.5 },
};
