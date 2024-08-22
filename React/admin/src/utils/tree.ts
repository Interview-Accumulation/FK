import { chain } from 'ramda';

/**
 * Flatten tree data
 * @param trees tree data
 * @returns flatten tree data
 * @example
 * flattenTrees([
 *  {
 *   id: 1,
 *   children: [{id: 2,children: [{id: 3}]}],
 *  }
 * ]);
 * // => [{ id: 1 }, { id: 2 }, { id: 3 }]
 * 
 * 
 */
export function flattenTrees<T extends { children?: T[] }>(trees: T[] = []): T[] {
  return chain((node) => {
    const children = node.children || [];
    return [node, ...flattenTrees(children)];
  }, trees);
}