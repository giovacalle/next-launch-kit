# Next Base

This is a starter template for [Next.js](https://nextjs.org/) projects with [TypeScript](https://www.typescriptlang.org/).

- 🏁 [Next Base](#next-base)
  - 🛠 [Stack](#stack)
  - 🌱 [Branches](#branches)
  - 🧪 [Usage](#usage)
  - 📚 [Resources](#resources)

## Stack

- Linting / Formatting
  - [eslint](https://www.npmjs.com/package/eslint)
    - [from Next.js](https://nextjs.org/docs/app/building-your-application/configuring/eslint#prettier)
    - [file/folders naming](https://www.npmjs.com/package/eslint-plugin-check-file)
  - [prettier](https://www.npmjs.com/package/prettier)
    - [sort imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports)
    - [sort tailwind css classes](https://www.npmjs.com/package/prettier-plugin-tailwindcss)
  - [commitlint](https://www.npmjs.com/package/commitlint)
    - [husky](https://www.npmjs.com/package/husky)
    - [lint-staged](https://www.npmjs.com/package/lint-staged)
- Styles / UI
  - [tailwind css](https://www.npmjs.com/package/tailwindcss)

## Branches

All branches are derived from the `base` branch: the idea is to divide the various topics by individual branch, and then merge all the features of the other branches into `main`.

- `main`: entire project (you are here 😁)
- `base`: eslint, prettier, commitlint and tailwind-css base settings
- `with-radix/shadcn`: UI components, icons, fonts,

## Usage

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Resources

This project was inspired by:

- [The Net Ninja's "Next.js Crash Course" YouTube video](https://www.youtube.com/watch?v=dLRKV-bajS4&t=2032s)
- [Alan2207's Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react)
