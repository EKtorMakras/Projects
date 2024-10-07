export function getItemLs(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setItemLs(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function updateItemLs(key, property, value) {
  const obj = getItemLs(key);

  if (obj) {
    obj[property] = value;
    setItemLs(key, obj);
  } else {
    setItemLs(key, {
      [property]: value,
    });
  }
}
