import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Comment } from '../types';
import { COLORS, FONTS, SPACING, SIZES } from '../utils/theme';
import { Flag, MessageCircle, ThumbsUp } from 'lucide-react-native';

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{comment.user?.username || 'Anonymous'}</Text>
                    <View style={styles.reputationBadge}>
                        <Text style={styles.reputationText}>{comment.user?.reputation_score || 0}</Text>
                    </View>
                </View>
                <Text style={styles.timestamp}>1h ago</Text>
            </View>

            <Text style={styles.content}>{comment.content}</Text>

            <View style={styles.footer}>
                <View style={styles.actions}>
                    <View style={styles.actionItem}>
                        <ThumbsUp size={14} color={COLORS.text.secondary} />
                        <Text style={styles.actionText}>Like</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <MessageCircle size={14} color={COLORS.text.secondary} />
                        <Text style={styles.actionText}>Reply</Text>
                    </View>
                </View>

                <Flag size={14} color={COLORS.text.muted} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
        backgroundColor: COLORS.card,
        marginBottom: SPACING.xs,
        borderRadius: SIZES.cardRadius,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
        alignItems: 'center',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        fontSize: 14,
        marginRight: SPACING.sm,
    },
    reputationBadge: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    reputationText: {
        fontFamily: FONTS.medium,
        fontSize: 10,
        color: COLORS.secondary,
    },
    timestamp: {
        color: COLORS.text.muted,
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    content: {
        fontFamily: FONTS.regular,
        color: COLORS.text.primary,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: SPACING.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.xs,
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.lg,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        color: COLORS.text.secondary,
        fontSize: 12,
        fontFamily: FONTS.medium,
    }
});
