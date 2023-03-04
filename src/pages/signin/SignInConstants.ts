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

const LOGIN = {
  LOGIN: '로그인',
  MESSAGE: {
    422: '가입되지 않은 이메일이거나 비밀번호를 잘못 입력했습니다.',
    401: '이메일 인증이 완료되지 않은 이메일입니다. 이메일 인증 후 다시 시도해주세요.',
    ETC: '예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
} as const;

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
