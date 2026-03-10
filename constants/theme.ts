import { Platform } from 'react-native';

// Apple HIG semantic color tokens
export const Colors = {
    // Backgrounds
    systemBackground: '#FFFFFF',
    secondarySystemBackground: '#F2F2F7',
    tertiarySystemBackground: '#FFFFFF',
    groupedBackground: '#F2F2F7',

    // Labels
    label: '#000000',
    secondaryLabel: '#3C3C43',
    tertiaryLabel: '#3C3C4399',
    placeholderText: '#3C3C4399',

    // Fills
    systemFill: '#78788033',
    secondarySystemFill: '#78788028',

    // Separators
    separator: '#3C3C4349',
    opaqueSeparator: '#C6C6C8',

    // Accents
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemRed: '#FF3B30',
    systemOrange: '#FF9500',
    systemGray: '#8E8E93',
    systemGray2: '#AEAEB2',
    systemGray3: '#C7C7CC',
    systemGray4: '#D1D1D6',
    systemGray5: '#E5E5EA',
    systemGray6: '#F2F2F7',
} as const;

// Apple HIG typography scale (SF Pro sizes)
export const Typography = {
    largeTitle: { fontSize: 34, fontWeight: '700' as const, letterSpacing: 0.37 },
    title1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: 0.36 },
    title2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: 0.35 },
    title3: { fontSize: 20, fontWeight: '600' as const, letterSpacing: 0.38 },
    headline: { fontSize: 17, fontWeight: '600' as const, letterSpacing: -0.41 },
    body: { fontSize: 17, fontWeight: '400' as const, letterSpacing: -0.41 },
    callout: { fontSize: 16, fontWeight: '400' as const, letterSpacing: -0.32 },
    subhead: { fontSize: 15, fontWeight: '400' as const, letterSpacing: -0.24 },
    footnote: { fontSize: 13, fontWeight: '400' as const, letterSpacing: -0.08 },
    caption1: { fontSize: 12, fontWeight: '400' as const, letterSpacing: 0 },
    caption2: { fontSize: 11, fontWeight: '400' as const, letterSpacing: 0.07 },
} as const;

// Font family — respects SF Pro on iOS, falls back to system font on Android/web
export const fontFamily = Platform.select({
    ios: undefined, // undefined uses SF Pro automatically
    default: undefined,
});

// Layout constants
export const Layout = {
    margin: 16,
    smallMargin: 8,
    cornerRadius: 10,
    smallCornerRadius: 6,
    separatorHeight: 0.5,
} as const;
