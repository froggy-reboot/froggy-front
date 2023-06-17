import React, {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
} from 'react';

export const useDidUpdateEffect = (
  callback: EffectCallback,
  deps: DependencyList,
) => {
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) callback();
    else mountRef.current = true;
  }, deps);
};
