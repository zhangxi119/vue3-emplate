const components = [];

const install = (app) => {
  components.forEach((item) => {
    app.use(item);
  });
};

export default {
  install,
};
