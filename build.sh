set -e

echo 'Installing PHP dependencies'
curl -sS https://getcomposer.org/installer | php
php composer.phar install


echo 'npm install - Installing node packages'
npm install --production


echo 'gulp build - Building assets'
gulp build --production
