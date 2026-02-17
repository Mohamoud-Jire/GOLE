import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { COLORS, FONTS, SPACING, SIZES } from '../utils/theme';

interface NeoInputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export default function NeoInput({
    label,
    error,
    containerStyle,
    style,
    ...props
}: NeoInputProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.text.muted}
                    selectionColor={COLORS.primary}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    label: {
        fontFamily: FONTS.medium,
        color: COLORS.text.secondary,
        marginBottom: SPACING.xs,
        fontSize: 14,
    },
    inputContainer: {
        backgroundColor: COLORS.card,
        borderRadius: SIZES.cardRadius,
        borderWidth: 1,
        borderColor: COLORS.divider,
        height: 50,
        justifyContent: 'center',
    },
    input: {
        fontFamily: FONTS.regular,
        color: COLORS.text.primary,
        paddingHorizontal: SPACING.md,
        fontSize: 16,
        height: '100%',
    },
    errorBorder: {
        borderColor: COLORS.danger,
    },
    errorText: {
        color: COLORS.danger,
        fontFamily: FONTS.regular,
        fontSize: 12,
        marginTop: SPACING.xs,
    },
});
