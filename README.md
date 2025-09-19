# DevTinder-Web

- create vite + react application
- remove the unwanted code
- install tailwind 
- install daisyUI
- add a navbar
- install react-router-dom
- create BrowserRouter, Routes, Route = /Body > RouteChildren
- create Outlet;
- create footer;

- Login
    - UI + API integrated
    - install axios
    - Solve CORS - install cords in the BE, add middleware with 
    - configuration- origin, credentials:true
    - Get Token in the cookies
    
- Redux State Management
    - install redux toolkit - npm install @reduxjs/toolkit react-redux
    - configure Store - privide the store
    - create slice - add reducer to store  
    - setup extension - npm install --save-dev @redux-devtools/core
    - confirgure the extension. - devTools: process.env.NODE_ENV !== 'production',
  
- Security Check
    - token based Login

- Logout Feature

- GET the feed
- Add the feed in the store

- Edit Profile
- Feed 

- Connections (send and accepted) and (recieved and accepted)

- Requests recieved (sent connections)

- Send Connection
- Ignore Connection

- Sign-Up Api

- Page Title


# Deployment
- Set-up on aws
- Launch an instance
- create a key-value pair
- change the permisions
- chmod 400 <secret>.pem
- connected to the machine using SSH
- ssh -i "matchify-secret.pem" ubuntu@ec2-13-51-64-223.eu-north-1.compute.amazonaws.com
- install node version 22.17.1 
- git clone
- Frontend
    - npm i -> installs the dependencies
    - npm run build -> creates dist folder
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to nginx http server(/var/www/html) with below command
    - sudo scp -r dist/* /var/www/html
    - Enable port :80 of your instance
- Backend
    - allowed EC2 instance public IP on mongodb server
    - installed pm2 -> npm install pm2 -g 
    - start the process -> pm2 start npm -- start
    - pm2 logs          -> to check the logs
    - pm2 flush <name>  -> to clear logs    
    - pm2 list          -> to get the list of processes
    - pm2 stop <name>   -> to stop the process
    - pm2 delete <name> -> to delete the process


- BackEnd : http://13.51.64.223:3000/feed
- FrontEnd : http://13.51.64.223

- sudo nano /etc/nginx/sites-available/default -> get the config file to edit this
- add server and location
- server_name 13.51.64.223;
- location /api/ {
                 proxy_pass http://localhost:3000/;
                 proxy_http_version 1.1;
                 proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                 proxy_set_header Host $host;
                 proxy_cache_bypass $http_upgrade;
                }
- sudo systemctl restart nginx ->  restart the nginx
- Modify the BASE_URL in the FE repo to /api
    

- Coverage
    npm test -- --coverage
   

    

 