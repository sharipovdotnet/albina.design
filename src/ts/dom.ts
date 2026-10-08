/**
 * Достаёт элемент и падает с внятной ошибкой, если его нет в разметке: иначе
 * отсутствующий узел всплыл бы позже как `null is not an object` в чужом месте.
 */
export function requireElement<T extends Element>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector);

  if (element === null) {
    throw new Error(`Не найден элемент ${selector}`);
  }

  return element;
}
