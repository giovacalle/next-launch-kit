# Next launch kit

This is a GitHub template that aims to be a sort of 'blueprint' with Next.js, Typescript and other super cool technologies!
We're not superheroes, so we make mistakes! If you find any issues in this template, feel free to submit a pull request or open an issue.
We prefer to keep this project simple with certain packages/features, so any new feature requests will be discussed first.

- 🏁 [Next launch kit](#title)
  - 🛠 [Stack](#stack)
  - 🌱 [Branches](#branches)
  - 🧪 [Usage](#usage)

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

Right now you are in `base`: eslint, prettier, commitlint and tailwind-css base settings

## Usage

1. Click `use this template`, then `create a new repository`, and clone it to your local machine
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
