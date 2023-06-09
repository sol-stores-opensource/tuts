export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ref: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/21963136#21963136
export function uuid() {
  var u = '',
    m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    i = 0,
    rb = (Math.random() * 0xffffffff) | 0;

  while (i++ < 36) {
    var c = m[i - 1],
      r = rb & 0xf,
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    u += c === '-' || c === '4' ? c : v.toString(16);
    rb = i % 8 === 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
  }
  return u;
}
