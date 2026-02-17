import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, SIZES, SHADOWS } from '../utils/theme';
import NeoButton from '../components/NeoButton';
import NeoInput from '../components/NeoInput';

const CATEGORIES = ['Economics', 'Society', 'Technology', 'Science', 'Politics', 'Philosophy'];

export default function Create() {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Debate created successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
            // Reset form
            setTitle('');
            setDescription('');
            setCategory(CATEGORIES[0]);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Create Debate</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.label}>Category</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryPill,
                                    category === cat && styles.activeCategoryPill
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    category === cat && styles.activeCategoryText
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <NeoInput
                        label="Title"
                        placeholder="e.g. Universal Basic Income is Necessary"
                        value={title}
                        onChangeText={setTitle}
                        maxLength={100}
                    />

                    <Text style={styles.label}>Description ({description.length}/500)</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Elaborate on your stance..."
                            placeholderTextColor={COLORS.text.muted}
                            multiline
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                            maxLength={500}
                        />
                    </View>

                    <NeoButton
                        title="Submit Debate"
                        onPress={handleSubmit}
                        loading={loading}
                        style={styles.submitButton}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.primary,
    },
    content: {
        padding: SPACING.lg,
    },
    label: {
        fontFamily: FONTS.medium,
        color: COLORS.text.secondary,
        marginBottom: SPACING.sm,
        marginTop: SPACING.md,
    },
    categoryScroll: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
        maxHeight: 40,
    },
    categoryPill: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.surface,
        backgroundColor: COLORS.card,
        marginRight: SPACING.sm,
    },
    activeCategoryPill: {
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(0, 245, 212, 0.1)',
        ...SHADOWS.glow,
    },
    categoryText: {
        color: COLORS.text.secondary,
        fontFamily: FONTS.medium,
        fontSize: 12,
    },
    activeCategoryText: {
        color: COLORS.primary,
    },
    textAreaContainer: {
        backgroundColor: COLORS.card,
        borderRadius: SIZES.cardRadius,
        borderWidth: 1,
        borderColor: COLORS.divider,
        padding: SPACING.md,
        height: 200,
    },
    textArea: {
        flex: 1,
        color: COLORS.text.primary,
        fontFamily: FONTS.regular,
        fontSize: 16,
    },
    submitButton: {
        marginTop: SPACING.xl,
    }
});
