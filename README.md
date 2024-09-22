# Next launch kit

This is a GitHub template that aims to be a sort of 'blueprint' with Next.js, Typescript and other super cool technologies!
We're not superheroes, so we make mistakes! If you find any issues in this template, feel free to submit a pull request or open an issue.
We prefer to keep this project simple with certain packages/features, so any new feature requests will be discussed first.

## Table of contents

- 🏁 [Next launch kit](#title)
  - 🛠 [Stack](#stack)
  - 🌱 [Branches](#branches)
    - 🌟 [More about this branch](#more-about-this-branch)
  - 🧪 [Usage](#usage)

## Stack

- Tailwind/CSS utilities
  - [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
  - [tailwind-variants](https://www.npmjs.com/package/tailwind-variants)
  - [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate)
  - [clsx](https://www.npmjs.com/package/clsx)
- Components
  - [radix-ui](https://www.radix-ui.com/primitives)
  - [shadcn](https://ui.shadcn.com/docs/components/accordion)
- Icons
  - [iconify](https://www.npmjs.com/package/@iconify/react)
- Fonts
  - [next-font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## Branches

All branches are derived from the `base` branch: the idea is to divide the various topics by individual branch, and then merge all the features of the other branches into `main`.

Right now you are in `with-radix/shadcn`: UI components, icons, fonts

## More about this branch

Here we extends tailwind configuration with a random palette generator (thanks to [coolors.co](https://coolors.co/visualizer/dcdcdd-c5c3c6-46494c-4c5c68-1985a1) ✨), and add 2 utilities: `tailwind-animate` (for animations) and a custom one to hide scrollbars.
In addition, we wrap the configuration with `tailwind-variants/transformer` because we want to use the superpowers of `tailwind-variants` that allow us to define responsive variants (based on tailwind breakpoints).

We also replace `lucide-react` (that comes with `shadcn` components) with `@iconify/react`, because we like the multi-repos approach of `iconify` and its implementation of icons.

#### Why we are using `tailwind-variants` ?

`tailwind-variants` is a plugin built on top of `class-variance-authority` and provides some features like:

- [slots](https://www.tailwind-variants.org/docs/slots)
- [responsive variants](https://www.tailwind-variants.org/docs/variants#responsive-variants)

So, when we import `shadcn`components, we replaced the default `class-variance-authority` with `tailwind-variants`.

#### Why not use `shadcn CLI` ?

We are aware of fantastic [shadcn CLI](https://ui.shadcn.com/docs/cli) that generates all the components and blocks for us, but we want to keep the implementation more flexible and modular, without all the boilerplate code.

## Usage

1. Click `use this template`, then `create a new repository`, and clone it to your local machine
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
