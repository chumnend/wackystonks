const generateCode = (length = 4): string => {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
};

export default generateCode;
