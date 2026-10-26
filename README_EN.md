![starving-orange-logo](https://github.com/user-attachments/assets/f02d97b3-fb3d-400c-bcdf-6911a0581229)
# starving-orange · ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg) ![npm](https://img.shields.io/npm/v/starving-orange) ![npm downloads](https://img.shields.io/npm/dm/starving-orange)

[한국어](README.md) | **English**

**starving-orange** is a JavaScript library that helps you easily generate Korean nicknames.

## Usage Examples

You can easily generate unique nicknames by combining adjectives and nouns (fruits, vegetables).

```typescript
import { generateNickname } from 'starving-orange';

const nickname = generateNickname();
console.log(nickname.nickname); // '배고픈귤' (HungryTangerine) - default: no spacing
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
// '용감한거봉' (BraveKyohoGrape)
// '상냥한한라봉' (KindHallabong)
// '용감한두리안' (BraveDurian)
// '달콤한코코넛' (SweetCoconut)
// '친절한브로콜리' (FriendlyBroccoli)
```

```typescript
import { generateNickname } from 'starving-orange';

// Generate special nicknames with custom words
const customNickname = generateNickname({
  customAdjectives: ['매력적인', '꿀꿀한', '기분상한'], // ['Attractive', 'Adorable', 'Moody']
  customNouns: ['바나나', '오렌지', '토마토', '상추'] // ['Banana', 'Orange', 'Tomato', 'Lettuce']
});

console.log(customNickname.nickname); // '꿀꿀한상추' (AdorableLettuce)
```

```typescript
import { generateNickname } from 'starving-orange';

// Default (no spacing)
const noSpaceNickname = generateNickname();
console.log(noSpaceNickname.nickname); // '배고픈귤' (HungryTangerine)

// Generate nicknames with spacing
const spaceNickname = generateNickname({ noSpacing: false });
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
  noSpacing?: boolean;         // Generate nickname without spacing (default: true)
}

interface GenerateResult {
  nickname: string;    // Generated nickname
  adjective: string;   // Used adjective
  noun: string;        // Used noun
}
```

### `generateMultipleNicknames(count, options?)`

Generates multiple nicknames at once. By default, `unique: true` prevents duplicates **within this call's results**, including duplicate custom words and combinations producing the same nickname string. Requests exceeding the available unique nicknames throw an error. `count` must be a positive safe integer.

```typescript
generateMultipleNicknames(5); // Five unique nicknames
generateMultipleNicknames(5, { unique: false }); // Allow duplicates
```

The options type is `MultipleNicknameOptions`, extending `NicknameOptions` with `unique?: boolean`. The same seed reproduces the same results. Separate calls and `generateNickname()` do not track previous results; enforce service-wide uniqueness in your storage layer.

Unique generation builds all combinations before random selection, so large custom word lists require memory and preparation time proportional to the combination count. `getTotalCombinations()` returns the product of the word array lengths; duplicate words or identical output strings can make the actual unique count smaller.

### `getAvailableAdjectives()` / `getAvailableNouns()`

Returns the list of available words.

### `getAvailableFruits()` / `getAvailableVegetables()`

Returns the list of fruits and vegetables separately.

### `getTotalCombinations(options?)`

Returns the total number of possible nickname combinations.

## License

[MIT LICENSE](LICENSE)
