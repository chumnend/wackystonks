export const color = {
  black: '#292f36',
  white: '#fff',
  grey: '#c2c2c2',
  lightblue: '#64b5f6',
  lightred: '#ff8484',

  hexToRGBA: (hex: string, alpha: string) => {
    if (!hex || [4, 7].indexOf(hex.length) === -1) {
      return;
    }

    hex = hex.substr(1);
    if (hex.length === 3) {
      hex
        .split('')
        .map((el) => {
          return el + el + '';
        })
        .join('');
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    if (alpha !== undefined) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  },
};
