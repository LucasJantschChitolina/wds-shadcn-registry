// @ts-check
import { defineConfig, envField } from "astro/config"
import starlight from "@astrojs/starlight"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import starlightThemeBlack from "starlight-theme-black"

import { loadEnv } from "vite"

if (process.env.NODE_ENV == null) throw new Error("NODE_ENV is not set.")

const { GITHUB_REPO_URL, SERVER_URL } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
)

// https://astro.build/config
export default defineConfig({
  site: SERVER_URL,
  env: {
    schema: {
      GITHUB_REPO_URL: envField.string({ context: "client", access: "public" }),
      SERVER_URL: envField.string({ context: "client", access: "public" }),
    },
  },
  integrations: [
    starlight({
      components: {
        Head: "./src/components/overrides/head.astro",
      },
      head: [
        // Add ICO favicon fallback for Safari.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
          },
        },
        // Add dark mode favicon.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon-dark.svg",
            media: "(prefers-color-scheme: dark)",
            type: "image/svg+xml",
          },
        },
        // Add light mode favicon.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.svg",
            media: "(prefers-color-scheme: light)",
            type: "image/svg+xml",
          },
        },
      ],
      title: "WDS Shadcn Registry",
      editLink: {
        baseUrl: `${GITHUB_REPO_URL}/tree/main`,
      },
      logo: {
        dark: "./src/assets/logo/dark.png",
        light: "./src/assets/logo/light.png",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: GITHUB_REPO_URL,
        },
        {
          icon: "youtube",
          label: "YouTube",
          href: "https://www.youtube.com/@WebDevSimplified",
        },
        {
          icon: "x.com",
          label: "X.com",
          href: "https://x.com/DevSimplified",
        },
      ],
      customCss: ["./src/styles/global.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
          ],
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
        {
          label: "Contributing",
          items: [
            { label: "Introduction", slug: "contributing" },
            {
              label: "Component Request",
              slug: "contributing/component-request",
            },
            {
              label: "Feature Request",
              slug: "contributing/feature-request",
            },
            {
              label: "Contributing Code",
              slug: "contributing/contributing-code",
            },
          ],
        },
      ],
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              label: "Docs",
              link: "/getting-started/installation",
            },
            {
              label: "Components",
              link: "/components",
            },
            {
              label: "Contributing",
              link: "/contributing",
            },
          ],
          footerText:
            "Built by [Web Dev Simplified](https://webdevsimplified.com) for use with [Shadcn](https://ui.shadcn.com)",
        }),
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
