# Secret Santa Mattermost bot

A Mattermost bot to orginize Secret Santa event in your company.

## Bot commands

* `/start` - sends Secret Santa introduction message in selected channel (from which command was invoked)
* `/play [whishlist]` - allows user to become Secret Santa; must be used by every participant
* `/finish` - assigns Secret Santa to each participant; sends direct message to each participant with assigned pair and his or her whishlist

## Installation

This Secret Santa Mattermost is a NodeJS-based HTTP Server for handling mattermost slash commands.

You must setup and run this server and configure Mattermost properly.

### Mattermost Configuration

In order for Bot to run you must provide
[Incomming Webhook URL](https://docs.mattermost.com/developer/webhooks-incoming.html).

1. Create Mattermost account ([Bot Account](https://docs.mattermost.com/developer/bot-accounts.html)
   or simple user) from which messages will be sent
2. Create [Incomming Webhook](https://docs.mattermost.com/developer/webhooks-incoming.html).

   The only hook requirement is not to be locked to specific channel.
3. Create [Slash Command](https://docs.mattermost.com/developer/slash-commands.html) with parameters:
    * `Request URL` - Secret Santa Bot Server address with `/santa` path (e.g. `http://192.168.0.77:5959/santa/`)
    * `Request Method` - `POST`
    * The other required parameters may have arbitrary value
4. If you host the bot server on your local network, you should take a look at
   [Allow untrusted internal connections option](https://docs.mattermost.com/administration/config-settings.html#allow-untrusted-internal-connections-to)

### Server

#### Manual

> NodeJS 10+ is required

1. Clone this repo

    ```bash
    $ git clone https://github.com/n-batrakov/secret-santa.git
    $ cd secret-santa
    ```

2. Install the dependencies

    ```bash
    $ npm install
    ```

3. Build the sources and run the server

    ```bash
    $ npm start -- -p 8080 -b <your incoming hook url>
    ```

4. Server should be up and running on specified port (8080 by default)
5. You may use `BOT_PORT` and `BOT_URL` environment variables to configure server

#### Docker Compose

> Docker and Docker Compose are required

1. Clone this repo

    ```bash
    $ git clone https://github.com/n-batrakov/secret-santa.git
    $ cd secret-santa
    ```

2. Specify `BOT_URL` in `docker-compose.yml`
3. Run containers

    ```bash
    $ docker-compose up
    ```
4. Server should be up and running on `5959` unless different port specified in `docker-compose.yml`
5. To rebuild the containers after sources update use:

    ```bash
    $ docker-compose up --build
    ```

## Data storage & Privacy

Participating users and their whishlists are stored in plain json files on server in `./data` directory.

Assigned pairs (secret santa & gift receiver) are sent to direct message.

Bot server do not store these pairs.

**Messages are sent from account, from which Incoming Web Hook was created.**

Create special user account or bot account (better) to keep assigned santas in secret.


## Notes

Free [third party icon](https://icons-for-free.com/father+christmas+saint+nick+santa+icon-1320185073590398003/)
authored by Daryl Colby is used for Secret Santa bot.
