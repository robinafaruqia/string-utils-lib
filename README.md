# stringloom

A lightweight, zero-dependency collection of string manipulation utilities for JavaScript and TypeScript. Think of it as a focused alternative to lodash's string methods.

## Install

```bash
npm install stringloom
```

## Usage

```typescript
import { slugify, maskEmail, toCamelCase } from "stringloom";

slugify("Hello World!");           // "hello-world"
maskEmail("john.doe@example.com"); // "j******e@example.com"
toCamelCase("background-color");   // "backgroundColor"
```

Works with both ESM (`import`) and CommonJS (`require`). Full TypeScript types included.

## API

### Slugify

```typescript
slugify("Hello World!")                       // "hello-world"
slugify("Héllo Wörld")                        // "hello-world"
slugify("foo bar", { separator: "_" })        // "foo_bar"
slugify("Hello World", { lowercase: false })  // "Hello-World"
```

| Option      | Type     | Default | Description                         |
|-------------|----------|---------|-------------------------------------|
| `separator` | `string` | `"-"`   | Character to replace spaces with    |
| `lowercase` | `boolean`| `true`  | Convert to lowercase                |

### Truncate

```typescript
truncate("The quick brown fox jumps over the lazy dog", { length: 20 })
// "The quick brown fox…"

truncate("abcdefghij", { length: 7, ellipsis: "...", wordBoundary: false })
// "abcd..."
```

| Option         | Type     | Default | Description                          |
|----------------|----------|---------|--------------------------------------|
| `length`       | `number` | `30`    | Max length including ellipsis        |
| `ellipsis`     | `string` | `"…"`   | String appended when truncated       |
| `wordBoundary` | `boolean`| `true`  | Truncate at nearest word boundary    |

### Capitalize

```typescript
capitalize("hello world")       // "Hello world"
capitalizeWords("hello world")  // "Hello World"
```

### Case Conversion

```typescript
toCamelCase("hello-world")       // "helloWorld"
toPascalCase("hello-world")      // "HelloWorld"
toKebabCase("helloWorld")        // "hello-world"
toSnakeCase("helloWorld")        // "hello_world"
camelToKebab("backgroundColor")  // "background-color"
camelToSnake("backgroundColor")  // "background_color"
```

Handles camelCase, PascalCase, kebab-case, snake_case, and whitespace-separated input.

### Masking

```typescript
maskEmail("john.doe@example.com")  // "j******e@example.com"

mask("4242424242424242")                           // "4242************"
mask("4242424242424242", { keepStart: 0, keepEnd: 4 }) // "************4242"

maskPhone("+1 (555) 123-4567")  // "***********4567"
```

| Option (mask)  | Type     | Default | Description                          |
|----------------|----------|---------|--------------------------------------|
| `char`         | `string` | `"*"`   | Character used for masking           |
| `keepStart`    | `number` | `4`     | Visible characters at the start      |
| `keepEnd`      | `number` | `0`     | Visible characters at the end        |

### Reverse

```typescript
reverse("hello")  // "olleh"
reverse("🚀🌍")   // "🌍🚀"
```

Unicode-safe string reversal.

### Counting

```typescript
countWords("Hello, World!")    // 2
countOccurrences("banana", "an")  // 2
```

### Padding

```typescript
padStart("42", 5, "0")  // "00042"
padEnd("42", 5, "0")    // "42000"
```

### Template

```typescript
template("Hello, {{name}}!", { name: "World" })  // "Hello, World!"
template("{{a}} + {{b}} = {{c}}", { a: "1", b: "2", c: "3" })
// "1 + 2 = 3"
```

Simple `{{key}}` placeholder interpolation. Unknown placeholders are left as-is.

### Strip / Collapse

```typescript
stripHtml("<p>Hello <b>World</b></p>")  // "Hello World"
stripWhitespace("  h e l l o  ")        // "hello"
collapseWhitespace("  hello   world  ") // "hello world"
```

### Checks

```typescript
isPalindrome("Racecar")   // true
isBlank("  ")              // true
isNumeric("12345")         // true
isAlpha("hello")           // true
isAlphanumeric("hello123") // true
```

### Initials

```typescript
initials("John Doe")           // "JD"
initials("alice bob charlie")  // "ABC"
```

### Excerpt

```typescript
excerpt("The quick brown fox jumps over the lazy dog", "fox", { radius: 5 })
// "…brown fox jumps…"
```

| Option     | Type     | Default | Description                            |
|------------|----------|---------|----------------------------------------|
| `radius`   | `number` | `30`    | Characters to include around the phrase|
| `omission` | `string` | `"…"`   | Indicator for omitted text             |

## All Exports

| Function             | Description                                      |
|----------------------|--------------------------------------------------|
| `slugify`            | Convert string to URL-friendly slug              |
| `truncate`           | Truncate with ellipsis & word boundary support   |
| `capitalize`         | Capitalize first letter                          |
| `capitalizeWords`    | Capitalize first letter of every word            |
| `toCamelCase`        | Convert to camelCase                             |
| `toPascalCase`       | Convert to PascalCase                            |
| `toKebabCase`        | Convert to kebab-case                            |
| `toSnakeCase`        | Convert to snake_case                            |
| `camelToKebab`       | camelCase/PascalCase to kebab-case               |
| `camelToSnake`       | camelCase/PascalCase to snake_case               |
| `maskEmail`          | Mask an email address                            |
| `mask`               | Mask a string with configurable visibility       |
| `maskPhone`          | Mask a phone number (keeps last 4 digits)        |
| `reverse`            | Unicode-safe string reversal                     |
| `countWords`         | Count words in a string                          |
| `countOccurrences`   | Count substring occurrences                      |
| `padStart`           | Left-pad a string                                |
| `padEnd`             | Right-pad a string                               |
| `template`           | `{{key}}` placeholder interpolation              |
| `stripHtml`          | Remove HTML tags                                 |
| `stripWhitespace`    | Remove all whitespace                            |
| `collapseWhitespace` | Collapse whitespace to single spaces             |
| `isPalindrome`       | Check if string is a palindrome                  |
| `isBlank`            | Check if string is empty/whitespace              |
| `isNumeric`          | Check if string is all digits                    |
| `isAlpha`            | Check if string is all letters                   |
| `isAlphanumeric`     | Check if string is letters + digits              |
| `initials`           | Extract initials from a name                     |
| `excerpt`            | Extract snippet around a search phrase           |

## License

MIT
