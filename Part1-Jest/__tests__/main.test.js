const formatVolumeIconPath = require("../assets/scripts/main");
describe("Test formatVolumeIconPath", () => {
  test("Test volume > 66", () => {
    const correctVal = `./assets/media/icons/volume-level-${3}.svg`
    expect(formatVolumeIconPath(98)).toBe(correctVal);
    expect(formatVolumeIconPath(67)).toBe(correctVal);
  });
  test("Test volume > 33", () => {
    const correctVal = `./assets/media/icons/volume-level-${2}.svg`
    expect(formatVolumeIconPath(34)).toBe(correctVal);
    expect(formatVolumeIconPath(65)).toBe(correctVal);
  });
  test("Test volume > 0", () => {
    const correctVal = `./assets/media/icons/volume-level-${1}.svg`
    expect(formatVolumeIconPath(1)).toBe(correctVal);
    expect(formatVolumeIconPath(32)).toBe(correctVal);
  });
  test("Test volume == 0 (else branch)", () => {
    const correctVal = `./assets/media/icons/volume-level-${0}.svg`
    expect(formatVolumeIconPath(0)).toBe(correctVal);
  });
});