import SignIn from '@/modules/auth/components/SignIn';
import SignUp from '@/modules/auth/components/SignUp';

export const authRouter = [
  {
    path: '/sign-in',
    name: 'signIn',
    component: SignIn,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: SignUp,
    meta: {
      guestOnly: true
    }
  }
];
