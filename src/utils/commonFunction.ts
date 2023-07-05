export const powerModulo = (x: number, y: number, z: number) => {
  let res = 1;
  let power = x % z;
  while (y > 0) {
    const b = y & 1;
    y = y >> 1;
    if (b === 1) {
      res = (res * power) % z;
    }
    power = (power * power) % z;
  }
  return res;
};

export const convertNumberToBase64 = (n: number) => {
  const stringNumber = String(n);
  return btoa(stringNumber);
};

export const convertBase64ToNumber = (str: string) => {
  return +atob(str);
};

// Thuật toán ơ clip mở rộng
export const egcd = (a: number, b: number) => {
  // b ^ -1 mod a
  a = a || 0;
  b = b || 0;
  if (a < b) {
    const tmp = a;
    a = b;
    b = tmp;
  }
  const _a = a,
    _s = [],
    _q = [],
    _r = [];
  let n = 0;
  while (b > 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    a = b;
    b = r;
    _q.push(q);
    _r.push(r);
    n++;
  }
  // init s
  _s[0] = 1;
  _s[1] = 0;

  for (let i = 2; i <= n + 1; i++) {
    _s[i] = _s[i - 2] - _q[n - i + 1] * _s[i - 1];
  }
  const result = _s[n + 1];
  return mod(result, _a);
};

const mod = (x: number, y: number) => {
  // x % y = x - y * floor(x / y)
  return x - y * Math.floor(x / y);
};
