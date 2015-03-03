#!/bin/sh

if [ "$1" = "/bin/sh" ]; then
  shift
fi

if [ -n "$APP_URL" ]; then
  FWD="`echo $APP_URL | sed 's|^tcp://||'`"
fi

ARGS=""

if [ -n "$NGROK_AUTH" ]; then
  ARGS="-authtoken=$NGROK_AUTH "
fi

if [ -n "$NGROK_CONFIG" ]; then
  ARGS="$ARGS -config=$NGROK_CONFIG "
fi

if [ -n "$NGROK_LOG" ]; then
  ARGS="$ARGS -log $NGROK_LOG "
fi

# Set the subdomain or hostname, depending on which is set
if [ -n "$NGROK_HOSTNAME" ] && [ -n "$NGROK_AUTH" ]; then
  ARGS="$ARGS -hostname $NGROK_HOSTNAME "
elif [ -n "$NGROK_SUBDOMAIN" ] && [ -n "$NGROK_AUTH" ]; then
  ARGS="$ARGS -subdomain $NGROK_SUBDOMAIN "
elif [ -n "$NGROK_HOSTNAME" ] || [ -n "$NGROK_SUBDOMAIN" ]; then
  if [ -z "$NGROK_AUTH" ]; then
  	echo "You must specify an authentication token after registering at https://ngrok.com to use custom domains."
    exit 1
  fi
fi

if [ "$NGROK_PROTOCOL" == "TCP" ]; then
  ARGS="$ARGS -proto=tcp "
fi

if [ -n "$NGROK_USERNAME" ] && [ -n "$NGROK_PASSWORD" ] && [ -n "$NGROK_AUTH" ]; then
  ARGS="$ARGS -httpauth=\"$NGROK_USERNAME:$NGROK_PASSWORD\" "
elif [ -n "$NGROK_USERNAME" ] || [ -n "$NGROK_PASSWORD" ]; then
  if [ -z "$NGROK_AUTH" ]; then
  	echo "You must specify a username, password, and Ngrok authentication token to use the custom HTTP authentication."
    echo "Sign up for an authentication token at https://ngrok.com"
    exit 1
  fi
fi

case "$1" in
  -h|help)  ARGS=$1 ;;
  *)        ARGS="$ARGS $* $FWD" ;;
esac

env
echo $ARGS

exec /bin/ngrok $ARGS
