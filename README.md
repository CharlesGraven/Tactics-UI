## Run locally

1) npm install
2) npm run dev

## To deploy

1) ssh into the server
2) navigate to /home/mern/tactics-ui
3) npm run build
4) sudo rm -rf /var/www/html/*
5) sudo cp -r dist/* /var/www/html/