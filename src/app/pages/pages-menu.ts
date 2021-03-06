import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'App Dispatch',
    icon: 'nb-shuffle',
    children: [
      {
        title: 'Overview',
        link: '/pages/appdispatch/overview',
      },
     ],
  },
];
