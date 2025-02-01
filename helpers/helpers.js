// find grid location of ghost or pacman
export const getElementPosition = (element, boardLayout) => {
  let x, y;
  try {
    y = boardLayout.findIndex((row) => row.includes(element));
    x = boardLayout[y].indexOf(element);
  } catch (e) {
    if (e.name == "TypeError") return false;
  }
  return { x, y };
};
