import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';

import { COLORS, FONTS, SPACING, SIZES } from '../utils/theme';
import { MOCK_DEBATES, MOCK_COMMENTS } from '../utils/mockData';
import VoteBar from '../components/VoteBar';
import CommentCard from '../components/CommentCard';

type ParamList = {
    Discussion: { debateId: string };
};

export default function Discussion() {
    const route = useRoute<RouteProp<ParamList, 'Discussion'>>();
    const navigation = useNavigation();
    const { debateId } = route.params;

    const debate = MOCK_DEBATES.find(d => d.id === debateId);
    // Filter mock comments for this debate (mock logic)
    const comments = MOCK_COMMENTS.filter(c => c.debate_id === debateId || c.debate_id === '1'); // Fallback to '1' for demo

    const [inputHeight, setInputHeight] = useState(50);
    const [commentText, setCommentText] = useState('');

    if (!debate) {
        return (
            <View style={styles.center}>
                <Text style={{ color: COLORS.text.primary }}>Debate not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color={COLORS.text.primary} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{debate.title}</Text>
            </View>

            <FlatList
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <CommentCard comment={item} />}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View style={styles.debateSummary}>
                        <Text style={styles.title}>{debate.title}</Text>
                        <VoteBar
                            agreeValues={debate.agree_count}
                            disagreeValues={debate.disagree_count}
                            undecidedValues={debate.undecided_count}
                        />
                        <Text style={styles.description}>{debate.description}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.commentsLabel}>Comments ({comments.length})</Text>
                    </View>
                }
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { height: Math.max(50, inputHeight) }]}
                        placeholder="Add to the discussion..."
                        placeholderTextColor={COLORS.text.muted}
                        multiline
                        value={commentText}
                        onChangeText={setCommentText}
                        onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                    />
                    <TouchableOpacity style={styles.sendButton} disabled={!commentText.trim()}>
                        <Send color={commentText.trim() ? COLORS.primary : COLORS.text.muted} size={20} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
        backgroundColor: COLORS.background,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.text.primary,
        flex: 1,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    debateSummary: {
        padding: SPACING.lg,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.text.secondary,
        lineHeight: 22,
        marginVertical: SPACING.sm,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.divider,
        marginVertical: SPACING.md,
    },
    commentsLabel: {
        fontFamily: FONTS.medium,
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.divider,
        backgroundColor: COLORS.card,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        paddingHorizontal: SPACING.md,
        paddingTop: 12,
        paddingBottom: 12,
        color: COLORS.text.primary,
        fontFamily: FONTS.regular,
        fontSize: 15,
        marginRight: SPACING.sm,
        maxHeight: 120,
    },
    sendButton: {
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 24,
    }
});
