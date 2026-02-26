import { describe, it, expect } from "vitest";
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
} from "./index.js";

describe("slugify", () => {
  it("converts a simple string to a slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("strips accented characters", () => {
    expect(slugify("Héllo Wörld")).toBe("hello-world");
  });

  it("supports a custom separator", () => {
    expect(slugify("foo bar baz", { separator: "_" })).toBe("foo_bar_baz");
  });

  it("respects lowercase: false", () => {
    expect(slugify("Hello World", { lowercase: false })).toBe("Hello-World");
  });

  it("collapses multiple separators", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("converts underscores to separators", () => {
    expect(slugify("hello_world")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("truncate", () => {
  it("does not truncate short strings", () => {
    expect(truncate("hello", { length: 10 })).toBe("hello");
  });

  it("truncates long strings at word boundary", () => {
    const result = truncate("The quick brown fox jumps over the lazy dog", {
      length: 20,
    });
    expect(result.length).toBeLessThanOrEqual(20);
    expect(result).toContain("…");
  });

  it("truncates without word boundary", () => {
    const result = truncate("abcdefghij", {
      length: 5,
      wordBoundary: false,
    });
    expect(result).toBe("abcd…");
  });

  it("supports custom ellipsis", () => {
    const result = truncate("abcdefghij", {
      length: 7,
      ellipsis: "...",
      wordBoundary: false,
    });
    expect(result).toBe("abcd...");
  });
});

describe("capitalize / capitalizeWords", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("capitalizes every word", () => {
    expect(capitalizeWords("hello world foo")).toBe("Hello World Foo");
  });
});

describe("case conversions", () => {
  it("toCamelCase", () => {
    expect(toCamelCase("hello-world")).toBe("helloWorld");
    expect(toCamelCase("Hello World")).toBe("helloWorld");
    expect(toCamelCase("foo_bar_baz")).toBe("fooBarBaz");
  });

  it("toPascalCase", () => {
    expect(toPascalCase("hello-world")).toBe("HelloWorld");
    expect(toPascalCase("foo bar")).toBe("FooBar");
  });

  it("toKebabCase", () => {
    expect(toKebabCase("helloWorld")).toBe("hello-world");
    expect(toKebabCase("FooBar")).toBe("foo-bar");
  });

  it("toSnakeCase", () => {
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
    expect(toSnakeCase("Foo Bar")).toBe("foo_bar");
  });

  it("camelToKebab", () => {
    expect(camelToKebab("backgroundColor")).toBe("background-color");
  });

  it("camelToSnake", () => {
    expect(camelToSnake("backgroundColor")).toBe("background_color");
  });
});

describe("masking", () => {
  it("masks an email", () => {
    expect(maskEmail("john.doe@example.com")).toBe("j******e@example.com");
  });

  it("handles short local part", () => {
    expect(maskEmail("ab@example.com")).toBe("a*@example.com");
  });

  it("masks a string with defaults", () => {
    expect(mask("4242424242424242")).toBe("4242************");
  });

  it("masks a string keeping end characters", () => {
    expect(mask("4242424242424242", { keepStart: 0, keepEnd: 4 })).toBe(
      "************4242",
    );
  });

  it("masks a phone number", () => {
    const result = maskPhone("+1 (555) 123-4567");
    expect(result).toContain("4567");
    expect(result.startsWith("*")).toBe(true);
  });
});

describe("reverse", () => {
  it("reverses a string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("handles unicode", () => {
    expect(reverse("🚀🌍")).toBe("🌍🚀");
  });

  it("handles empty string", () => {
    expect(reverse("")).toBe("");
  });
});

describe("counting", () => {
  it("counts words", () => {
    expect(countWords("Hello, World!")).toBe(2);
    expect(countWords("  spaced  out ")).toBe(2);
    expect(countWords("")).toBe(0);
    expect(countWords("   ")).toBe(0);
  });

  it("counts occurrences", () => {
    expect(countOccurrences("banana", "an")).toBe(2);
    expect(countOccurrences("aaa", "aa")).toBe(1);
    expect(countOccurrences("hello", "xyz")).toBe(0);
    expect(countOccurrences("hello", "")).toBe(0);
  });
});

describe("padding", () => {
  it("pads start", () => {
    expect(padStart("42", 5, "0")).toBe("00042");
  });

  it("pads end", () => {
    expect(padEnd("42", 5, "0")).toBe("42000");
  });
});

describe("template", () => {
  it("replaces placeholders", () => {
    expect(template("Hello, {{name}}!", { name: "World" })).toBe(
      "Hello, World!",
    );
  });

  it("handles multiple placeholders", () => {
    expect(template("{{a}} + {{b}} = {{c}}", { a: "1", b: "2", c: "3" })).toBe(
      "1 + 2 = 3",
    );
  });

  it("leaves unknown placeholders unchanged", () => {
    expect(template("Hello, {{name}}!", {})).toBe("Hello, {{name}}!");
  });

  it("supports numeric values", () => {
    expect(template("Count: {{n}}", { n: 42 })).toBe("Count: 42");
  });
});

describe("strip", () => {
  it("strips HTML tags", () => {
    expect(stripHtml("<p>Hello <b>World</b></p>")).toBe("Hello World");
  });

  it("strips all whitespace", () => {
    expect(stripWhitespace("  h e l l o  ")).toBe("hello");
  });

  it("collapses whitespace", () => {
    expect(collapseWhitespace("  hello   world  ")).toBe("hello world");
  });
});

describe("checks", () => {
  it("detects palindromes", () => {
    expect(isPalindrome("Racecar")).toBe(true);
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    expect(isPalindrome("hello")).toBe(false);
  });

  it("detects blank strings", () => {
    expect(isBlank("")).toBe(true);
    expect(isBlank("  ")).toBe(true);
    expect(isBlank(" a ")).toBe(false);
  });

  it("detects numeric strings", () => {
    expect(isNumeric("12345")).toBe(true);
    expect(isNumeric("123a5")).toBe(false);
    expect(isNumeric("")).toBe(false);
  });

  it("detects alpha strings", () => {
    expect(isAlpha("hello")).toBe(true);
    expect(isAlpha("hello1")).toBe(false);
    expect(isAlpha("")).toBe(false);
  });

  it("detects alphanumeric strings", () => {
    expect(isAlphanumeric("hello123")).toBe(true);
    expect(isAlphanumeric("hello!")).toBe(false);
    expect(isAlphanumeric("")).toBe(false);
  });
});

describe("initials", () => {
  it("extracts initials from a name", () => {
    expect(initials("John Doe")).toBe("JD");
  });

  it("handles multiple words", () => {
    expect(initials("alice bob charlie")).toBe("ABC");
  });
});

describe("excerpt", () => {
  it("extracts a snippet around a phrase", () => {
    const result = excerpt("The quick brown fox jumps over the lazy dog", "fox", {
      radius: 5,
    });
    expect(result).toContain("fox");
    expect(result.startsWith("…")).toBe(true);
    expect(result.endsWith("…")).toBe(true);
  });

  it("returns empty string when phrase not found", () => {
    expect(excerpt("hello world", "xyz")).toBe("");
  });

  it("does not add omission at the start if at beginning", () => {
    const result = excerpt("fox jumps over", "fox", { radius: 5 });
    expect(result.startsWith("…")).toBe(false);
  });
});
