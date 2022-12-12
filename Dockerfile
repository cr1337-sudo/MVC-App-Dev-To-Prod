#Project configuration 

FROM node:19
#Working directory of my container
#Every docker comand will run in this directory
WORKDIR /app
#Copy package.json in the docker container
COPY package.json .
#Run npm i to install dependecies
#Parametro leido del docker-compose a la hora de levantar el contenedor
RUN npm install 

#Copy every single file into /app (WORKDIR)
COPY . .
#Port exposing
#Default port 
ENV PORT 3000 
EXPOSE $PORT 
#Run app
# CMD ["node","index"]
