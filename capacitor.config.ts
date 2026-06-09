import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pt.cav.assistantcoach',
  appName: 'Cav Assistant Coach',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#121212',
      showSpinner: false
    }
  }
};

export default config;
