#!/bin/bash

HOST="http://localhost:3000"

# post user
# URL="$HOST/users"
# curl -d '{"userId": "8675309@bluehost", "brand": "jennysnumber.com"}' -H "Content-Type: application/json" -X POST $URL
# echo "\n"

# get user
URL="$HOST/users/8675309@bluehost"
curl -H "Content-Type: application/json" -X GET $URL

