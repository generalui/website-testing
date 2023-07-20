const defaultOptions = Cypress.config('defaultOptions');

const getObjectProperty = (obj, path) => {
  const pathArr = path.split('.');
  let current = obj;

  for (let i = 0; i < pathArr.length; i++) {
    if (current[pathArr[i]] === undefined) return undefined;
    current = current[pathArr[i]];
  }

  return current;
};

export const getTestOption = (options, path, defaultPath) => {
  let response = getObjectProperty(options, path);

  if (response === undefined) {
    response = getObjectProperty(defaultOptions, defaultPath);
  }

  return response;
};
