import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../constants/theme';
import { FilterType } from '../types/task';

interface Props {
    filter: FilterType;
}

const CONFIG: Record<FilterType, { icon: string; title: string; body: string }> = {
    All: {
        icon: 'checkmark.circle',
        title: 'No tasks yet',
        body: 'Tap the + button to add your first task.',
    },
    Active: {
        icon: 'sparkles',
        title: 'All caught up!',
        body: 'You have no active tasks right now.',
    },
    Completed: {
        icon: 'checkmark.seal',
        title: 'Nothing completed yet',
        body: 'Complete a task and it will appear here.',
    },
};

// Map SF Symbol names to Ionicons equivalents
const ICON_MAP: Record<string, string> = {
    'checkmark.circle': 'checkmark-circle-outline',
    sparkles: 'sparkles-outline',
    'checkmark.seal': 'ribbon-outline',
};

export default function EmptyState({ filter }: Props) {
    const cfg = CONFIG[filter];
    const iconName = ICON_MAP[cfg.icon] ?? 'checkmark-circle-outline';

    return (
        <View style={styles.container}>
            <Ionicons
                name={iconName as any}
                size={56}
                color={Colors.systemGray3}
                style={styles.icon}
            />
            <Text style={styles.title}>{cfg.title}</Text>
            <Text style={styles.body}>{cfg.body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 80,
    },
    icon: {
        marginBottom: 16,
    },
    title: {
        ...Typography.title3,
        color: Colors.label,
        textAlign: 'center',
        marginBottom: 8,
    },
    body: {
        ...Typography.subhead,
        color: Colors.secondaryLabel,
        textAlign: 'center',
        lineHeight: 22,
    },
});
