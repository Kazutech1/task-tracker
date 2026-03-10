import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Layout, Typography } from '../constants/theme';
import { FilterType } from '../types/task';

interface Props {
    active: FilterType;
    onChange: (f: FilterType) => void;
    counts: { all: number; active: number; completed: number };
}

const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'All', label: 'All' },
    { key: 'Active', label: 'Active' },
    { key: 'Completed', label: 'Done' },
];

export default function FilterBar({ active, onChange, counts }: Props) {
    const getCount = (key: FilterType) => {
        if (key === 'All') return counts.all;
        if (key === 'Active') return counts.active;
        return counts.completed;
    };

    return (
        <View style={styles.container}>
            <View style={styles.pill}>
                {FILTERS.map((f, i) => {
                    const isActive = f.key === active;

                    return (
                        <React.Fragment key={f.key}>
                            <TouchableOpacity
                                accessibilityRole="tab"
                                accessibilityState={{ selected: isActive }}
                                onPress={() => onChange(f.key)}
                                style={[
                                    styles.segment,
                                    isActive && styles.segmentActive,
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.label,
                                        isActive ? styles.labelActive : styles.labelInactive,
                                    ]}
                                >
                                    {f.label}
                                </Text>

                                {getCount(f.key) > 0 && (
                                    <View
                                        style={[
                                            styles.badge,
                                            isActive ? styles.badgeActive : styles.badgeInactive,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.badgeText,
                                                {
                                                    color: isActive
                                                        ? Colors.systemBlue
                                                        : Colors.secondaryLabel,
                                                },
                                            ]}
                                        >
                                            {getCount(f.key)}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            {i < FILTERS.length - 1 &&
                                !isActive &&
                                active !== FILTERS[i + 1]?.key && (
                                    <View style={styles.divider} />
                                )}
                        </React.Fragment>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Layout.margin,
        paddingVertical: 10,
        backgroundColor: Colors.groupedBackground,
    },
    pill: {
        flexDirection: 'row',
        backgroundColor: Colors.systemGray5,
        borderRadius: 9,
        padding: 2,
    },
    segment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        gap: 5,
        borderRadius: 7,
    },
    segmentActive: {
        backgroundColor: Colors.systemBackground,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.08,
                shadowRadius: 2,
            },
            android: { elevation: 2 },
        }),
    },
    label: {
        ...Typography.subhead,
        fontWeight: '600',
    },
    labelActive: {
        color: Colors.systemBlue,
    },
    labelInactive: {
        color: Colors.secondaryLabel,
    },
    divider: {
        width: 0.5,
        alignSelf: 'center',
        height: 16,
        backgroundColor: Colors.separator,
    },
    badge: {
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 1,
        minWidth: 18,
        alignItems: 'center',
    },
    badgeActive: {
        backgroundColor: Colors.systemBlue + '1A',
    },
    badgeInactive: {
        backgroundColor: Colors.systemGray4,
    },
    badgeText: {
        ...Typography.caption1,
        fontWeight: '600',
    },
});
