const clear = (obj: Record<string, string>, value = "") => {
  for (const key in obj) {
    obj[key] = value;
  }
};

export { clear };
