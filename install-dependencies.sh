#!/usr/bin/env bash
set -e

env=${APP_ENV:-production}

if [ "$env" != "local" ]; then
    exec npm install  --only=production
else
    exec npm install
fi

if [ "$env" == "local" ] && [ ! -z "$DEV_UID" ]; then
    echo "Changing www-data UID to $DEV_UID"
    echo "The UID should only be changed in development environments."
    usermod -u $DEV_UID www-data
fi
