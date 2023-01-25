import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Text from "../../lib/components/Text/Text";
import Code from "../../lib/components/Code/Code";
import { ReactNode } from "react";
import { DocPage } from "../components/DocPage/DocPage";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

function Quote({ children }: { children: ReactNode }) {
  return (
    <span className="mx-1 select-all rounded bg-slate-800 px-1.5 py-1 text-white">
      {children}
    </span>
  );
}

export default function ButtonDemoPage() {
  return (
    <DocPage title="Getting started">
      <Text variant="label">First steps</Text>
      <Text>
        To use the library
        <Quote>@italodeandra/ui</Quote>
        you first need a Next.js project.
        <br />
        You start by creating a new project using the following command:
      </Text>
      <Code language="bash" className="max-w-xl" copy>
        npx create-next-app@latest my-project --typescript --eslint
      </Code>
      <Text>Open the project folder:</Text>
      <Code language="bash" className="max-w-xl" copy>
        cd my-project
      </Code>
      <Text>Install the library with its dependencies:</Text>
      <Code language="bash" copy>
        {`npm i -E @italodeandra/ui @italodeandra/next
npm i -E tailwindcss @tailwindcss/typography @tailwindcss/forms postcss autoprefixer focus-visible postcss-focus-visible
npm i -E clsx valtio @fontsource/inter next-seo @badrap/bar-of-progress framer-motion @heroicons/react cookies-next bson-objectid bson`}
      </Code>
      <Text variant="secondary">
        We install every dependency manually because we follow an on-demand
        pattern.
        <br />
        The package don&apos;t install any dependencies by itself.
        <br />
        So every time you miss a dependency, you need to manually install it.
      </Text>
      <Text>
        Run the init command to generate both <Quote>tailwind.config.js</Quote>{" "}
        and <Quote>postcss.config.js</Quote>.
      </Text>
      <Code language="bash" className="max-w-xl" copy>
        npx tailwindcss init -p
      </Code>
      <Text>
        Replace <Quote>tailwind.config.js</Quote> with the following:
      </Text>
      <Code language="javascript" className="max-w-xl" copy>
        {`const tailwindConfig = require("@italodeandra/ui/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
};`}
      </Code>
      <Text>
        Replace <Quote>postcss.config.js</Quote> with the following:
      </Text>
      <Code language="javascript" className="max-w-xl" copy>
        {`module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-focus-visible": {
      replaceWith: "[data-focus-visible-added]",
    },
    autoprefixer: {},
  },
};`}
      </Code>
      <Text>
        Replace <Quote>next.config.js</Quote> with the following:
      </Text>
      <Code language="javascript" className="max-w-xl" copy>
        {`/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        bson: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;`}
      </Code>
      <Text variant="secondary">
        The <strong>webpack</strong> property takes care of removing server side
        packages from the client side.
      </Text>
      <Text>
        Create a new CSS file <Quote>./src/globals.css</Quote>:
      </Text>
      <Code language="css" className="max-w-xl" copy>
        {`@import "@italodeandra/ui/base.css";`}
      </Code>
      <Text>
        You can also delete what you will not use, like the{" "}
        <Quote>./styles/</Quote> folder.
      </Text>
      <Text>
        Move all your app files to the <Quote>./src/</Quote> folder. Your
        project folder structure will be like this:
      </Text>
      <Code language="bash" className="max-w-xl" copy>
        {`├── public
│   └── favicon.ico
├── src
│   ├── components
│   │   └── **/**.tsx
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── **/**.tsx
│   ├── views
│   │   └── **/**.tsx
│   └── globals.css
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── prettier.config.js
├── tailwind.config.js
└── tsconfig.json
`}
      </Code>
      <Text>
        Replace the <Quote>./src/pages/_document.tsx</Quote> file with:
      </Text>
      <Code language="tsx" copy>
        {`import Document, { Head, Html, Main, NextScript } from "next/document";
import scrolledScript from "@italodeandra/ui/bootstrap/scrolledScript";
import modeScript from "@italodeandra/ui/bootstrap/modeScript";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="pt" className="h-full antialiased">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: scrolledScript }} />
          <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        </Head>
        <body className="flex h-full flex-col bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}
      </Code>
      <Text>
        Replace the <Quote>./src/pages/_app.tsx</Quote> file with:
      </Text>
      <Code language="tsx" copy>
        {`import "@fontsource/inter/variable.css";
import "@italodeandra/ui/bootstrap/supressConsoleLog";
import { DefaultSeo } from "next-seo";
import "focus-visible";
import "../globals.css";
import AppProps from "@italodeandra/ui/bootstrap/AppProps";
import colors from "tailwindcss/colors";
import { hydrateNavigationDrawerState } from "@italodeandra/ui/components/NavigationDrawer/navigationDrawer.state";
import Notifications from "@italodeandra/ui/components/Notifications/Notifications";
import setupNProgress from "@italodeandra/ui/bootstrap/nprogress";

const appName = "@italodeandra/ui"; // TODO update with your app name
const appDescription = "Extremely beautiful designed user interface."; // TODO update with a description of your app
const appKeywords = "ui"; // TODO update with keywords for you app separated by commma
const appThemeColor = colors.sky["500"]; // TODO update with your app primary color

setupNProgress(appThemeColor);

function MyApp({ Component, pageProps }: AppProps) {
  hydrateNavigationDrawerState(pageProps.cookies);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo
        titleTemplate={\`%s - \${appName}\`}
        defaultTitle={appName}
        description={appDescription}
        // TODO the following part of the code is commented out because you need to generate the icons using https://realfavicongenerator.net/
        // openGraph={{
        //   images: [
        //     {
        //       url: "/android-chrome-512x512.png",
        //       height: 512,
        //       width: 512,
        //       alt: appName,
        //     },
        //   ],
        // }}
        // additionalLinkTags={[
        //   {
        //     rel: "apple-touch-icon",
        //     sizes: "180x180",
        //     href: "/apple-touch-icon.png",
        //   },
        //   {
        //     rel: "icon",
        //     type: "image/png",
        //     sizes: "32x32",
        //     href: "/favicon-32x32.png",
        //   },
        //   {
        //     rel: "icon",
        //     type: "image/png",
        //     sizes: "16x16",
        //     href: "/favicon-16x16.png",
        //   },
        //   {
        //     rel: "manifest",
        //     href: "/site.webmanifest",
        //   },
        //   {
        //     rel: "mask-icon",
        //     href: "/safari-pinned-tab.svg",
        //     color: appThemeColor,
        //   },
        // ]}
        additionalMetaTags={[
          {
            name: "apple-mobile-web-app-title",
            content: appName,
          },
          {
            name: "application-name",
            content: appName,
          },
          {
            name: "msapplication-TileColor",
            content: appThemeColor,
          },
          {
            name: "theme-color",
            content: appThemeColor,
          },
          {
            name: "viewport",
            content: "initial-scale=1, width=device-width, maximum-scale=1",
          },
          {
            name: "keywords",
            content: appKeywords,
          },
        ]}
      />
      <Notifications />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;`}
      </Code>
      <Text variant="secondary">
        Don&apos;t forget to fix the included <strong>TODO</strong>s.
      </Text>
      <Text>
        For formatting, install <Quote>prettier</Quote> on your{" "}
        <Quote>devDependencies</Quote>:
      </Text>
      <Code language="bash" copy>
        npm i -D -E prettier prettier-plugin-tailwindcss
      </Code>
      <Text>
        And create the file <Quote>./prettier.confing.js</Quote>:
      </Text>
      <Code language="javascript" copy>{`module.exports = {
  ...require("@italodeandra/ui/prettier.config.js")
};`}</Code>
      <Text>
        Replace the <Quote>./src/pages/index.tsx</Quote> file with:
      </Text>
      <Code
        language="javascript"
        copy
      >{`import Text from "@italodeandra/ui/components/Text";

export default function Home() {
  return (
    <Text>
      Hello World
    </Text>
  )
}`}</Code>
      <Text>And you&apos;re go to go run the app:</Text>
      <Code language="bash" copy>
        npm run dev
      </Code>
      <div>🚀🚀🚀🚀</div>
    </DocPage>
  );
}

ButtonDemoPage.getLayout = getPublicLayout;
