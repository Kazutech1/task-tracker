import { Stack } from 'expo-router';
import { Colors } from '../constants/theme';
import { TaskProvider } from '../context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerStyle: { backgroundColor: Colors.groupedBackground },
          headerLargeTitleStyle: { color: Colors.label },
          headerTitleStyle: { color: Colors.label },
          contentStyle: { backgroundColor: Colors.groupedBackground },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Tasks' }}
        />
        <Stack.Screen
          name="add-task"
          options={{
            title: 'New Task',
            presentation: 'formSheet',
            headerLargeTitle: false,
            headerStyle: { backgroundColor: Colors.systemBackground },
            contentStyle: { backgroundColor: Colors.systemBackground },
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name="task/[id]"
          options={{
            title: 'Task',
            headerLargeTitle: false,
            headerStyle: { backgroundColor: Colors.groupedBackground },
            contentStyle: { backgroundColor: Colors.groupedBackground },
          }}
        />
      </Stack>
    </TaskProvider>
  );
}
