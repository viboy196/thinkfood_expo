/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Main: {
        screens: {
          TabHome: {
            screens: {
              TabHome: 'home',
            },
          },
          
          TabNetwork: {
            screens: {
              TabNetwork: 'Network',
            },
          },
          TabPlus: {
            screens: {
              TabPlus: 'plus',
            },
          },
          TabNotification: {
            screens: {
              TabNotification: 'notification',
            },
          },
          TabInfo: {
            screens: {
              TabInfo: 'info',
            },
          },

         
        },
      },
      FoodView:'FoodView',
      PaymentHistory:'PaymentHistory',
      PersoInfo:'PersoInfo',
      ServicePack:'ServicePack'
    },
  },
};

export default linking;
