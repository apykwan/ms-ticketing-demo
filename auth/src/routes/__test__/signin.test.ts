import request from 'supertest';

import { app } from '../../app';

it('fails when an meail that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(201)

  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@test.com',
      password: 'password'
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.email).toBe('test1@test.com');
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'password'
    })
    .expect(201)

  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test2@test.com',
      password: 'adfasdf3'
    })
    .expect(400);

  expect(res.body.errors.length).toBeGreaterThan(0);
  expect(res.body.errors[0].message).toBe('Invalid Credentials');
});

it('responds with cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test3@test.com',
      password: 'password'
    })
    .expect(201)

  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test3@test.com',
      password: 'password'
    })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});