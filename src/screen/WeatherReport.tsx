import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeAreaLayout from '../components/SafeAreaLayout';
import { showToast } from '../utlis/toast';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
}

interface WeatherApiResponse {
  name: string;
  weather: Weather[];
  main: Main;
}

type WeatherReportScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherReport'
>;

const WeatherReport = ({ navigation }: WeatherReportScreenProps) => {
  const [city, setCity] = useState<string>('Gurugram');
  const { colors } = useTheme();

  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      if (!city) {
        showToast({
          type: 'error',
          title: 'Empty Field',
          message: 'Please enter city',
        });
        return;
      }
      const response = await axios.get<WeatherApiResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <SafeAreaLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View className="flex-row items-center p-[10px] text-center gap-x-6">
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
          <Text variant="headlineMedium">Weather Report</Text>
        </View>
        <ScrollView>
          <View className="flex-1 mt-5">
            <TextInput
              label="City"
              mode="outlined"
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />
            {loading ? (
              <ActivityIndicator
                animating={true}
                size="small"
                style={{ marginTop: 40 }}
              />
            ) : weatherData ? (
              <Card style={styles.card}>
                <Card.Title
                  title={weatherData.name}
                  subtitle={weatherData.weather[0].main}
                />
                <Card.Content style={{ marginBottom: 10 }}>
                  <Text variant="headlineSmall">{weatherData.main.temp}°C</Text>
                  <Text style={{ textTransform: 'capitalize' }}>
                    {weatherData.weather[0].description}
                  </Text>
                </Card.Content>
                <Card.Cover
                  style={{ backgroundColor: '#eee' }}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                  }}
                />
              </Card>
            ) : (
              <Text style={styles.error}>Unable to fetch weather data</Text>
            )}
          </View>
        </ScrollView>

        <Button mode="contained" onPress={fetchWeather} style={styles.button}>
          Get Weather
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
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 5,
  },
  card: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default WeatherReport;
