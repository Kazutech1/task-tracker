import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../constants/theme';

interface Props {
    onPress: () => void;
}

export default function FAB({ onPress }: Props) {
    return (
        <View style={styles.container} pointerEvents="box-none">
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
                activeOpacity={0.8}
                accessibilityLabel="Add task"
                accessibilityRole="button"
            >
                <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 28,
        right: 20,
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.systemBlue,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: Colors.systemBlue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
});
