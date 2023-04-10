import { ISignUpFormInput } from 'src/pages/signup/SignUp';
import { publicApi } from 'src/apis/authApi';

export async function postCheckEmail(data: ISignUpFormInput) {
  const response = await publicApi.post('/api/v1/auth/email/isexist', {
    email: data.email,
  });
  return response;
}

export async function postRegister(data: ISignUpFormInput) {
  const response = await publicApi.post('/api/v1/auth/email/register', {
    email: data.email,
    password: data.password,
    enrollType: 'local',
  });
  return response;
}
