FROM node:20-slim

# create a user with permissions to run app
# --system -> create a system user/group
# this is done to avoid running the app as root
# if the app is run as root, any vulnerabilities in the app can be exploited
RUN addgroup --system app && adduser --system --ingroup app app

# set the working dir to /app
WORKDIR /app

# copy package.json and package-lock.json to the workdir
# this is done before copying the rest of the folders and files to take advantage of Docker's cache.
# if package.json and package-lock.json haven't changed, Docker will use the cached dependencies
COPY package*.json ./

# install dependencies
# npm install sometimes needs root access to write cache files, node_modules, etc.

USER root
RUN npm install next@latest
RUN npm install

# copy the rest of the files and folders
COPY . .

# sometimes the ownership of the files in the working dir is changed to root 
# and thus the app can't access the files and throws an error -> EACCES: permission denied
# to avoid this, change the ownership of the /app dir to the app user
# chown -R <user>:<group> <dir>
# chown command changes the user and/or group ownership of the given file
RUN chown -R app:app /app
# #command: sh -c "mkdir -p /app/.next && chown app:app /app/.next && npm run dev"
# set the user to run the app (dropping privileges after install step)
USER app

# Expose port to tell Docker that the container listens on the specified network port at runtime
EXPOSE 3000

# command to run the app
CMD npm run dev














# FROM node:20-slim

# create a user with permissions to run app
# -S -> create a system user
# -G -> add the user to a group
# this is done to avoid running the app as root
# if the app is run as root, any vulnerabilities in the app can be exploited

# RUN addgroup app && adduser -S -G app app if running node:20-alpine
# RUN addgroup --system app && adduser --system --ingroup app app

# set the user to run the app
# USER app

# set the working dir to /app
# WORKDIR /app

# copy package.json and package-lock.json to the workdir
# this is done before copying the rest of the folders and files to take advantage of Docker's cache.
# if package.json and package-lock.json haven't changed , Docker will use the cached dependencies
# COPY package*.json ./

# sometimes the ownership of the files in the working dir  is changed to root 
# and thus the app  cant access the files and throws an error -> EACCESS: permission denied
# to avoid this , change  the ownership of the files to the root user
# USER root

# change the ownership of the /app dir to the app user
# chown -R <user>:<group> <dir>
# chown command changes the user and/or group ownership of the given file
# RUN chown -R app:app /app

# change the user back to the app user 
# USER app

# install dependencies
# RUN npm install next@latest
# RUN npm install

# copy the reset of the files and folders
# COPY . .

# Expose port to tell Docker that the container listens on the specified network port at runtime
# EXPOSE 3000

# command to run the app
# npm run dev


