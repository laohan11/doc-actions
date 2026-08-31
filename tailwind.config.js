import typography from '@tailwindcss/typography'

/**
 * 颜色 / 圆角 / 阴影按 Material 3 设计令牌命名，取自 M3 基线（Baseline）浅色主题
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{vue,js,md}'],
  theme: {
    extend: {
      colors: {
        m3: {
          primary: '#6750a4',
          'on-primary': '#ffffff',
          'primary-container': '#eaddff',
          'on-primary-container': '#21005d',
          'secondary-container': '#e8def8',
          'on-secondary-container': '#1d192b',
          // 背景层级：数字越大层级越高、颜色越深
          surface: '#fef7ff',
          'surface-container-lowest': '#ffffff',
          'surface-container-low': '#f7f2fa',
          'surface-container': '#f3edf7',
          'surface-container-high': '#ece6f0',
          'on-surface': '#1d1b20',
          'on-surface-variant': '#49454f',
          outline: '#79747e',
          'outline-variant': '#cac4d0',
        },
      },
      // M3 形状比例
      borderRadius: {
        'm3-xs': '4px',
        'm3-sm': '8px',
        'm3-md': '12px',
        'm3-lg': '16px',
        'm3-xl': '28px',
      },
      // M3 高度（elevation）级别
      boxShadow: {
        'm3-1': '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 1px rgb(0 0 0 / 0.15)',
        'm3-2': '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 2px 6px 2px rgb(0 0 0 / 0.15)',
        'm3-3': '0 4px 8px 3px rgb(0 0 0 / 0.15), 0 1px 3px 0 rgb(0 0 0 / 0.3)',
      },
      // M3 标准动效曲线
      transitionTimingFunction: {
        m3: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  // 提供 prose 系列类，用于排版 Markdown 正文
  plugins: [typography],
}
