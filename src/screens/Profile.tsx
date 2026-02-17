import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS, SPACING, SIZES } from '../utils/theme';
import NeoButton from '../components/NeoButton';
import { Award, MessageSquare, Zap } from 'lucide-react-native';

export default function Profile() {
    const { user, signOut } = useAuth();

    // Mock Stats
    const stats = {
        reputation: user?.user_metadata?.reputation_score || 42,
        debates: 5,
        comments: 24,
        streak: user?.user_metadata?.streak_count || 3,
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity onPress={signOut}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.username}>{user?.user_metadata?.username || 'User'}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Award color={COLORS.primary} size={24} />
                        <Text style={styles.statValue}>{stats.reputation}</Text>
                        <Text style={styles.statLabel}>Reputation</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Zap color={COLORS.warning} size={24} />
                        <Text style={styles.statValue}>{stats.streak}</Text>
                        <Text style={styles.statLabel}>Streak</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MessageSquare color={COLORS.secondary} size={24} />
                        <Text style={styles.statValue}>{stats.debates}</Text>
                        <Text style={styles.statLabel}>Debates</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <Text style={styles.emptyText}>No recent activity</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.primary,
    },
    logoutText: {
        color: COLORS.danger,
        fontFamily: FONTS.medium,
        fontSize: 16,
    },
    content: {
        padding: SPACING.lg,
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.card,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    avatarText: {
        fontFamily: FONTS.bold,
        fontSize: 32,
        color: COLORS.primary,
    },
    username: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    email: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.text.secondary,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: SIZES.cardRadius,
        padding: SPACING.md,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: COLORS.surface,
    },
    statValue: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.text.primary,
        marginTop: SPACING.xs,
    },
    statLabel: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.text.secondary,
    },
    section: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
    emptyText: {
        color: COLORS.text.muted,
        fontFamily: FONTS.regular,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: SPACING.md,
    }
});
