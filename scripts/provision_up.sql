CREATE DATABASE le3io;
\c le3io
CREATE SCHEMA app_public;
CREATE SCHEMA app_private;
CREATE ROLE le3io_user;
ALTER USER le3io_user WITH PASSWORD 'password';
GRANT USAGE ON SCHEMA app_public, app_private to le3io_user;