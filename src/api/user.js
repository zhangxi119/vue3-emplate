import Encrypt from '@thales/encrypt';
import { msHttp, bfsSsoHttp, otmsHttp } from '@/utils/http';
import Auth from '@/constant/auth';

// login
export function loginAfter(data) {
  return bfsSsoHttp.request({
    url: '/unify_login',
    method: 'post',
    data,
  });
}

export function login(data) {
  // 密码RSA加密
  const encrypt = new Encrypt();
  encrypt.setPublicKey(Auth.PUBLIC_KEY);// 此处为RSA公钥

  const params = {
    identifier: data.email,
    credential: encrypt.encrypt(data.password),
    clientCode: Auth.CLIENT_CODE,
    loginType: Auth.LOGIN_TYPE,
    loginAuth: Auth.LOGIN_AUTH,
    identityType: Auth.IDENTITY_TYPE,
    ignoreEncrypt: Auth.IGNORE_ENCRYPT,
  };
  return loginAfter(params);
}

// user list
export function userList(data) {
  return msHttp.request({
    url: '/user/list',
    method: 'post',
    data,
  });
}

// user set role
export function userSetRole(data) {
  return msHttp.request({
    url: '/user/setRole',
    method: 'post',
    data,
  });
}

export function fetchMenuTree(data) {
  return otmsHttp.request({
    url: '/permission-plus/function/menu/system/tree',
    method: 'post',
    data,
  });
}
