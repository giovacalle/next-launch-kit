# 🏁 Next launch kit

This is a GitHub template that aims to be a sort of "blueprint" with Next.js, Typescript and other super cool technologies!
We're not superheroes, so we make mistakes! If you find any issues in this template, feel free to submit a pull request or open an issue.
We prefer to keep this project simple with certain packages/features, so any new feature requests will be discussed first.

## Table of contents

- 🏁 [Next launch kit](#🏁-next-launch-kit)
  - 🛠 [Stack](#🛠-stack)
  - 🤓 [More about](#🤓-more-about)
  - 🧪 [Usage](#🧪-usage)
  - 📚 [Resources](#📚-resources)

## 🛠 Stack

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
- DB/ORM
  - [drizzle-kit](https://www.npmjs.com/package/drizzle-kit)
  - [postgres](https://www.npmjs.com/package/postgres)
  - [docker](https://www.docker.com/)
- Auth
  - [lucia](https://www.npmjs.com/package/lucia)
- Payments
  - [stripe](http://stripe.com/)

## 🤓 More about

<details>
<summary>UI choices</summary>

Here we extends tailwind configuration with a random palette generator (thanks to [coolors.co](https://coolors.co/visualizer/dcdcdd-c5c3c6-46494c-4c5c68-1985a1) ✨), and add 2 utilities: `tailwind-animate` (for animations) and a custom one to hide scrollbars.
In addition, we wrap the configuration with `tailwind-variants/transformer` because we want to use the superpowers of `tailwind-variants` that allow us to define responsive variants (based on tailwind breakpoints).

We also replace `lucide-react` (that comes with `shadcn` components) with `@iconify/react`, because we like the multi-repos approach of iconify and its implementation of icons.

#### Why we are using `tailwind-variants` ?

`tailwind-variants` is a plugin built on top of `class-variance-authority` and provides some features like:

- [slots](https://www.tailwind-variants.org/docs/slots)
- [responsive variants](https://www.tailwind-variants.org/docs/variants#responsive-variants)

So, when we import shadcn components, we replaced the default class-variance-authority with tailwind-variants.

#### Why not use `shadcn CLI` ?

We are aware of fantastic [shadcn CLI](https://ui.shadcn.com/docs/cli) that generates all the components and blocks for us, but we want to keep the implementation more flexible and modular, without all the boilerplate code.

</details>
<br/>
<details>
<summary>Core pattern</summary>

We reproduced the concepts of [layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html).
This is encapsulated within the [core](https://github.com/giovacalle/next-launch-kit/tree/main/src/core) folder of the repository and is divided into: [use-cases](https://github.com/giovacalle/next-launch-kit/tree/main/src/core/use-cases) (Application Layer) and [data-source](https://github.com/giovacalle/next-launch-kit/tree/main/src/core/data-source) (Data Access Layer).

In the `use-cases` folder, we handle all the cases needed at the application level, which are used to connect the UI layer to the business logic.
In the `data-source` folder, we define all interactions with the various data sources (currently only with the database).

This **separation of concerns** into layers enhances the maintainability and reusability of the code, allowing for local changes without impacting other parts of the system

</details>

## 🧪 Usage

1. Click `use this template`, then `create a new repository`, and clone it to your local machine
2. Run `pnpm install` to install dependencies
3. Run `pnpm local-db:up` to start the local db (in docker, so check that it is running or it will give an error)

   1. In the Docker container, besides the Postgres instance, there's also a PgAdmin instance to interact with the database via SQL. The various database settings are defined in the [.yml](https://github.com/giovacalle/next-launch-kit/blob/main/src/db/local-db.yml) file.
   2. Then, as you can see, in the [.env](https://github.com/giovacalle/next-launch-kit/blob/main/.env) file we define `DATABASE_URL` variable. It is the url of the local Postgres instance.
   3. Run `pnpm run migrate` to create the database (in the instance of Postgres defined in env variable at previous step)

4. Run `pnpm dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
6. In order to use [Resend](https://resend.com), the service we use to send emails, you will need to:

   1. Create an account
   2. Define the domain from which to send emails (follow [Resend docs](https://resend.com/docs/dashboard/domains/introduction))
   3. Generate an API key and insert it into the `RESEND_API_KEY` env variable
   4. In the `EMAIL_FROM` env variable, insert the email address from which emails will be sent

7. In order to use `Google OAuth`, you will need to:

   1. **Create a Google Cloud Project**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.

   2. **Enable OAuth 2.0 API**

   - Navigate to the API & Services section.
   - Click on **Library** and search for "Google Identity Services".
   - Enable the **Google Identity Services API** for your project.

   3. **Create OAuth 2.0 Credentials**

   - Go to **APIs & Services** > **Credentials**.
   - Click on **Create Credentials** and select **OAuth 2.0 Client IDs**.
   - Choose the application type (e.g., Web application).
   - Define **Authorized JavaScript origins** (`http://localhost:3000`).
   - Define the **Authorized redirect URIs** (`http://localhost:3000/api/auth/google/callback`).

   4. Insert the **Client ID** and **Client Secret** into the env variables (`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`).

## 📚 Resources

This project was inspired by:

- [The Net Ninja's "Next.js Crash Course" YouTube video](https://www.youtube.com/watch?v=dLRKV-bajS4&t=2032s)
- [Alan2207's Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Wdc's SaaS starter kit](https://github.com/webdevcody/wdc-saas-starter-kit)
- [Layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)
