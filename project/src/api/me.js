import { api } from '@/api/http.js'

export const me = {
  get: () => api.get('/me'),
  // 프로필 수정
  patchMe: async (updatedProfile) => api.patch('/me', updatedProfile),
  // 비밀번호 변경
  changePassword: async ({ currentPassword, newPassword }) =>
    api.patch('/me/change-password', {
      currentPassword,
      newPassword,
    }),
}
