#!/bin/sh

for i in {1..100000}
do
        curl --data "login=$i&lat=50&lng=50" https://glacial-reef-86301.herokuapp.com/sendLocation
done