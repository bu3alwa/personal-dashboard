db.auth('admin', 'password')

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'next',
    },
  ],
});
