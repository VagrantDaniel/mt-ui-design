import React from 'react'

interface DebounceOptions<T extends any[]> {
    delay?: number
    immediate?: (...args: T) => boolean
}

export function useDebounce<T extends any[]>(
    fn: (...args: T) => void,
    options?: DebounceOptions<T>,
  ): (...args: T) => void {
    let handle: any
  
    return function handler(...args: T): void {
      clearTimeout(handle)
  
      if (options?.immediate?.(...args)) {
        fn(...args)
      } else {
        handle = setTimeout(
          () => fn(...args),
          options?.delay ?? 100,
        )
      }
    }
}

// 执行交叉观察器
export function lazyLoad(_el: Element, callback: () => void): void {
  const io = new IntersectionObserver(
      (ioes: IntersectionObserverEntry[]) => {
        ioes.forEach(ioe => {
          const el = ioe.target
          const intersectionRatio = ioe.intersectionRatio
          if (intersectionRatio > 0 && intersectionRatio <= 1) {
            callback()

            io.unobserve(el)
          }

          el?.addEventListener('load', () => {
            io.unobserve(el)
          })

          el?.addEventListener('error', () => {
            io.unobserve(el)
          })
        })
      },
  )

  io.observe(_el)
}

// @ts-ignore
import loadable from '@loadable/component';

function LoadingComponent(props: any) {
  if (props.error) {
    console.error(props.error);
    return null;
  }
  return (
    <div className="ac-spin-wrapper">
      Error
    </div>
  );
}

export function load(fn: any) {
  const Component = loadable(fn, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  });

  Component.preload = fn.requireAsync || fn;

  return Component;
}