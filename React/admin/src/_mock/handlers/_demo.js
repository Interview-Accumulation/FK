import { http, HttpResponse } from 'msw';

import { DemoApi } from '@/api/service/demoService';

const mockTokenExpired = http.post(`/api${DemoApi.TOKEN_EXPIRED}`, () => {
  return new HttpResponse(null, {status: 401})
});

export default [mockTokenExpired];
