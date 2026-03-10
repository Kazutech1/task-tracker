import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Layout, Typography } from '../../constants/theme';
import { useTaskContext } from '../../context/TaskContext';

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { tasks, updateTask, deleteTask, toggleTask } = useTaskContext();

    // Always search the raw (unfiltered) list so detail works with any filter active
    const task = tasks.find((t) => t.id === id);

    const [title, setTitle] = useState(task?.title ?? '');
    const [hasEdited, setHasEdited] = useState(false);
    const [error, setError] = useState('');

    if (!task) {
        // Task deleted from elsewhere; go back gracefully
        router.back();
        return null;
    }

    const handleSave = () => {
        if (!title.trim()) {
            setError('Task name cannot be empty.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }
        const ok = updateTask(id, title.trim());
        if (ok) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.back();
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task? This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        deleteTask(id);
                        router.back();
                    },
                },
            ],
        );
    };

    const handleToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleTask(id);
    };

    const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            {/* Task name */}
            <Text style={styles.sectionHeader}>TASK NAME</Text>
            <View style={styles.card}>
                <TextInput
                    style={[
                        styles.titleInput,
                        task.completed && styles.titleInputCompleted,
                    ]}
                    value={title}
                    onChangeText={(t) => {
                        setTitle(t);
                        setHasEdited(true);
                        if (error) setError('');
                    }}
                    placeholder="Task name"
                    placeholderTextColor={Colors.placeholderText}
                    returnKeyType="done"
                    multiline
                    maxLength={200}
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Status */}
            <Text style={styles.sectionHeader}>STATUS</Text>
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.statusRow}
                    onPress={handleToggle}
                    activeOpacity={0.7}
                >
                    <Text style={styles.statusLabel}>Mark as completed</Text>
                    <View
                        style={[
                            styles.statusIndicator,
                            task.completed && styles.statusIndicatorActive,
                        ]}
                    >
                        {task.completed && <Text style={styles.statusCheck}>✓</Text>}
                    </View>
                </TouchableOpacity>
            </View>

            {/* Created at */}
            <Text style={styles.sectionHeader}>CREATED</Text>
            <View style={styles.card}>
                <Text style={styles.createdText}>{createdDate}</Text>
            </View>

            {/* Save */}
            {hasEdited && (
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            )}

            {/* Delete */}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                activeOpacity={0.8}
            >
                <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: Colors.groupedBackground,
    },
    content: {
        paddingHorizontal: Layout.margin,
        paddingBottom: 48,
        paddingTop: 8,
    },
    sectionHeader: {
        ...Typography.footnote,
        fontWeight: '600',
        color: Colors.secondaryLabel,
        marginTop: 24,
        marginBottom: 6,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: Colors.systemBackground,
        borderRadius: Layout.cornerRadius,
        paddingHorizontal: Layout.margin,
        paddingVertical: 14,
    },
    titleInput: {
        ...Typography.body,
        color: Colors.label,
        minHeight: 28,
    },
    titleInputCompleted: {
        color: Colors.secondaryLabel,
        textDecorationLine: 'line-through',
    },
    errorText: {
        ...Typography.footnote,
        color: Colors.systemRed,
        marginTop: 6,
        marginLeft: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusLabel: {
        ...Typography.body,
        color: Colors.label,
    },
    statusIndicator: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: Colors.systemGray3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    statusIndicatorActive: {
        backgroundColor: Colors.systemBlue,
        borderColor: Colors.systemBlue,
    },
    statusCheck: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
    createdText: {
        ...Typography.callout,
        color: Colors.secondaryLabel,
    },
    saveButton: {
        marginTop: 32,
        backgroundColor: Colors.systemBlue,
        borderRadius: Layout.cornerRadius,
        paddingVertical: 14,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: Colors.systemBlue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: { elevation: 4 },
        }),
    },
    saveButtonText: {
        ...Typography.headline,
        color: '#FFFFFF',
    },
    deleteButton: {
        marginTop: 12,
        backgroundColor: Colors.systemBackground,
        borderRadius: Layout.cornerRadius,
        paddingVertical: 14,
        alignItems: 'center',
    },
    deleteButtonText: {
        ...Typography.headline,
        color: Colors.systemRed,
    },
});
