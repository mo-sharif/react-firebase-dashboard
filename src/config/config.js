import getMenuItems from './menuItems'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const config = {
  firebase_config: {
    apiKey: 'AIzaSyAUn28Gaeo7qXlKlmjGz4nFlloycgenXmU',
    authDomain: 'promania-prod.firebaseapp.com',
    databaseURL: 'https://promania-prod.firebaseio.com',
    projectId: 'promania-prod',
    storageBucket: 'promania-prod.appspot.com',
    messagingSenderId: '858526725120'
  },
  firebase_config_dev: {
    apiKey: 'AIzaSyALXYwHOSdRF8YmfHvMxqubwkMgcmfbNuc',
    authDomain: 'promania-dev.firebaseapp.com',
    databaseURL: 'https://promania-dev.firebaseio.com',
    projectId: 'promania-dev',
    storageBucket: 'promania-dev.appspot.com',
    messagingSenderId: '190096122218'
  },
  firebase_providers: [
    'google.com',
    'facebook.com',
    'twitter.com',
    'github.com',
    'password',
    'phone'
  ],
  initial_state: {
    themeSource: {
      isNightModeOn: true,
      source: 'light'
    },
    locale: 'en'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
}

export default config
