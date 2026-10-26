![starving-orange-logo](https://github.com/user-attachments/assets/f02d97b3-fb3d-400c-bcdf-6911a0581229)
# starving-orange · ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg) ![npm](https://img.shields.io/npm/v/starving-orange) ![npm downloads](https://img.shields.io/npm/dm/starving-orange)

**한국어** | [English](README_EN.md)

**starving-orange**는 쉽게 한글 닉네임을 생성할 수 있도록 돕는 JavaScript 라이브러리입니다.

## 사용 예시

과일 및 야채 이름에 형용사를 조합한 독특한 닉네임을 손쉽게 생성할 수 있습니다.

```typescript
import { generateNickname } from 'starving-orange';

const nickname = generateNickname();
console.log(nickname.nickname); // '배고픈귤'
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
// '용감한거봉'
// '상냥한한라봉'
// '용감한두리안'
// '달콤한코코넛'
// '친절한브로콜리'
```

```typescript
import { generateNickname } from 'starving-orange';

// 커스텀 단어로 특별한 닉네임 생성
const customNickname = generateNickname({
  customAdjectives: ['매력적인', '꿀꿀한', '기분상한'],
  customNouns: ['바나나', '오렌지', '토마토', '상추']
});

console.log(customNickname.nickname); // '꿀꿀한상추'
```

```typescript
import { generateNickname } from 'starving-orange';

// 기본 (띄어쓰기 없음)
const noSpaceNickname = generateNickname();
console.log(noSpaceNickname.nickname); // '배고픈귤'

// 띄어쓰기 있는 닉네임 생성
const spaceNickname = generateNickname({ noSpacing: false });
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
  noSpacing?: boolean;         // 띄어쓰기 없이 닉네임 생성 (기본값: true)
}

interface GenerateResult {
  nickname: string;    // 생성된 닉네임
  adjective: string;   // 사용된 형용사
  noun: string;        // 사용된 명사
}
```

### `generateMultipleNicknames(count, options?)`

여러 개의 닉네임을 한번에 생성합니다. 기본값인 `unique: true`는 **이번 호출의 결과 안에서** 중복을 방지합니다. 같은 결과 문자열이 되는 조합과 커스텀 단어의 중복도 제외합니다. 생성 가능한 고유 닉네임 수보다 많이 요청하면 오류가 발생합니다. `count`는 1 이상의 안전 정수여야 합니다.

```typescript
generateMultipleNicknames(5); // 중복 없는 5개
generateMultipleNicknames(5, { unique: false }); // 중복 허용
```

옵션 타입은 `NicknameOptions`를 확장한 `MultipleNicknameOptions`이며, `unique?: boolean`을 추가로 받습니다. 같은 시드는 같은 결과를 재현합니다. 서로 다른 호출 사이와 `generateNickname()`의 중복은 관리하지 않으므로, 서비스 전체의 고유성은 저장소에서 별도로 보장해야 합니다.

고유 생성은 전체 조합을 만든 뒤 무작위로 추출하므로, 매우 큰 커스텀 단어 목록에서는 조합 수에 비례하는 메모리와 준비 시간이 필요합니다. `getTotalCombinations()`는 단어 배열 길이의 곱을 반환하므로, 중복 단어 또는 같은 결과 문자열이 있는 경우 실제 고유 닉네임 수와 다를 수 있습니다.

### `getAvailableAdjectives()` / `getAvailableNouns()`

사용 가능한 단어 목록을 반환합니다.

### `getAvailableFruits()` / `getAvailableVegetables()`

과일과 야채 목록을 각각 반환합니다.

### `getTotalCombinations(options?)`

가능한 닉네임 조합의 총 개수를 반환합니다.

## 라이선스

[MIT LICENSE](LICENSE)
