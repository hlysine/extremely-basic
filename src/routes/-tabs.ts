import {
  FaCalculator,
  FaBookMedical,
  FaSyringe,
  FaSearch,
  FaCog,
  FaBolt,
  FaHeartbeat,
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export enum TabKeys {
  Calculators = '/calc',
  Conditions = '/conditions',
  Treatments = '/treatments',
  Search = '/search',
  Settings = '/settings',
}

export interface Tab {
  name: string;
  icon: IconType;
  to: string;
  dock: boolean;
}

export const tabs: Tab[] = [
  {
    name: 'Calculators',
    icon: FaCalculator,
    to: TabKeys.Calculators,
    dock: true,
  },
  {
    name: 'Conditions',
    icon: FaBookMedical,
    to: TabKeys.Conditions,
    dock: true,
  },
  {
    name: 'Treatments',
    icon: FaSyringe,
    to: TabKeys.Treatments,
    dock: true,
  },
  {
    name: 'Search',
    icon: FaSearch,
    to: TabKeys.Search,
    dock: true,
  },
  {
    name: 'Settings',
    icon: FaCog,
    to: TabKeys.Settings,
    dock: false,
  },
] as const;

export const pinnedTabs: Tab[] = [
  {
    name: 'Epinephrine',
    icon: FaSyringe,
    to: '/treatments/epinephrine',
    dock: false,
  },
  {
    name: 'Cardiac Arrest',
    icon: FaHeartbeat,
    to: '/conditions/in-hospital-cardiocerebral-resuscitation',
    dock: false,
  },
  {
    name: 'Cardioversion / defibrillation',
    icon: FaBolt,
    to: '/treatments/cardioversion-defibrillation',
    dock: false,
  },
];

export const dockTabs = tabs.filter(tab => tab.dock);
