/**
 * Design system matching web app
 * Primary color: #0070f3 (blue)
 * Hover color: #005bb5 (darker blue)
 * Background: white (#fff) and light gray (#f5f5f5)
 */

import { Platform } from 'react-native';

// Web app primary color
const primaryColor = '#0070f3';
const primaryHover = '#005bb5';
const lightGray = '#f5f5f5';
const borderColor = '#ddd';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundSecondary: lightGray,
    tint: primaryColor,
    tintHover: primaryHover,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryColor,
    border: borderColor,
    primary: primaryColor,
    primaryHover: primaryHover,
    cardBackground: '#fff',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    backgroundSecondary: '#1D3D47',
    tint: '#fff',
    tintHover: primaryColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    border: '#333',
    primary: primaryColor,
    primaryHover: primaryHover,
    cardBackground: '#1f1f1f',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
