type ClassNamesArg = string | string[] | { [key: string]: any } | undefined | null | boolean;

const opt = Object.prototype.toString;

function warning(condition: unknown, message: string) {
    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && console) {
      if (condition) {
        console.error(`[mt-ui]: ${message}`);
      }
    }
}

export function isArray(obj: any): obj is any[] {
    return opt.call(obj) === '[object Array]';
}

export function isString(obj: any): obj is string {
    return opt.call(obj) === '[object String]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
    return opt.call(obj) === '[object Object]';
}

export default function (...args: ClassNamesArg[]): string {
    const length = args.length;
    let classNames: string[] = [];
    for (let i = 0; i < length; i++) {
      const v = args[i];
      if (!v) {
        continue;
      }
      if (isString(v)) {
        classNames.push(v);
      } else if (isArray(v)) {
        classNames = classNames.concat(v);
      } else if (isObject(v)) {
        Object.keys(v).forEach((k) => {
          if (v[k]) {
            classNames.push(k);
          }
        });
      } else {
        warning(true, 'arguments must be one of string/array/object.');
      }
    }
    return [...new Set(classNames)].join(' ')
}