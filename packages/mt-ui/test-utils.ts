import { render as ORender, RenderOptions } from '@testing-library/react'
import React from 'react';

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
    const wrapper = {
      ...ORender(ui, {
        // container: document.body,
        ...options,
      }),
    } as ReturnType<typeof ORender> & {
      querySelector: <T extends HTMLElement | SVGElement>(selector: string) => T | null;
      querySelectorAll: <T extends HTMLElement | SVGElement>(selector: string) => NodeListOf<T>;
      find: <E extends HTMLElement | SVGElement>(selector: string) => NodeListOf<E>;
    };
  
    wrapper.find = <E extends Element>(selector: any) => {
      return document.querySelectorAll<E>(selector);
    };
    wrapper.querySelector = <T extends Element>(selector: any) => {
      return document.querySelector<T>(selector);
    };
    wrapper.querySelectorAll = <T extends Element>(selector: any) => {
      return document.querySelectorAll<T>(selector);
    };
  
    return wrapper;
  };