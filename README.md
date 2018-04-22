# Imdbae

A single-page application to allow people to find their movie soulmates. Users like movies, and are matched with other people who have liked the same movie. They can choose how far away a match can be, and the chat page lets them talk to their matches. 

This application uses React and Redux, with an Elixir backend.

Notes:
-
* only one account allowed per email

# Production Deployment

* Create production db
* Configure credentials under config/prod.secret.exs. There's an example file for your reference.
* Add the site config to nginx there's an example in this dir
* For HTTPS, you can use Let's Encrypt and Certbot:

# Ubuntu

```
sudo apt-get update
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```

# Obtain cert

```
sudo certbot --nginx -d imdbae-domain.com
```
