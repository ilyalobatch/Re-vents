export const delay = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};

export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const createDataTree = (dataset) => {
  let hashtable = Object.create(null);
  let dataTree = [];
  dataset.forEach((item) => (hashtable[item.id] = { ...item, childNodes: [] }));
  dataset.forEach((item) => {
    if (item.parentId) {
      hashtable[item.parentId].childNodes.push(hashtable[item.id]);
    } else {
      dataTree.push(hashtable[item.id]);
    }
  });

  return dataTree;
};
