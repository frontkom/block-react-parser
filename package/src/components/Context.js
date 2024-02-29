import { createContext, useContext } from 'react';
import { coreTags, coreBlocks } from '../elements';

const TxContext = createContext();

export const { Provider } = TxContext;

export function useComponentContext() {
  return useContext(TxContext);
}

export function useBlockComponent(name) {
  const { CustomBlocks = coreBlocks } = useContext(TxContext);
  return name && CustomBlocks[name];
}

export function useTagComponent(tag) {
  const { CustomTags = coreTags } = useContext(TxContext);
  return tag && CustomTags[tag];
}
