import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { PROFILE, projects } from "../src/content.js";

// Emit real HTML entry points for every public route. The React application and
// hashed assets are shared; direct requests also receive useful page metadata.
const origin = "https://portfolio-five-vert-npb4fujz7y.vercel.app";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const pages = [
  {
    path: "/store",
    title: `Design Offerings — ${PROFILE.name}`,
    description: "UX/UI and web design services by Aliyan Baig.",
  },
  ...projects.map((project) => ({
    path: project.href,
    title: `${project.title} — ${PROFILE.name}`,
    description: project.description,
  })),
  {
    path: "/404",
    title: `Page not found — ${PROFILE.name}`,
    description:
      "This page could not be found. Return to Aliyan Baig’s portfolio.",
    notFound: true,
  },
];
for (const page of pages) {
  let html = template.replace(
    /<title>.*?<\/title>/,
    `<title>${escape(page.title)}</title>`,
  );
  const values = {
    description: page.description,
    "og:title": page.title,
    "og:description": page.description,
    "twitter:title": page.title,
    "twitter:description": page.description,
    "og:url": `${origin}${page.path}`,
    robots: page.notFound ? "noindex,follow" : "index,follow",
  };
  for (const [key, value] of Object.entries(values)) {
    const pattern = new RegExp(
      `(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*`,
    );
    html = html.replace(pattern, (_, prefix) => prefix + escape(value));
  }
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*/,
    (_, prefix) => prefix + origin + (page.notFound ? "/" : page.path),
  );
  const file = `dist${page.path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
console.log(
  `Created ${pages.length} route entry points, including the 404 page.`,
);
