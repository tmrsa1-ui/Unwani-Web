// يتأكد إن صفحة التحويل سليمة: عنوان، اتجاه عربي، تحويل ورابط لنفس الوجهة، وتنبيه «ليس تحققًا رسميًا».
import { readFileSync } from "node:fs";
const html = readFileSync("index.html", "utf8");
const target = "https://tmrsa1-ui.github.io/unwani/";
const checks = [
  ["lang=ar dir=rtl", /<html[^>]*lang="ar"[^>]*dir="rtl"/.test(html)],
  ["title", /<title>[^<]+<\/title>/.test(html)],
  ["meta refresh to live app", html.includes(`url=${target}`)],
  ["visible link to live app", html.includes(`href="${target}"`)],
  ["honest limit stated", html.includes("ليس تحققًا رسميًا")],
  ["no external scripts", !/<script[^>]+src=/.test(html)],
];
let ok = true;
for (const [name, pass] of checks) { console.log(`${pass ? "✓" : "✗"} ${name}`); ok &&= pass; }
process.exit(ok ? 0 : 1);
