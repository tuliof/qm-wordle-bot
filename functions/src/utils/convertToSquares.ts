//
function convert(colors: string[]): string {
  const squares = colors.map((color) => {
    switch (color) {
      case "green":
        return ":large_green_square:";
      case "yellow":
        return ":large_yellow_square:";
      case "grey":
        return ":black_large_square:";
      default:
        return ":black_large_square:";
    }
  });
  return squares.join("");
}
export function blankSquares() {
  return [...Array(5)]
    .map(() => {
      return ":white_large_square:";
    })
    .join("");
}

export default convert;
