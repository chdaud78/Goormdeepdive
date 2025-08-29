export const ROUTES = {
  HOME: '/',
  MEMBER: {
    ROOT: '/member',
    PROFILE: '/member/profile',
    LIVE: '/member/live',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    MYPAGE: '/mypage',
  },
  EXCHANGE: {
    ROOT: '/exchange',
  },
  TODO: {
    ROOT: '/todo',
  },
  USER: {
    ROOT: 'USER',
  },
  POST: {
    ROOT: `/post`,
    GUESTBOOK: '/post/guestbook',
    VIEW: '/post/:postId',
  },
  NOT_FOUND: '*',
}
