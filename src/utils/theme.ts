import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    background: '#0B0F14',
    card: '#121821',
    surface: '#151E29',
    primary: '#00F5D4', // Neon Teal
    secondary: '#00D9FF',
    text: {
        primary: '#E6EDF3',
        secondary: '#9FB3C8',
        muted: '#6B7280',
    },
    divider: '#1F2937',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    shadow: '#00F5D4',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const FONTS = {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
};

export const SIZES = {
    width,
    height,
    cardRadius: 20,
    icon: 24,
};

export const SHADOWS = {
    glow: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
};
