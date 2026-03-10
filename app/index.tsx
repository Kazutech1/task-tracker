import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import FAB from '../components/FAB';
import FilterBar from '../components/FilterBar';
import TaskRow from '../components/TaskRow';
import { Colors, Layout } from '../constants/theme';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';

export default function TaskListScreen() {
  const router = useRouter();
  const { filteredTasks, counts, filter, setFilter, toggleTask, isLoaded } =
    useTaskContext();

  const handlePressTask = (task: Task) => {
    router.push({ pathname: '/task/[id]', params: { id: task.id } });
  };

  if (!isLoaded) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <FilterBar active={filter} onChange={setFilter} counts={counts} />
        }
        stickyHeaderIndices={[0]}
        ListEmptyComponent={<EmptyState filter={filter} />}
        contentContainerStyle={[
          styles.listContent,
          filteredTasks.length === 0 && styles.listContentEmpty,
        ]}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.rowWrapper,
              index === 0 && styles.rowWrapperFirst,
              index === filteredTasks.length - 1 && styles.rowWrapperLast,
            ]}
          >
            <TaskRow
              task={item}
              onToggle={toggleTask}
              onPress={handlePressTask}
              isLast={index === filteredTasks.length - 1}
            />
          </View>
        )}
      />
      <FAB onPress={() => router.push('/add-task')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.groupedBackground,
  },
  listContent: {
    paddingHorizontal: Layout.margin,
    paddingBottom: 100,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  rowWrapper: {
    backgroundColor: Colors.systemBackground,
    overflow: 'hidden',
  },
  rowWrapperFirst: {
    borderTopLeftRadius: Layout.cornerRadius,
    borderTopRightRadius: Layout.cornerRadius,
    marginTop: 8,
  },
  rowWrapperLast: {
    borderBottomLeftRadius: Layout.cornerRadius,
    borderBottomRightRadius: Layout.cornerRadius,
    marginBottom: 8,
  },
});
