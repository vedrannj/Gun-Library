/**
 * Design system tokens for the Gun Library app.
 * All colors, spacing, radii, and typography are defined here.
 */

export const Colors = {
    /** Main background */
    bg: '#0D0D0D',
    /** Card / input surface */
    surface: '#161616',
    /** Elevated surface (hover / active) */
    surfaceLight: '#1F1F1F',
    /** Subtle border */
    border: '#2A2A2A',
    /** Accent border on focus / highlight */
    accentBorder: '#334155',

    /** Primary accent — cool blue */
    accent: '#3B82F6',
    /** Secondary accent — teal */
    accentAlt: '#06B6D4',

    /** Text hierarchy */
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textDim: '#475569',

    /** Status */
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',

    /** Tab bar */
    tabActive: '#3B82F6',
    tabInactive: '#64748B',
    tabBg: '#111111',
    tabBorder: '#1E1E1E',
} as const;

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    xxxl: 40,
} as const;

export const Radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 30,
    hero: 38,
} as const;
