# starving-orange · ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg) ![NPM badge](https://badge.fury.io/js/starving-orange.svg)

**한국어** | [English](README_EN.md)

**starving-orange**는 쉽게 한글 닉네임을 생성할 수 있도록 돕는 JavaScript 라이브러리입니다.

## 사용 예시

과일 및 야채 이름에 형용사를 조합한 독특한 닉네임을 손쉽게 생성할 수 있습니다.

```typescript
import { generateNickname } from 'starving-orange';

const nickname = generateNickname();
console.log(nickname.nickname); // '배고픈 귤'
console.log(nickname.adjective); // '배고픈'
console.log(nickname.noun); // '귤'

// 기본 닉네임 값으로 사용
const defaultNickname = generateNickname().nickname;
```

```typescript
import { generateMultipleNicknames } from 'starving-orange';

// 여러 개의 닉네임 생성
const candidates = generateMultipleNicknames(5);
candidates.forEach(result => {
  console.log(result.nickname);
});
// '용감한 거봉'
// '상냥한 한라봉'
// '용감한 두리안'
// '달콤한 코코넛'
// '친절한 브로콜리'
```

```typescript
import { generateNickname } from 'starving-orange';

// 커스텀 단어로 특별한 닉네임 생성
const customNickname = generateNickname({
  customAdjectives: ['매력적인', '꿀꿀한', '기분상한'],
  customNouns: ['바나나', '오렌지', '토마토', '상추']
});

console.log(customNickname.nickname); // '꿀꿀한 상추'
```

```typescript
import { generateNickname } from 'starving-orange';

// 띄어쓰기 없는 닉네임 생성
const noSpaceNickname = generateNickname({ noSpacing: true });
console.log(noSpaceNickname.nickname); // '배고픈귤'

// 기본 (띄어쓰기 있음)
const spaceNickname = generateNickname();
console.log(spaceNickname.nickname); // '배고픈 귤'
```

## 설치

```bash
npm install starving-orange
```

```bash
yarn add starving-orange
```

## API

### `generateNickname(options?)`

단일 닉네임을 생성합니다.

```typescript
interface NicknameOptions {
  customAdjectives?: string[]; // 사용할 형용사 배열
  customNouns?: string[];      // 사용할 명사 배열  
  seed?: number;               // 재현 가능한 랜덤 생성을 위한 시드
  noSpacing?: boolean;         // 띄어쓰기 없이 닉네임 생성 (기본값: false)
}

interface GenerateResult {
  nickname: string;    // 생성된 닉네임
  adjective: string;   // 사용된 형용사
  noun: string;        // 사용된 명사
}
```

### `generateMultipleNicknames(count, options?)`

여러 개의 닉네임을 한번에 생성합니다.

### `getAvailableAdjectives()` / `getAvailableNouns()`

사용 가능한 단어 목록을 반환합니다.

### `getAvailableFruits()` / `getAvailableVegetables()`

과일과 야채 목록을 각각 반환합니다.

### `getTotalCombinations(options?)`

가능한 닉네임 조합의 총 개수를 반환합니다.

## 라이선스

[MIT LICENSE](LICENSE)