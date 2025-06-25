const {
  generateNickname,
  generateMultipleNicknames,
  getAvailableAdjectives,
  getAvailableNouns,
  getAvailableFruits,
  getAvailableVegetables,
  getTotalCombinations,
} = require("../dist/index.js");

console.log("🍊 Starving Orange Example\n");

// 1. 기본 닉네임 생성
console.log("1. 기본 닉네임 생성:");
const basicResult = generateNickname();
console.log(`   닉네임: ${basicResult.nickname}`);
console.log(`   형용사: ${basicResult.adjective}`);
console.log(`   명사: ${basicResult.noun}\n`);

// 2. 여러 개 닉네임 생성
console.log("2. 여러 개 닉네임 생성:");
const multipleResults = generateMultipleNicknames(5);
multipleResults.forEach((result, index) => {
  console.log(`   ${index + 1}. ${result.nickname}`);
});
console.log();

// 3. 커스텀 단어 사용
console.log("3. 커스텀 단어 사용:");
const customResult = generateNickname({
  customAdjectives: ["멋진", "귀여운", "신비한", "똑똑한"],
  customNouns: ["딸기", "바나나", "망고", "체리"],
});
console.log(`   커스텀 닉네임: ${customResult.nickname}\n`);

// 4. 시드 사용
console.log("4. 시드를 사용한 재현 가능한 생성:");
const seed = 12345;
const seededResult1 = generateNickname({ seed });
const seededResult2 = generateNickname({ seed });
console.log(`   첫 번째: ${seededResult1.nickname}`);
console.log(`   두 번째: ${seededResult2.nickname}`);
console.log(
  `   동일한가? ${seededResult1.nickname === seededResult2.nickname}\n`
);

// 5. 통계 정보
console.log("5. 통계 정보:");
console.log(`   형용사 개수: ${getAvailableAdjectives().length}개`);
console.log(`   명사 개수: ${getAvailableNouns().length}개`);
console.log(`   - 과일: ${getAvailableFruits().length}개`);
console.log(`   - 야채: ${getAvailableVegetables().length}개`);
console.log(
  `   총 가능한 조합: ${getTotalCombinations().toLocaleString()}가지\n`
);

// 6. 연속 생성 예제
console.log("6. 10개 연속 생성:");
for (let i = 0; i < 10; i++) {
  const result = generateNickname();
  console.log(`   ${result.nickname}`);
}

// 7. 띄어쓰기 없는 닉네임 생성
console.log("\n7. 띄어쓰기 없는 닉네임 생성:");
const noSpaceResults = generateMultipleNicknames(5, { noSpacing: true });
noSpaceResults.forEach((result, index) => {
  console.log(`   ${index + 1}. ${result.nickname}`);
});
