#!/bin/bash

echo "This script will create a swapfile of 1GB with block size 1MB and make it permanent"

# check swap status
echo "Checking swap status"
echo "---------------------------"
sudo swapon --show
echo "Checking free space"
echp "---------------------------"
free -h
echo "Checking disk space"
echo "---------------------------"
df -h


read -p "Do you want to continue? (y/n) " answer
if [[ $answer != y && $answer != Y ]]; then
    exit
fi

# create a swapfile of 1GB with block size 1MB
# ask space to user
# set default value of swapsize to 1
swapsize=1
read -p "Enter the size of swapfile in GB: " swapsize
# check if swapsize is not null and is numeric, if not then exit
if [[ -z $swapsize || ! $swapsize =~ ^[0-9]+$ ]]; then
    echo "Invalid input"
    exit
fi
# check whether want to continue for swapsize with value input by user
read -p "Do you want to continue with swapsize=$swapsize? (y/n) " answer
if [[ $answer != y && $answer != Y ]]; then
    exit
fi

echo "Creating swapfile of size $swapsize GB"
echo "---------------------------"
sudo fallocate -l ${swapsize}G /swapfile
echo "verify swapfile"
echo "---------------------------"
ls -lh /swapfile

# change permission of swapfile
echo "Changing permission of swapfile"
echo "---------------------------"
sudo chmod 600 /swapfile
echo "verify swapfile"
echo "---------------------------"
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
free -h

read -p "Do you want to continue? (y/n) " answer
if [[ $answer != y && $answer != Y ]]; then
    exit
fi

# make the swapfile permanent
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# change swappiness
# check if swappiness is not null and is numeric, if not then exit
# set default value of swappiness to 10
cat /proc/sys/vm/swappiness
swappiness=10
read -p "Enter the value of swappiness (1-100): " swappiness
if [[ -z $swappiness || ! $swappiness =~ ^[0-9]+$ ]]; then
    echo "Invalid input"
    exit
fi
# check whether want to continue for swappiness with value input by user
read -p "Do you want to continue with swappiness=$swappiness? (y/n) " answer
if [[ $answer != y && $answer != Y ]]; then
    exit
fi

# set swappiness
sudo systcl vm.swappiness=$swappiness
# check whether swappiness is set or not
cat /proc/sys/vm/swappiness
# add vm.swapiness=10 to /etc/sysctl.conf
echo 'vm.swappiness=$swappiness' | sudo tee -a /etc/sysctl.conf

# change cache pressure
cat /proc/sys/vm/vfs_cache_pressure
# set default value of cache pressure to 50
cache_pressure=50
read -p "Enter the value of cache pressure (1-100): " cache_pressure
if [[ -z $cache_pressure || ! $cache_pressure =~ ^[0-9]+$ ]]; then
    echo "Invalid input"
    exit
fi

# check whether want to continue for cache pressure with value input by user
read -p "Do you want to continue with cache_pressure=$cache_pressure? (y/n) " answer
if [[ $answer != y && $answer != Y ]]; then
    exit
fi

# set cache pressure
sudo systcl vm.vfs_cache_pressure=$cache_pressure
# check whether cache pressure is set or not
cat /proc/sys/vm/vfs_cache_pressure
# add vm.vfs_cache_pressure=50 to /etc/sysctl.conf
echo 'vm.vfs_cache_pressure=$cache_pressure' | sudo tee -a /etc/sysctl.conf
