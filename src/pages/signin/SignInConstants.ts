const SOCIAL_LOGIN = [
  {
    id: 1,
    type: 'ravelry',
  },
  {
    id: 2,
    type: 'google',
  },
  {
    id: 3,
    type: 'kakao',
  },
  {
    id: 4,
    type: 'naver',
  },
] as const;

const ERROR_MESSAGE = {
  EMAIL: '이메일 형식이 올바르지 않습니다.',
  PASSWORD: '비밀번호는 6글자 이상 입력해주세요.',
  PASSWORDCONFIRM: '비밀번호가 일치하지 않습니다.',
} as const;

const LOGIN = '로그인' as const;

const SIGNUP = {
  MESSAGE: 'froggy는 처음이신가요?',
  SIGNUP: '회원가입',
} as const;

const REG_EXP = {
  EMAIL:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  PASSWORD: /.{6,}/,
} as const;

export { SOCIAL_LOGIN, ERROR_MESSAGE, LOGIN, SIGNUP, REG_EXP };
