git reset --hard
git pull -X theirs

cd client/
npm run build
cd ..

pm2 startOrReload ecosystem.config.js
