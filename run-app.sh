#!/usr/bin/env bash
set -e

role=${CONTAINER_ROLE:-app}
env=${APP_ENV:-production}

if [ "$env" == "local" ] && [ ! -z "$DEV_UID" ]; then
    echo "Changing www-data UID to $DEV_UID"
    echo "The UID should only be changed in development environments."
    usermod -u $DEV_UID www-data
fi

echo "Role is $role..."

if [ $role == "app" ]; then
    echo "Initializing the node app"
    exec node index
    exit 0
else
    echo "Could not start conteiner role $role"
    exit 1
fi

