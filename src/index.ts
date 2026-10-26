import { adjectives } from "./data/adjectives";
import { fruits, vegetables } from "./data/nouns";

// 과일과 야채를 합쳐서 전체 명사 배열 생성
const nouns = [...fruits, ...vegetables];

export interface NicknameOptions {
  /** 사용할 형용사 배열 (기본값: 내장 형용사 목록) */
  customAdjectives?: string[];
  /** 사용할 명사 배열 (기본값: 내장 명사 목록) */
  customNouns?: string[];
  /** 시드 값 (재현 가능한 랜덤 생성을 위해) */
  seed?: number;
  /** 띄어쓰기 없이 닉네임 생성 (기본값: true) */
  noSpacing?: boolean;
}

export interface GenerateResult {
  /** 생성된 닉네임 */
  nickname: string;
  /** 사용된 형용사 */
  adjective: string;
  /** 사용된 명사 */
  noun: string;
}

export interface MultipleNicknameOptions extends NicknameOptions {
  /** 이번 호출의 결과 안에서 닉네임 중복 방지 (기본값: true) */
  unique?: boolean;
}

/**
 * 간단한 시드 기반 랜덤 생성기
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number = Math.random() * 1000000) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

/**
 * 배열에서 랜덤하게 하나의 요소를 선택합니다.
 */
function getRandomElement<T>(array: T[], random: SeededRandom): T {
  const index = Math.floor(random.next() * array.length);
  return array[index];
}

/**
 * 한글 형용사와 명사를 조합한 랜덤 닉네임을 생성합니다.
 *
 * @param options 닉네임 생성 옵션
 * @returns 생성된 닉네임 정보
 *
 * @example
 * ```typescript
 * import { generateNickname } from 'starving-orange';
 *
 * 1. 기본 사용법 (띄어쓰기 없음)
 * const result = generateNickname();
 * console.log(result.nickname); // "배고픈귤"
 *
 * 2. 띄어쓰기 있는 닉네임
 * const spaceResult = generateNickname({ noSpacing: false });
 * console.log(spaceResult.nickname); // "배고픈 귤"
 *
 * 3. 커스텀 옵션 사용
 * const customResult = generateNickname({
 *   customAdjectives: ["멋진", "귀여운"],
 *   customNouns: ["딸기", "바나나"],
 *   seed: 12345,
 *   noSpacing: true
 * });
 * ```
 */
export function generateNickname(
  options: NicknameOptions = {},
): GenerateResult {
  const {
    customAdjectives = adjectives,
    customNouns = nouns,
    seed,
    noSpacing = true,
  } = options;

  if (customAdjectives.length === 0) {
    throw new Error("형용사 배열이 비어있습니다.");
  }

  if (customNouns.length === 0) {
    throw new Error("명사 배열이 비어있습니다.");
  }

  const random = new SeededRandom(seed);
  const adjective = getRandomElement(customAdjectives, random);
  const noun = getRandomElement(customNouns, random);

  const separator = noSpacing ? "" : " ";

  return {
    nickname: `${adjective}${separator}${noun}`,
    adjective,
    noun,
  };
}

/**
 * 여러 개의 닉네임을 한번에 생성합니다.
 *
 * @param count 생성할 닉네임 개수
 * @param options 닉네임 생성 옵션
 * @returns 생성된 닉네임 정보 배열
 *
 * @example
 * ```typescript
 * import { generateMultipleNicknames } from 'starving-orange';
 *
 * const results = generateMultipleNicknames(5);
 * results.forEach(result => {
 *   console.log(result.nickname);
 * });
 * ```
 */
export function generateMultipleNicknames(
  count: number,
  options: MultipleNicknameOptions = {},
): GenerateResult[] {
  if (count <= 0) {
    throw new Error("개수는 1 이상이어야 합니다.");
  }

  if (!Number.isSafeInteger(count)) {
    throw new Error("개수는 유한한 안전 정수여야 합니다.");
  }

  if (options.unique ?? true) {
    const {
      customAdjectives = adjectives,
      customNouns = nouns,
      noSpacing = true,
      seed,
    } = options;

    if (customAdjectives.length === 0) {
      throw new Error("형용사 배열이 비어있습니다.");
    }
    if (customNouns.length === 0) {
      throw new Error("명사 배열이 비어있습니다.");
    }

    const candidates = new Map<string, GenerateResult>();
    const separator = noSpacing ? "" : " ";
    for (const adjective of new Set(customAdjectives)) {
      for (const noun of new Set(customNouns)) {
        const nickname = `${adjective}${separator}${noun}`;
        candidates.set(nickname, { nickname, adjective, noun });
      }
    }

    if (count > candidates.size) {
      throw new Error(`중복 없이 생성 가능한 닉네임은 최대 ${candidates.size}개입니다.`);
    }

    const pool = [...candidates.values()];
    const random = new SeededRandom(seed);
    // 앞에서부터 무작위로 선택해 교환하므로 재시도 없이 중복을 방지합니다.
    for (let i = 0; i < count; i++) {
      const index = i + Math.floor(random.next() * (pool.length - i));
      [pool[i], pool[index]] = [pool[index], pool[i]];
    }
    return pool.slice(0, count);
  }

  const results: GenerateResult[] = [];

  for (let i = 0; i < count; i++) {
    // 각 닉네임마다 다른 시드 사용 (옵션에 시드가 지정된 경우 기반으로)
    const seedForThisNickname = options.seed !== undefined ? options.seed + i : undefined;

    results.push(
      generateNickname({
        ...options,
        seed: seedForThisNickname,
      }),
    );
  }

  return results;
}

/**
 * 사용 가능한 형용사 목록을 반환합니다.
 */
export function getAvailableAdjectives(): string[] {
  return [...adjectives];
}

/**
 * 사용 가능한 명사 목록을 반환합니다.
 */
export function getAvailableNouns(): string[] {
  return [...nouns];
}

/**
 * 사용 가능한 과일 목록을 반환합니다.
 * @deprecated 대신 getAvailableNouns()를 사용하세요.
 */
export function getAvailableFruits(): string[] {
  return [...fruits];
}

/**
 * 사용 가능한 야채 목록을 반환합니다.
 */
export function getAvailableVegetables(): string[] {
  return [...vegetables];
}

/**
 * 가능한 닉네임 조합의 총 개수를 반환합니다.
 */
export function getTotalCombinations(options: NicknameOptions = {}): number {
  const { customAdjectives = adjectives, customNouns = nouns } = options;

  return customAdjectives.length * customNouns.length;
}

// 기본 내보내기
export default generateNickname;

// 데이터 배열도 내보내기
export { adjectives, fruits, vegetables, nouns };
