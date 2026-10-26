import {
  generateNickname,
  generateMultipleNicknames,
  getAvailableAdjectives,
  getAvailableNouns,
  getAvailableFruits,
  getAvailableVegetables,
  getTotalCombinations,
  adjectives,
  nouns,
  fruits,
  vegetables,
} from "../index";

describe("starving-orange", () => {
  describe("generateNickname", () => {
    it("기본 닉네임을 생성해야 합니다", () => {
      const result = generateNickname();

      expect(result).toHaveProperty("nickname");
      expect(result).toHaveProperty("adjective");
      expect(result).toHaveProperty("noun");
      expect(typeof result.nickname).toBe("string");
      expect(typeof result.adjective).toBe("string");
      expect(typeof result.noun).toBe("string");
      expect(result.nickname).toBe(`${result.adjective}${result.noun}`);
    });

    it("시드를 사용하면 동일한 결과를 생성해야 합니다", () => {
      const seed = 12345;
      const result1 = generateNickname({ seed });
      const result2 = generateNickname({ seed });

      expect(result1.nickname).toBe(result2.nickname);
      expect(result1.adjective).toBe(result2.adjective);
      expect(result1.noun).toBe(result2.noun);
    });

    it("커스텀 형용사와 명사를 사용할 수 있어야 합니다", () => {
      const customAdjectives = ["멋진", "귀여운"];
      const customNouns = ["딸기", "바나나"];

      const result = generateNickname({
        customAdjectives,
        customNouns,
      });

      expect(customAdjectives).toContain(result.adjective);
      expect(customNouns).toContain(result.noun);
    });

    it("빈 배열이 주어지면 에러를 던져야 합니다", () => {
      expect(() => {
        generateNickname({ customAdjectives: [] });
      }).toThrow("형용사 배열이 비어있습니다.");

      expect(() => {
        generateNickname({ customNouns: [] });
      }).toThrow("명사 배열이 비어있습니다.");
    });

    it("띄어쓰기 있는 닉네임을 생성할 수 있어야 합니다", () => {
      const result = generateNickname({ noSpacing: false });

      expect(result).toHaveProperty("nickname");
      expect(result).toHaveProperty("adjective");
      expect(result).toHaveProperty("noun");
      expect(result.nickname).toBe(`${result.adjective} ${result.noun}`);
      expect(result.nickname).toContain(" ");
    });

    it("기본적으로는 띄어쓰기가 없는 닉네임을 생성해야 합니다", () => {
      const result = generateNickname();

      expect(result.nickname).toBe(`${result.adjective}${result.noun}`);
      expect(result.nickname).not.toContain(" ");
    });

    it("noSpacing 옵션이 true일 때는 띄어쓰기가 없어야 합니다", () => {
      const result = generateNickname({ noSpacing: true });

      expect(result.nickname).toBe(`${result.adjective}${result.noun}`);
      expect(result.nickname).not.toContain(" ");
    });

    it("시드와 noSpacing 옵션을 함께 사용할 수 있어야 합니다", () => {
      const seed = 54321;
      const result1 = generateNickname({ seed, noSpacing: false });
      const result2 = generateNickname({ seed, noSpacing: false });

      expect(result1.nickname).toBe(result2.nickname);
      expect(result1.nickname).toContain(" ");
    });
  });

  describe("generateMultipleNicknames", () => {
    const smallPool = {
      customAdjectives: ["멋진", "귀여운"],
      customNouns: ["딸기", "바나나"],
    };

    it("기본적으로 모든 조합을 중복 없이 생성해야 합니다", () => {
      const results = generateMultipleNicknames(4, smallPool);
      expect(new Set(results.map((result) => result.nickname))).toEqual(
        new Set(["멋진딸기", "멋진바나나", "귀여운딸기", "귀여운바나나"]),
      );
    });

    it("고유한 닉네임 수를 초과하면 에러를 던져야 합니다", () => {
      expect(() => generateMultipleNicknames(5, smallPool)).toThrow(
        "중복 없이 생성 가능한 닉네임은 최대 4개입니다.",
      );
    });

    it("커스텀 단어의 중복을 제외해야 합니다", () => {
      const options = { customAdjectives: ["멋진", "멋진"], customNouns: ["딸기", "딸기"] };
      expect(generateMultipleNicknames(1, options)[0].nickname).toBe("멋진딸기");
      expect(() => generateMultipleNicknames(2, options)).toThrow("최대 1개");
    });

    it("다른 단어 조합이 같은 문자열이 되어도 중복으로 처리해야 합니다", () => {
      const options = { customAdjectives: ["가", "가나"], customNouns: ["나다", "다"] };
      const results = generateMultipleNicknames(3, options);
      expect(new Set(results.map((result) => result.nickname)).size).toBe(3);
      expect(() => generateMultipleNicknames(4, options)).toThrow("최대 3개");
    });

    it("unique가 false이면 조합 수를 넘어 중복 생성할 수 있어야 합니다", () => {
      const results = generateMultipleNicknames(3, {
        customAdjectives: ["멋진"], customNouns: ["딸기"], unique: false,
      });
      expect(results.map((result) => result.nickname)).toEqual(["멋진딸기", "멋진딸기", "멋진딸기"]);
    });

    it.each([0, 12345])("시드 %s로 고유한 결과를 재현해야 합니다", (seed) => {
      const options = { ...smallPool, seed, unique: true, noSpacing: false };
      const results = generateMultipleNicknames(4, options);
      expect(results).toEqual(generateMultipleNicknames(4, options));
      expect(new Set(results.map((result) => result.nickname)).size).toBe(4);
      results.forEach((result) => expect(result.nickname).toBe(`${result.adjective} ${result.noun}`));
    });

    it.each([NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1])("잘못된 개수 %s를 거부해야 합니다", (count) => {
      expect(() => generateMultipleNicknames(count)).toThrow("개수는 유한한 안전 정수여야 합니다.");
    });

    it.each([true, false])("unique=%s에서도 빈 단어 배열을 거부해야 합니다", (unique) => {
      expect(() => generateMultipleNicknames(1, { unique, customAdjectives: [] })).toThrow("형용사 배열이 비어있습니다.");
      expect(() => generateMultipleNicknames(1, { unique, customNouns: [] })).toThrow("명사 배열이 비어있습니다.");
    });

    it("여러 개의 닉네임을 생성해야 합니다", () => {
      const count = 5;
      const results = generateMultipleNicknames(count);

      expect(results).toHaveLength(count);
      results.forEach((result) => {
        expect(result).toHaveProperty("nickname");
        expect(result).toHaveProperty("adjective");
        expect(result).toHaveProperty("noun");
      });
    });

    it("0 이하의 개수가 주어지면 에러를 던져야 합니다", () => {
      expect(() => {
        generateMultipleNicknames(0);
      }).toThrow("개수는 1 이상이어야 합니다.");

      expect(() => {
        generateMultipleNicknames(-1);
      }).toThrow("개수는 1 이상이어야 합니다.");
    });

    it("시드를 사용하면 재현 가능한 결과를 생성해야 합니다", () => {
      const seed = 12345;
      const count = 3;

      const results1 = generateMultipleNicknames(count, { seed });
      const results2 = generateMultipleNicknames(count, { seed });

      expect(results1).toEqual(results2);
    });
  });

  describe("getAvailableAdjectives", () => {
    it("형용사 배열을 반환해야 합니다", () => {
      const result = getAvailableAdjectives();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(adjectives);
    });

    it("원본 배열을 수정하지 않도록 복사본을 반환해야 합니다", () => {
      const result = getAvailableAdjectives();
      result.push("새로운 형용사");

      expect(getAvailableAdjectives()).not.toContain("새로운 형용사");
    });
  });

  describe("getAvailableNouns", () => {
    it("명사 배열을 반환해야 합니다", () => {
      const result = getAvailableNouns();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(nouns);
    });

    it("원본 배열을 수정하지 않도록 복사본을 반환해야 합니다", () => {
      const result = getAvailableNouns();
      result.push("새로운 명사");

      expect(getAvailableNouns()).not.toContain("새로운 명사");
    });
  });

  describe("getAvailableFruits", () => {
    it("과일 배열을 반환해야 합니다", () => {
      const result = getAvailableFruits();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(fruits);
    });

    it("원본 배열을 수정하지 않도록 복사본을 반환해야 합니다", () => {
      const result = getAvailableFruits();
      result.push("새로운 과일");

      expect(getAvailableFruits()).not.toContain("새로운 과일");
    });
  });

  describe("getAvailableVegetables", () => {
    it("야채 배열을 반환해야 합니다", () => {
      const result = getAvailableVegetables();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(vegetables);
    });

    it("원본 배열을 수정하지 않도록 복사본을 반환해야 합니다", () => {
      const result = getAvailableVegetables();
      result.push("새로운 야채");

      expect(getAvailableVegetables()).not.toContain("새로운 야채");
    });
  });

  describe("getTotalCombinations", () => {
    it("총 조합 수를 계산해야 합니다", () => {
      const total = getTotalCombinations();
      const expected = adjectives.length * nouns.length;

      expect(total).toBe(expected);
    });

    it("커스텀 배열로 총 조합 수를 계산해야 합니다", () => {
      const customAdjectives = ["멋진", "귀여운"];
      const customNouns = ["딸기", "바나나", "사과"];

      const total = getTotalCombinations({
        customAdjectives,
        customNouns,
      });

      expect(total).toBe(customAdjectives.length * customNouns.length);
    });
  });

  describe("데이터 검증", () => {
    it("형용사 배열이 비어있지 않아야 합니다", () => {
      expect(adjectives.length).toBeGreaterThan(0);
      adjectives.forEach((adjective) => {
        expect(typeof adjective).toBe("string");
        expect(adjective.trim()).toBe(adjective);
        expect(adjective.length).toBeGreaterThan(0);
      });
    });

    it("명사 배열이 비어있지 않아야 합니다", () => {
      expect(nouns.length).toBeGreaterThan(0);
      nouns.forEach((noun) => {
        expect(typeof noun).toBe("string");
        expect(noun.trim()).toBe(noun);
        expect(noun.length).toBeGreaterThan(0);
      });
    });

    it("과일 배열이 비어있지 않아야 합니다", () => {
      expect(fruits.length).toBeGreaterThan(0);
      fruits.forEach((fruit) => {
        expect(typeof fruit).toBe("string");
        expect(fruit.trim()).toBe(fruit);
        expect(fruit.length).toBeGreaterThan(0);
      });
    });

    it("야채 배열이 비어있지 않아야 합니다", () => {
      expect(vegetables.length).toBeGreaterThan(0);
      vegetables.forEach((vegetable) => {
        expect(typeof vegetable).toBe("string");
        expect(vegetable.trim()).toBe(vegetable);
        expect(vegetable.length).toBeGreaterThan(0);
      });
    });

    it("중복된 형용사가 없어야 합니다", () => {
      const uniqueAdjectives = [...new Set(adjectives)];
      expect(uniqueAdjectives.length).toBe(adjectives.length);
    });

    it("중복된 명사가 없어야 합니다", () => {
      const uniqueNouns = [...new Set(nouns)];
      expect(uniqueNouns.length).toBe(nouns.length);
    });

    it("중복된 과일이 없어야 합니다", () => {
      const uniqueFruits = [...new Set(fruits)];
      expect(uniqueFruits.length).toBe(fruits.length);
    });

    it("중복된 야채가 없어야 합니다", () => {
      const uniqueVegetables = [...new Set(vegetables)];
      expect(uniqueVegetables.length).toBe(vegetables.length);
    });
  });
});
