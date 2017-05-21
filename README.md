# awoolife

Site source behind [awoo.life](https://awoo.life)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Dependencies
  * **[Node.JS](https://nodejs.org)** (including npm)
  * **PHP** (minimum v5.6)

### How to use

First you need to install NodeJS. This depends on your OS type. 
Check out this [install guide](https://howtonode.org/how-to-install-nodejs)

Next you need to install the dependencies with `npm install`

Now you just need to compile the assets by simply running `gulp`

And you're done! Point the webserver root to the `public` directory.

This is an example nginx config:
````nginx
   server {
           listen 80;
           root /path/to/repo/public;
           index index.php;
           location / {
                   try_files $uri $uri/ /index.php?$query_string;
           }
           location ~*  \.(jpg|jpeg|png|gif|ico|css|js)$ {
                   expires 365d;
           }
   }
````

### Notes

This Project includes:
   * [Low Polygon Wolf](http://imgur.com/gallery/bRzwz) by [P1tchB1ack](http://imgur.com/user/P1tchB1ack) on imgur
   * Foreground and background graphics by [sKiLdUsT](https://skildust.com) licensed under this projects BSD-3-Clause License
   * Howling sound taken from [YouTube](https://www.youtube.com/watch?v=qCNs7Kyg7Ig)
  
