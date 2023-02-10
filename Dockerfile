FROM urielch/opencv-nodejs:6.2.6

RUN apt-get update && \
    apt-get install -qy \
    cmake build-essential software-properties-common

WORKDIR /usr/src/app

COPY package* .

RUN npm i -g npm typescript
RUN npm remove @u4/opencv4nodejs
RUN npm install --force
RUN npm link @u4/opencv4nodejs

COPY . .
