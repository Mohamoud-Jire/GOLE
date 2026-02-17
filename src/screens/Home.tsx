import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, StatusBar, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, SIZES, FONTS } from '../utils/theme';
import DebateCard from '../components/DebateCard';
import { MOCK_DEBATES } from '../utils/mockData';
import { Debate } from '../types';
import NeoButton from '../components/NeoButton';

const CARD_WIDTH = SIZES.width * 0.85;
const SPACING_card = SPACING.md;
const SNAP_INTERVAL = CARD_WIDTH + SPACING_card;

export default function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [debates, setDebates] = useState<Debate[]>(MOCK_DEBATES);

    const handleDebatePress = (debate: Debate) => {
        navigation.navigate('Discussion', { debateId: debate.id });
    };

    const renderItem = ({ item }: { item: Debate }) => (
        <View style={{ marginRight: SPACING_card }}>
            <DebateCard
                debate={item}
                onPress={() => handleDebatePress(item)}
                width={CARD_WIDTH}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GOLE</Text>
                <Text style={styles.headerSubtitle}>Council Chamber</Text>
            </View>

            <FlatList
                data={debates}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                snapToInterval={SNAP_INTERVAL}
                snapToAlignment="center"
                decelerationRate="fast"
                pagingEnabled={false}
                // Infinite scroll simulation
                onEndReached={() => {
                    // Load more logic would go here
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.lg,
    },
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 28,
        color: COLORS.primary,
        letterSpacing: 1,
    },
    headerSubtitle: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.text.secondary,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    listContent: {
        paddingHorizontal: (SIZES.width - CARD_WIDTH) / 2, // Center the first card
        paddingBottom: SPACING.xl,
        alignItems: 'center', // Vertical alignment
    },
});
