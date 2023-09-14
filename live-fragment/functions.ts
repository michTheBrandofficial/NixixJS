export const domExceptions = {
  8: 'NotFoundError',
  9: 'NotSupportedError',
};

export const DOCUMENT_FRAGMENT_NODE = 11;

export const makeDOMException = function (code: keyof typeof domExceptions) {
  const exc = Object.create(
    new Error(`${domExceptions[code]}: DOM Exception ${code}`)
  ) as Error & { code: number };

  exc.name = domExceptions[code];
  exc.code = code;

  return exc;
};

export const { slice } = new Array();

export let privateGetter = '',
  privejej = 'jfjf';
