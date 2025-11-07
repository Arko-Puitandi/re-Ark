// src/core/cx.ts
/**
 * cx - very small className combiner
 * Accepts strings, falsy values, arrays, and objects
 *
 * Examples:
 *  cx('a', undefined, false, 'b') => "a b"
 *  cx('btn', { active: isActive, disabled: false }) => "btn active"
 */
type ClassValue = string | number | undefined | null | false | ClassDictionary | ClassArray;
interface ClassDictionary { [key: string]: any }
interface ClassArray extends Array<ClassValue> {}

export function css(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

export function cx(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const process = (val: ClassValue) => {
    if (!val) return;
    if (typeof val === 'string' || typeof val === 'number') {
      out.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(process);
      return;
    }
    if (typeof val === 'object') {
      for (const k in val as ClassDictionary) {
        if ((val as ClassDictionary)[k]) out.push(k);
      }
    }
  };

  inputs.forEach(process);
  return out.join(' ');
}
