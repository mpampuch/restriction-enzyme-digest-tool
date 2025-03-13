# Restriction Digest Analysis Tool

This a web application that I wrote that allows you to perform a restriction digest analysis of custom DNA sequences directly in the browser.

It was written using React + Vite + Node.js + Python.

It is hosted with the free tier of Render Cloud platform. The link to access it can be found [here](https://frontend-5mo0.onrender.com/).

- The free tier of render cloud platform will stop the server if there is no traffic to it for a while. If incoming traffic comes after this server is stopped, it will need to boot up again. This means that sometimes when you press the link, you may need to wait up to 2 minutes for the website to load. Just be patient.

To run this project, make sure you have the latest version of [Docker](https://docs.docker.com/engine/install/) installed and running on your local machine.

You can check if the installations were successful / if the programs are running by executing the following code in your terminal.

```bash
docker --version
```

If these are installed, download the code in this repository, and from your local repository run

```bash
docker compose up -d && docker compose logs -f

# If that doesn't work try
docker compose up -d --build && docker compose logs -f
```

Follow the link outputted in the logs to access the app.

### Images

The images used to run this app can be found here: https://hub.docker.com/r/mpampuch/restriction-enzyme-digest-tool
