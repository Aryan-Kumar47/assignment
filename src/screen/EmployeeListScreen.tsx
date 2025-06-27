import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppContext } from '../context/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeAreaLayout from '../components/SafeAreaLayout';

type EmployeeListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Employees'
>;

const EmployeeListScreen = ({ navigation }: EmployeeListScreenProps) => {
  const { colors } = useTheme();
  const { employees } = useAppContext();

  return (
    <SafeAreaLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <FlatList
          data={employees}
          ListHeaderComponent={
            <View className="flex-row items-center p-[10px] text-center gap-x-6 mb-5">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="p-3 border border-gray-300 rounded-full"
              >
                <MaterialCommunityIcons
                  className=""
                  name="arrow-left-top"
                  size={18}
                  color="#1f2937"
                />
              </TouchableOpacity>
              <Text variant="headlineMedium">Employees List</Text>
            </View>
          }
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Text className="text-base text-black text-center">
                No data available
              </Text>
            </View>
          }
          className="px-1"
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={item.name}
                subtitle={item.email}
                left={props => (
                  <Avatar.Image
                    {...props}
                    source={{ uri: item.image }}
                    size={48}
                  />
                )}
              />
            </Card>
          )}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('EmployeeForm')}
          style={styles.addButton}
        >
          Add Employee
        </Button>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  card: {
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    margin: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default EmployeeListScreen;
