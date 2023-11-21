import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Frontend',
  webDir: 'dist/frontend',
  server: {
    androidScheme: 'http'
  }
};

export default config;
