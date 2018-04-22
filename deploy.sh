#!/bin/bash

export PORT=5120
export MIX_ENV=prod
export GIT_PATH=/home/imdbae/src/imdbae

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "imdbae" ]; then
	echo "Error: must run as user 'imdbae'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
mix ecto.create
mix ecto.migrate

(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/imdbae ]; then
	echo mv ~/www/imdbae ~/old/$NOW
	mv ~/www/imdbae ~/old/$NOW
fi

mkdir -p ~/www/imdbae
REL_TAR=~/src/imdbae/_build/prod/rel/imdbae/releases/0.0.1/imdbae.tar.gz
(cd ~/www/imdbae && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/imdbae/src/imdbae/start.sh
CRONTAB

#. start.sh
