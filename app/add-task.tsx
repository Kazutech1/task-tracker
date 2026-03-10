import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Layout, Typography } from '../constants/theme';
import { useTaskContext } from '../context/TaskContext';

export default function AddTaskScreen() {
    const router = useRouter();
    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<TextInput>(null);

    const handleAdd = () => {
        if (!title.trim()) {
            setError('Task name cannot be empty.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        addTask(title.trim());
        router.back();
    };

    const handleCancel = () => {
        Keyboard.dismiss();
        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Cancel / Add buttons in header area */}
                <View style={styles.navRow}>
                    <TouchableOpacity onPress={handleCancel} hitSlop={8}>
                        <Text style={styles.navCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>New Task</Text>
                    <TouchableOpacity onPress={handleAdd} hitSlop={8}>
                        <Text style={[styles.navAdd, !title.trim() && styles.navAddDisabled]}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Input card */}
                <View style={styles.card}>
                    <TextInput
                        ref={inputRef}
                        autoFocus
                        style={styles.input}
                        placeholder="Task name"
                        placeholderTextColor={Colors.placeholderText}
                        value={title}
                        onChangeText={(t) => {
                            setTitle(t);
                            if (error) setError('');
                        }}
                        returnKeyType="done"
                        onSubmitEditing={handleAdd}
                        maxLength={200}
                    />
                </View>

                {/* Inline error */}
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}

                {/* Character hint */}
                <Text style={styles.hint}>
                    {title.length > 0 ? `${title.length}/200 characters` : ''}
                </Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.systemBackground,
    },
    container: {
        flex: 1,
        paddingTop: 8,
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Layout.margin,
        paddingVertical: 12,
        borderBottomWidth: Layout.separatorHeight,
        borderBottomColor: Colors.separator,
    },
    navTitle: {
        ...Typography.headline,
        color: Colors.label,
    },
    navCancel: {
        ...Typography.body,
        color: Colors.systemBlue,
    },
    navAdd: {
        ...Typography.headline,
        color: Colors.systemBlue,
    },
    navAddDisabled: {
        opacity: 0.35,
    },
    card: {
        marginHorizontal: Layout.margin,
        marginTop: 24,
        backgroundColor: Colors.secondarySystemBackground,
        borderRadius: Layout.cornerRadius,
        paddingHorizontal: Layout.margin,
        paddingVertical: 14,
    },
    input: {
        ...Typography.body,
        color: Colors.label,
        minHeight: 28,
    },
    errorText: {
        ...Typography.footnote,
        color: Colors.systemRed,
        marginTop: 8,
        marginHorizontal: Layout.margin + 4,
    },
    hint: {
        ...Typography.caption1,
        color: Colors.tertiaryLabel,
        marginTop: 6,
        marginHorizontal: Layout.margin + 4,
    },
});
