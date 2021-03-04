FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN printf "#!/bin/sh \n\
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p \n\
exec npm run start \n\
" > /app/entry.sh

RUN chmod +x /app/entry.sh

ENTRYPOINT ["/app/entry.sh"]
