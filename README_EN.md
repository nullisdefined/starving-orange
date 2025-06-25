![starving-orange-logo](https://github.com/user-attachments/assets/f02d97b3-fb3d-400c-bcdf-6911a0581229)
# starving-orange · ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg) ![NPM badge](https://badge.fury.io/js/starving-orange.svg)

[한국어](README.md) | **English**

**starving-orange** is a JavaScript library that helps you easily generate Korean nicknames.

## Usage Examples

You can easily generate unique nicknames by combining adjectives and nouns (fruits, vegetables).

```typescript
import { generateNickname } from 'starving-orange';

const nickname = generateNickname();
console.log(nickname.nickname); // '배고픈 귤' (Hungry Tangerine)
console.log(nickname.adjective); // '배고픈' (Hungry)
console.log(nickname.noun); // '귤' (Tangerine)

// Use as default nickname value
const defaultNickname = generateNickname().nickname;
```

```typescript
import { generateMultipleNicknames } from 'starving-orange';

// Generate multiple nickname candidates
const candidates = generateMultipleNicknames(5);
candidates.forEach(result => {
  console.log(result.nickname);
});
// '용감한 거봉' (Brave Kyoho Grape)
// '상냥한 한라봉' (Kind Hallabong)
// '용감한 두리안' (Brave Durian)
// '달콤한 코코넛' (Sweet Coconut)
// '친절한 브로콜리' (Friendly Broccoli)
```

```typescript
import { generateNickname } from 'starving-orange';

// Generate special nicknames with custom words
const customNickname = generateNickname({
  customAdjectives: ['매력적인', '꿀꿀한', '기분상한'], // ['Attractive', 'Adorable', 'Moody']
  customNouns: ['바나나', '오렌지', '토마토', '상추'] // ['Banana', 'Orange', 'Tomato', 'Lettuce']
});

console.log(customNickname.nickname); // '꿀꿀한 상추' (Adorable Lettuce)
```

```typescript
import { generateNickname } from 'starving-orange';

// Generate nicknames without spacing
const noSpaceNickname = generateNickname({ noSpacing: true });
console.log(noSpaceNickname.nickname); // '배고픈귤' (HungryTangerine)

// Default (with spacing)
const spaceNickname = generateNickname();
console.log(spaceNickname.nickname); // '배고픈 귤' (Hungry Tangerine)
```

## Installation

```bash
npm install starving-orange
```

```bash
yarn add starving-orange
```

## API

### `generateNickname(options?)`

Generates a single nickname.

```typescript
interface NicknameOptions {
  customAdjectives?: string[]; // Array of adjectives to use
  customNouns?: string[];      // Array of nouns to use
  seed?: number;               // Seed for reproducible random generation
  noSpacing?: boolean;         // Generate nickname without spacing (default: false)
}

interface GenerateResult {
  nickname: string;    // Generated nickname
  adjective: string;   // Used adjective
  noun: string;        // Used noun
}
```

### `generateMultipleNicknames(count, options?)`

Generates multiple nicknames at once.

### `getAvailableAdjectives()` / `getAvailableNouns()`

Returns the list of available words.

### `getAvailableFruits()` / `getAvailableVegetables()`

Returns the list of fruits and vegetables separately.

### `getTotalCombinations(options?)`

Returns the total number of possible nickname combinations.

## License

[MIT LICENSE](LICENSE) 