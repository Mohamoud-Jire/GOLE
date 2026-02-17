import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../../services/supabase';
import { COLORS, FONTS, SPACING } from '../../utils/theme';
import NeoInput from '../../components/NeoInput';
import NeoButton from '../../components/NeoButton';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleSignUp = async () => {
        if (!email || !password || !username) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        // 1. Sign up user
        const { data: { session, user }, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username, // Store username in auth metadata as well
                },
            },
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        // 2. Insert into users table
        if (user) {
            const { error: profileError } = await supabase
                .from('users')
                .insert([
                    {
                        id: user.id,
                        username: username,
                        reputation_score: 0,
                        streak_count: 0,
                    },
                ]);

            if (profileError) {
                console.error('Error creating user profile:', profileError);
                // We don't block the UI here, but user profile might be missing.
                // Alert.alert('Warning', 'Account created but profile setup failed.');
            }
        }

        setLoading(false);
        // Auto login usually happens, or check for email confirmation
        if (session) {
            // success
        } else {
            Alert.alert('Success', 'Please check your email for confirmation link.');
            navigation.goBack();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Join GOLE</Text>
                <Text style={styles.subtitle}>Create your secure identity.</Text>

                <View style={styles.form}>
                    <NeoInput
                        label="Username"
                        placeholder="Choose a username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <NeoInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <NeoInput
                        label="Password"
                        placeholder="Choose a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <NeoButton
                        title="Sign Up"
                        onPress={handleSignUp}
                        loading={loading}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 32,
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.text.secondary,
        marginBottom: SPACING.xxl,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: SPACING.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.lg,
    },
    footerText: {
        color: COLORS.text.secondary,
        fontFamily: FONTS.regular,
    },
    link: {
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
});
