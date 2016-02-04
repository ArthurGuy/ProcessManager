set -e

echo 'Running PHPUnit tests'
vendor/bin/phpunit -c phpunit.xml --log-junit=junit.xml
