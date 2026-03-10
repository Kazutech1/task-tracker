import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Colors, Layout, Typography } from '../constants/theme';
import { Task } from '../types/task';

interface Props {
    task: Task;
    onToggle: (id: string) => void;
    onPress: (task: Task) => void;
    isLast?: boolean;
}

export default function TaskRow({ task, onToggle, onPress, isLast }: Props) {
    const scale = useSharedValue(1);
    const checkProgress = useSharedValue(task.completed ? 1 : 0);

    // Sync animation when task.completed changes externally
    React.useEffect(() => {
        checkProgress.value = withTiming(task.completed ? 1 : 0, { duration: 200 });
    }, [task.completed, checkProgress]);

    const handleToggle = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        scale.value = withSpring(0.92, { damping: 10, stiffness: 300 }, () => {
            scale.value = withSpring(1, { damping: 10, stiffness: 300 });
        });
        onToggle(task.id);
    }, [onToggle, task.id, scale]);

    const checkboxAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            checkProgress.value,
            [0, 1],
            ['transparent', Colors.systemBlue],
        ),
        borderColor: interpolateColor(
            checkProgress.value,
            [0, 1],
            [Colors.systemGray3, Colors.systemBlue],
        ),
        transform: [{ scale: scale.value }],
    }));

    const titleAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(task.completed ? 0.38 : 1, { duration: 200 }),
    }));

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(task)}
            style={styles.row}
        >
            {/* Checkbox */}
            <TouchableOpacity onPress={handleToggle} hitSlop={12} style={styles.checkboxHit}>
                <Animated.View style={[styles.checkbox, checkboxAnimatedStyle]}>
                    {task.completed && (
                        <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    )}
                </Animated.View>
            </TouchableOpacity>

            {/* Title */}
            <Animated.Text
                numberOfLines={2}
                style={[
                    styles.title,
                    titleAnimatedStyle,
                    task.completed && styles.titleCompleted,
                ]}
            >
                {task.title}
            </Animated.Text>

            {/* Chevron */}
            <Ionicons
                name="chevron-forward"
                size={17}
                color={Colors.systemGray3}
                style={styles.chevron}
            />

            {/* Bottom separator (omit on last item) */}
            {!isLast && <View style={styles.separator} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.systemBackground,
        paddingHorizontal: Layout.margin,
        paddingVertical: 12,
        minHeight: 44,
    },
    checkboxHit: {
        marginRight: 12,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...Typography.body,
        flex: 1,
        color: Colors.label,
    },
    titleCompleted: {
        textDecorationLine: 'line-through',
        color: Colors.secondaryLabel,
    },
    chevron: {
        marginLeft: 8,
    },
    separator: {
        position: 'absolute',
        bottom: 0,
        left: Layout.margin + 22 + 12, // align with text start
        right: 0,
        height: Layout.separatorHeight,
        backgroundColor: Colors.separator,
    },
});
