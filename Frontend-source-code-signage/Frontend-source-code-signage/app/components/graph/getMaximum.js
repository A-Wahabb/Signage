const getMaximum = data => {
  let maximum = 0;

if(!data) return 20;
  Object.keys(data).forEach(key => {
    if (data[key] > maximum) {
      maximum = data[key];
    }
  });

  return maximum;
};

export default getMaximum;
