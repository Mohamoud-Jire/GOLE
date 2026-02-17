import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, SIZES } from '../utils/theme';

interface VoteBarProps {
    agreeValues: number;
    disagreeValues: number;
    undecidedValues: number;
}

// Wait, standard Vote Bar for debate usually shows split.
// Better approach: Flex row.
// Agree | Undecided | Disagree
export default function VoteBar({ agreeValues, disagreeValues, undecidedValues }: VoteBarProps) {
    const total = agreeValues + disagreeValues + undecidedValues || 1;

    // We want to animate flex values. Reanimated doesn't support animating flex directly easily on web/native consistently without layout transitions,
    // but width % is safer.

    const agreeW = useSharedValue(0);
    const disagreeW = useSharedValue(0);
    const undecidedW = useSharedValue(0);

    useEffect(() => {
        agreeW.value = withTiming((agreeValues / total) * 100, { duration: 800 });
        disagreeW.value = withTiming((disagreeValues / total) * 100, { duration: 800 });
        undecidedW.value = withTiming((undecidedValues / total) * 100, { duration: 800 });
    }, [agreeValues, disagreeValues, undecidedValues, total]);

    const styleA = useAnimatedStyle(() => ({ width: `${agreeW.value}%` }));
    const styleD = useAnimatedStyle(() => ({ width: `${disagreeW.value}%` }));
    const styleU = useAnimatedStyle(() => ({ width: `${undecidedW.value}%` }));

    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.barPart, { backgroundColor: COLORS.primary }, styleA]} />
                <Animated.View style={[styles.barPart, { backgroundColor: COLORS.text.muted }, styleU]} />
                <Animated.View style={[styles.barPart, { backgroundColor: COLORS.danger }, styleD]} />
            </View>
            <View style={styles.labels}>
                <Text style={[styles.label, { color: COLORS.primary }]}>{agreeValues} Agree</Text>
                <Text style={[styles.label, { color: COLORS.danger }]}>{disagreeValues} Disagree</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: SPACING.md,
    },
    barContainer: {
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.surface,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    barPart: {
        height: '100%',
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.xs,
    },
    label: {
        fontFamily: FONTS.medium,
        fontSize: 12,
    },
    barBackground: { // Unused in Flex version but kept for safety
        height: 10,
        width: '100%',
        backgroundColor: COLORS.surface,
        borderRadius: 5,
    },
    segment: {
        height: '100%',
        borderRadius: 5,
    }
});
