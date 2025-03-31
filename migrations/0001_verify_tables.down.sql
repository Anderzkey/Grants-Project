-- Remove grants first (because it references users)
DROP TABLE IF EXISTS grants;

-- Then remove users
DROP TABLE IF EXISTS users;