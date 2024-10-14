# Next launch kit

This is a starter template for [Next.js](https://nextjs.org/) projects with [TypeScript](https://www.typescriptlang.org/).

- 🏁 [Next launch kit](#title)
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

## Branches

All branches are derived from the `base` branch: the idea is to divide the various topics by individual branch, and then merge all the features of the other branches into `main`.

- `main`: entire project (you are here 😁)
- `base`: eslint, prettier, commitlint and tailwind-css base settings
- `with-radix/shadcn`: UI components, icons, fonts
- `with-lucia/drizzle/postgres`: auth with postgres and drizzle (with local db in docker)

## Usage

1. Click `use this template`, then `create a new repository`, and clone it to your local machine
2. Run `pnpm install` to install dependencies
3. Run `pnpm local-db:up` to start the local db (in docker, so check that it is running or it will give an error)

   1. In the Docker container, besides the Postgres instance, there's also a PgAdmin instance to interact with the database via SQL. The various database settings are defined in the [.yml](https://github.com/giovacalle/next-launch-kit/blob/with-lucia/drizzle/postgres/src/db/local-db.yml) file.
   2. Then, as you can see, in the [.env](https://github.com/giovacalle/next-launch-kit/blob/with-lucia/drizzle/postgres/.env) file we define `DATABASE_URL` variable. It is the url of the local Postgres instance.
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

## Resources

This project was inspired by:

- [The Net Ninja's "Next.js Crash Course" YouTube video](https://www.youtube.com/watch?v=dLRKV-bajS4&t=2032s)
- [Alan2207's Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Wdc's SaaS starter kit](https://github.com/webdevcody/wdc-saas-starter-kit)
- [Layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)
