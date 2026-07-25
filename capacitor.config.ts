import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sputnikworkshop.countergel',
  appName: 'Countergel',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
