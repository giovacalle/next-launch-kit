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
  - [lucia](https://lucia-auth.com/)
- Payments
  - [stripe](http://stripe.com/)
- i18n
  - [next-intl](https://next-intl.dev/)
- Analytics
  - [posthog](https://posthog.com/)

## 🤓 More about

<details>
<summary>UI choices</summary>

We replace `lucide-react` (that comes with `shadcn` components) with `@iconify/react`, because we like the multi-repos approach of iconify and its implementation of icons.

#### Why we are using `tailwind-variants` ?

`tailwind-variants` is a plugin built on top of `class-variance-authority` and provides some additional features like:

- [slots](https://www.tailwind-variants.org/docs/slots)
- [responsive variants](https://www.tailwind-variants.org/docs/variants#responsive-variants)

So, when we import shadcn components, we replaced the default class-variance-authority with tailwind-variants.

#### Why not use `shadcn CLI` ?

We are aware of fantastic [shadcn CLI](https://ui.shadcn.com/docs/cli) that generates all the components and blocks for us, but we want to keep the implementation more flexible and modular, without all the boilerplate code.
Nonetheless, we are keeping shadcn css vars for the components.

</details>
<details>
<summary>Core pattern</summary>

We reproduced the concepts of [layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html).
This is encapsulated within the [core](https://github.com/giovacalle/next-launch-kit/tree/main/src/core) folder of the repository and is divided into: [use-cases](https://github.com/giovacalle/next-launch-kit/tree/main/src/core/use-cases) (Application Layer) and [data-source](https://github.com/giovacalle/next-launch-kit/tree/main/src/core/data-source) (Data Access Layer).

In the `use-cases` folder, we handle all the cases needed at the application level, which are used to connect the UI layer to the business logic.
In the `data-source` folder, we define all interactions with the various data sources (currently only with the database).

This **separation of concerns** into layers enhances the maintainability and reusability of the code, allowing for local changes without impacting other parts of the system

</details>
<details>
<summary>What about "MODE"?</summary>

We have implemented a "mode" system that allows you to define different modes for the application.

In the `.env.example` file, you can define the `MODE` variable, which can be `coming-soon`, `maintenance`, or `live`.

- `coming-soon`: allows you to render just the home page hiding some UI elements (like the header).
- `maintenance`: allows you to show a message to users when the site is under maintenance.
- `live`: the default mode.

</details>

## 🧪 Usage

1.  Click `use this template`, then **[create a new repository](https://github.com/new?template_name=next-launch-kit&template_owner=giovacalle)**, and clone it to your local machine
2.  Run `pnpm install` to install dependencies
3.  Db setup:

    > 💡 **If you want to use the local database, follow these steps:**
    >
    > 1. Ensure **Docker** is installed and running.
    > 2. Run `pnpm db:local-up` to start the Docker container
    >    - This will use the [`local-db.yml`](https://github.com/giovacalle/next-launch-kit/blob/main/src/db/local-db.yml) file.
    > 3. To stop the container, run `pnpm db:local-down`.

    0. In the [drizzle.config.ts](https://github.com/webdevcody/wdc-saas-starter-kit/blob/main/drizzle.config.ts) file, we need to declare env path using `dotenv` package. By default is set to `.env.example` (change if needed).
    1. In the [.env.example](https://github.com/giovacalle/next-launch-kit/blob/main/.env.example) file we define `DATABASE_URL` variable. It is the url of the local Postgres instance.
    2. Run `pnpm db:generate` to generate the database schema
    3. Run `pnpm db:migrate` to create the database (in the Postgres instance)
    4. Run `pnpm db:studio` to open a GUI to interact with the database

4.  Run `pnpm dev` to start the development server
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
6.  In order to use [Resend](https://resend.com), the service we use to send emails, you will need to:

    1. Create an account
    2. Define the domain from which to send emails (follow [Resend docs](https://resend.com/docs/dashboard/domains/introduction))
    3. Generate an API key and insert it into the `RESEND_API_KEY` env variable
    4. In the `EMAIL_FROM` env variable, insert the email address from which emails will be sent
    5. Run `pnpm email` to see a preview of the emails

7.  In order to use `Google OAuth`, you will need to:

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

8.  In order to use `Stripe`, you will need to:

    1. **Create a Stripe account**

       - Go to the [Stripe website](https://stripe.com/).
       - Create an account or sign in.

    2. **Get the API keys**

       - Go to the [API Keys](https://dashboard.stripe.com/test/apikeys).
       - Copy the **Publishable key** and **Secret key**.
       - Insert them into the env variables (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`).

    3. **Create a product**

       Here you can create a subscription product to test the payment flow. In this template we set 2 subscription products, and each one has 2 prices: monthly and yearly.
       Follow these steps:

       - Go to the [Create Products](https://dashboard.stripe.com/products/create).
       - Add product details
       - Copy the **Price ID** and insert it into the env variable (`NEXT_PUBLIC_STRIPE_BASIC_MONTHLY`)

    4. **Test webhooks**

       For testing payment flows, you will need to set up webhooks:

       - **Local development**

         - Install [Stripe CLI](https://stripe.com/docs/stripe-cli)
         - Run `stripe login` to log in to your Stripe account
         - Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` to listen for events (it will forward them to the local server)
         - This will give you a webhook secret that you need to insert into the env variable (`STRIPE_WEBHOOK_SECRET`)

       - **Production**
         - Go to the [Webhooks](https://dashboard.stripe.com/test/webhooks) section
         - Create a new endpoint and insert the URL (`https://your-domain.com/api/webhooks/stripe`)
         - Listen for the events `checkout.session.completed` and `customer.subscription.updated`
         - Copy the secret key and insert it into the env variable (`STRIPE_WEBHOOK_SECRET`)

    5. **Customer portal**

       Stripe provides a customer portal that allows customers to manage their subscriptions:

       - Go to the [Billing Portal](https://dashboard.stripe.com/settings/billing/portal)
       - Enable the portal
       - Copy the URL and insert it into the env variable (`NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL`)

9.  In order to use `Posthog`, you will need to:

    > 💡 **Keep in mind**
    >
    > Posthog provides a ton of features, so you can customize the analytics as you want. In this template, we just set up the basic configuration for the web analytics.
    > In the future, if we'll add more features, we'll update this section.

    1. **Create a Posthog account**

       - Go to the [Posthog website](https://posthog.com/).
       - Create an account or sign in.

    2. **Continue with the wizard**

       - Follow the steps in the wizard to create a new project using Next.js.

    3. **Get the env variables**

    - At the end of the wizard, you will get the `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
    - Insert them into the env variables (with the same name).

## 📚 Resources

This project was inspired by:

- [The Net Ninja's "Next.js Crash Course" YouTube video](https://www.youtube.com/watch?v=dLRKV-bajS4&t=2032s)
- [Alan2207's Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Wdc's SaaS starter kit](https://github.com/webdevcody/wdc-saas-starter-kit)
- [Layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)
