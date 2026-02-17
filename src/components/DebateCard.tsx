import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Debate } from '../types';
import { COLORS, FONTS, SPACING, SIZES, SHADOWS } from '../utils/theme';
import VoteBar from './VoteBar';
import * as Haptics from 'expo-haptics';
import { MessageSquare } from 'lucide-react-native';

interface DebateCardProps {
    debate: Debate;
    onPress: () => void;
    width?: number; // For Horizontal Scroll sizing
}

export default function DebateCard({ debate, onPress, width }: DebateCardProps) {
    const containerWidth = width || SIZES.width - SPACING.lg * 2;

    const handleVote = (type: 'agree' | 'disagree' | 'undecided') => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // TODO: Implement vote logic
        console.log('Voted:', type);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.card, { width: containerWidth }]}
        >
            <View style={styles.header}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{debate.category}</Text>
                </View>
                <Text style={styles.timestamp}>2h ago</Text>
            </View>

            <Text style={styles.title} numberOfLines={2}>{debate.title}</Text>
            <Text style={styles.description} numberOfLines={4}>{debate.description}</Text>

            <VoteBar
                agreeValues={debate.agree_count}
                disagreeValues={debate.disagree_count}
                undecidedValues={debate.undecided_count}
            />

            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionButton, styles.agreeButton]} onPress={() => handleVote('agree')}>
                    <Text style={styles.actionText}>Agree</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.undecidedButton]} onPress={() => handleVote('undecided')}>
                    <Text style={styles.actionText}>Undecided</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.disagreeButton]} onPress={() => handleVote('disagree')}>
                    <Text style={styles.actionText}>Disagree</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <View style={styles.stat}>
                    <MessageSquare size={16} color={COLORS.text.secondary} />
                    <Text style={styles.statText}>24 comments</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.card,
        borderRadius: SIZES.cardRadius,
        padding: SPACING.lg,
        marginRight: SPACING.md,
        ...SHADOWS.card,
        borderWidth: 1,
        borderColor: COLORS.surface,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    categoryBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    categoryText: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        fontSize: 10,
        textTransform: 'uppercase',
    },
    timestamp: {
        color: COLORS.text.secondary,
        fontFamily: FONTS.regular,
        fontSize: 12,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 22,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
        lineHeight: 28,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.text.secondary,
        lineHeight: 24,
        marginBottom: SPACING.md,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.sm,
    },
    actionButton: {
        flex: 1,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.cardRadius,
        borderWidth: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    agreeButton: {
        borderColor: COLORS.primary,
    },
    disagreeButton: {
        borderColor: COLORS.danger,
    },
    undecidedButton: {
        borderColor: COLORS.text.muted,
    },
    actionText: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.text.primary,
    },
    footer: {
        marginTop: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        color: COLORS.text.secondary,
        fontFamily: FONTS.regular,
        fontSize: 12,
    }
});
