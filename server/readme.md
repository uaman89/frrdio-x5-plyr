# Quick start

install & start:

1.  $ service apache2 stop
2.  $ cd /var/www/html/server
3.  $ npm i
4.  npm start

start only:

1.  $ cd /var/www/html/server
2.  npm start

stop:

1.  npm stop


# More details:

## First launch (install)

1. Check that there is no running Apache server

```
    $ cd /var/www/html/server

    $../server# node second.js
```

If you see the "server is started!!!" message, everything is OK - go to step 2.

If you see error like "Error: listen EADDRINUSE :::80", it means that some process use port 80.
It can be Apache server. To stop apache server execute:

```
    $ service apache2 stop
```

If apache is running, you will see message: * Stopping web server *


2. install packages for server
```
    $ npm i
```


## To start server

```
    $ npm start
```

---

## To stop server

```
    $ npm stop
```