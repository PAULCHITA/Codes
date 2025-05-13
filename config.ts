import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
export const IP_ADDRESS = '192.168.1.16';
export const API_BASE_URL = `http://${IP_ADDRESS}/laundrybest/api`;
//export const API_BASE_URL = '192.168.156.159/laundrybest/api';
 //export const IP_ADDRESS = '192.168.156.159';
//export const IP_ADDRESS = '192.168.1.197';
//export const IP_ADDRESS = '192.168.135.159';
//export const IP_ADDRESS ='192.168.1.22';
// Function to get local IP address
export const getLocalIP = async () => {
  try {
    const savedIp = await AsyncStorage.getItem('local_ip');
    if (!savedIp) {
      return IP_ADDRESS;
    }
    return savedIp;
  } catch (error) {
    console.error('Error getting IP:', error);
    return IP_ADDRESS;
  }
};

// Function to get saved port
export const getLocalPort = async () => {
  try {
    const savedPort = await AsyncStorage.getItem('local_port');
    return savedPort || '80';
  } catch (error) {
    console.error('Error getting port:', error);
    return '80';
  }
};

// Dynamic local API URL
export const getLocalApiUrl = async () => {
  try {
    const ip = await getLocalIP();
    const port = await getLocalPort();
    // Always use port 80 for XAMPP
    const url = `http://${ip}/laundrybest/api`;
    console.log('Generated local API URL:', url);

    // Test the connection immediately
    try {
      const response = await fetch(`${url}/ping.php`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Ping test failed:', response.status);
        throw new Error('Server not responding');
      }

      const text = await response.text();
      if (text !== 'pong') {
        console.error('Invalid ping response:', text);
        throw new Error('Invalid server response');
      }

      console.log('Ping test successful');
      return url;
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error generating API URL:', error);
    throw error;
  }
};

// Connection Settings
export const API_TIMEOUT = 5000;
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;

// API Endpoints
export const API_ENDPOINTS = {
  PING: '/ping.php',
  LOGIN: '/login.php',
  SIGNUP: '/signup.php',
};

// Network Configuration
export const NETWORK_CONFIG = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'cors' as RequestMode,
  credentials: 'same-origin' as RequestCredentials,
  cache: 'no-cache' as RequestCache,
};

// Additional connection options
export const CONNECTION_OPTIONS = {
  ports: [80, 8080, 8081, 3000],
  protocols: ['http', 'https'],
};

// CORS Configuration for PHP
export const PHP_CORS_HEADERS = `
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
`;

// You can add more configuration variables here
// export const SOME_OTHER_CONFIG = 'value';