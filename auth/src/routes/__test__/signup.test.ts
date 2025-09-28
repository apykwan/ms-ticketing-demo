import request from 'supertest';

import { app } from '../../app';

it('returns a 201 on successful signup', async() => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.email).toBe('test@test.com');
});

it('returns a 400 with an invalid email', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    
  expect(res.statusCode).toBe(400);
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors[0].message).toBe('Email must be provided');
  expect(res.body.errors[0].field).toBe('email');
});

it('returns a 400 with an invalid password', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: ''
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toBe('Password must be between 4 and 20 characters');
    expect(res.body.errors[0].field).toBe('password');
});

it('returns a 400 with an invalid email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400);
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: ''
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    });
    
  expect(res.statusCode).toBe(400);
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors[0].message).toBe('Email in use');
});

it('sets acookie after successful signup', async() => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'password'
    });

  expect(res.statusCode).toBe(201);
  expect(res.get('Set-Cookie')).toBeDefined();
});