# Restriction Digest Analysis Tool

This a web application that I wrote that allows you to perform a restriction digest analysis of custom DNA sequences directly in the browser.

It was written using React + Vite + Node.js + Python.

To run this project, make sure you have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed and running on your local machine.

You can check if the installations were successful / if the programs are running by executing the following code in your terminal.

```bash
docker --version
docker-compose --version
```

If these are installed, download the code in this repository, and from your local repository run

```bash
docker-compose up -d --build && docker-compose logs -f
```

Follow the link outputted in the logs to access the app.
