import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

const config: Config = withTV({
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1985A1'
        },
        secondary: {
          DEFAULT: '#4C5C68'
        },
        tertiary: {
          DEFAULT: '#46494C'
        },
        neutral: {
          DEFAULT: '#C5C3C6'
        },
        background: {
          DEFAULT: '#DCDCDD'
        }
      }
    }
  },
  plugins: [
    animate,
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.hide-scrollbar': {
          '-webkit-overflow-scrolling': 'touch',
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none' /* Safari and Chrome */
        }
      };

      addUtilities(newUtilities);
    })
  ]
});

export default config;
