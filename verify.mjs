/**
 * Run this to manually verify every exported function:
 *   node verify.mjs
 *
 * It imports from the built dist/ — exactly what npm consumers will get.
 */
import {
  slugify,
  truncate,
  capitalize,
  capitalizeWords,
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  camelToKebab,
  camelToSnake,
  maskEmail,
  mask,
  maskPhone,
  reverse,
  countWords,
  countOccurrences,
  padStart,
  padEnd,
  template,
  stripHtml,
  stripWhitespace,
  collapseWhitespace,
  isPalindrome,
  isBlank,
  isNumeric,
  isAlpha,
  isAlphanumeric,
  initials,
  excerpt,
} from "./dist/index.js";

const pass = (label, actual, expected) => {
  const ok = actual === expected;
  const icon = ok ? "✅" : "❌";
  console.log(`${icon} ${label}`);
  if (!ok) {
    console.log(`   expected: ${JSON.stringify(expected)}`);
    console.log(`   got:      ${JSON.stringify(actual)}`);
  }
  return ok;
};

let total = 0;
let failed = 0;

function check(label, actual, expected) {
  total++;
  if (!pass(label, actual, expected)) failed++;
}

console.log("\n── slugify ──");
check('slugify("Hello World!")', slugify("Hello World!"), "hello-world");
check('slugify("Héllo Wörld")', slugify("Héllo Wörld"), "hello-world");
check('slugify("hello_world")', slugify("hello_world"), "hello-world");
check('slugify(separator: "_")', slugify("foo bar", { separator: "_" }), "foo_bar");

console.log("\n── truncate ──");
check('truncate(short)', truncate("hello", { length: 10 }), "hello");
check('truncate(long, no wordBoundary)', truncate("abcdefghij", { length: 5, wordBoundary: false }), "abcd…");
check('truncate(custom ellipsis)', truncate("abcdefghij", { length: 7, ellipsis: "...", wordBoundary: false }), "abcd...");

console.log("\n── capitalize ──");
check('capitalize("hello world")', capitalize("hello world"), "Hello world");
check('capitalizeWords("hello world")', capitalizeWords("hello world"), "Hello World");

console.log("\n── case conversions ──");
check('toCamelCase("hello-world")', toCamelCase("hello-world"), "helloWorld");
check('toPascalCase("hello-world")', toPascalCase("hello-world"), "HelloWorld");
check('toKebabCase("helloWorld")', toKebabCase("helloWorld"), "hello-world");
check('toSnakeCase("helloWorld")', toSnakeCase("helloWorld"), "hello_world");
check('camelToKebab("backgroundColor")', camelToKebab("backgroundColor"), "background-color");
check('camelToSnake("backgroundColor")', camelToSnake("backgroundColor"), "background_color");

console.log("\n── masking ──");
check('maskEmail("john.doe@example.com")', maskEmail("john.doe@example.com"), "j******e@example.com");
check('mask("4242...")', mask("4242424242424242"), "4242************");
check('mask(keepEnd:4)', mask("4242424242424242", { keepStart: 0, keepEnd: 4 }), "************4242");
check('maskPhone("+1 (555) 123-4567")', maskPhone("+1 (555) 123-4567"), "*******4567");

console.log("\n── reverse ──");
check('reverse("hello")', reverse("hello"), "olleh");
check('reverse("🚀🌍")', reverse("🚀🌍"), "🌍🚀");

console.log("\n── counting ──");
check('countWords("Hello, World!")', countWords("Hello, World!"), 2);
check('countOccurrences("banana","an")', countOccurrences("banana", "an"), 2);

console.log("\n── padding ──");
check('padStart("42", 5, "0")', padStart("42", 5, "0"), "00042");
check('padEnd("42", 5, "0")', padEnd("42", 5, "0"), "42000");

console.log("\n── template ──");
check('template("Hello, {{name}}!")', template("Hello, {{name}}!", { name: "World" }), "Hello, World!");
check('template(unknown key)', template("Hi {{name}}", {}), "Hi {{name}}");

console.log("\n── strip ──");
check('stripHtml("<p>Hello</p>")', stripHtml("<p>Hello <b>World</b></p>"), "Hello World");
check('stripWhitespace(" h e l l o ")', stripWhitespace("  h e l l o  "), "hello");
check('collapseWhitespace("  hello   world  ")', collapseWhitespace("  hello   world  "), "hello world");

console.log("\n── checks ──");
check('isPalindrome("Racecar")', isPalindrome("Racecar"), true);
check('isPalindrome("hello")', isPalindrome("hello"), false);
check('isBlank("  ")', isBlank("  "), true);
check('isNumeric("12345")', isNumeric("12345"), true);
check('isAlpha("hello")', isAlpha("hello"), true);
check('isAlphanumeric("hello123")', isAlphanumeric("hello123"), true);

console.log("\n── initials ──");
check('initials("John Doe")', initials("John Doe"), "JD");

console.log("\n── excerpt ──");
const ex = excerpt("The quick brown fox jumps over the lazy dog", "fox", { radius: 5 });
check('excerpt contains "fox"', ex.includes("fox"), true);

console.log("\n" + "═".repeat(40));
console.log(`Results: ${total - failed}/${total} passed` + (failed ? ` (${failed} FAILED)` : " ✨ All good!"));
console.log("═".repeat(40) + "\n");

process.exit(failed > 0 ? 1 : 0);
