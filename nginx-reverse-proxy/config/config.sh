#!/bin/bash

# Using environment variables to set nginx configuration
# Settings for the blog
echo "START UPDATING DEFAULT CONF"
[ -z "${BLOG_PORT_8081_TCP_ADDR}" ] && echo "\$BLOG_PORT_8081_TCP_ADDR is not set" || sed -i "s/BLOG_IP/${BLOG_PORT_8081_TCP_ADDR}/" /etc/nginx/conf.d/default.conf
[ -z "${BLOG_PORT_8081_TCP_PORT}" ] && echo "\$BLOG_PORT_8081_TCP_PORT is not set" || sed -i "s/BLOG_PORT/${BLOG_PORT_8081_TCP_PORT}/" /etc/nginx/conf.d/default.conf
[ -z "${BLOGAPI_PORT_3000_TCP_ADDR}" ] && echo "\$BLOGAPI_PORT_3000_TCP_ADDR is not set" || sed -i "s/BLOGAPI_IP/${BLOGAPI_PORT_3000_TCP_ADDR}/" /etc/nginx/conf.d/default.conf
[ -z "${BLOGAPI_PORT_3000_TCP_PORT}" ] && echo "\$BLOGAPI_PORT_3000_TCP_PORT is not set" || sed -i "s/BLOGAPI_PORT/${BLOGAPI_PORT_3000_TCP_PORT}/" /etc/nginx/conf.d/default.conf
echo "CHANGED DEFAULT CONF"
cat /etc/nginx/conf.d/default.conf
echo "END UPDATING DEFAULT CONF"

thie