import request from 'supertest';

import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testSignout@test.com',
      password: 'password'
    });

  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  const cookie = res.get('Set-Cookie');
  if (!cookie) throw new Error('Expected cookie  but get undefined');

  expect(cookie[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});