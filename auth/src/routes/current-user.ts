import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('John Doe');
});


export { router as currentUserRouter };