import creatHttp from './creatHttp';

const bigDataHttp = creatHttp(import.meta.env.VITE_BIGDATA_SERVER);

export {
  bigDataHttp,
};
