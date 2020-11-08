# Turing Messenger

## Idea

When brain storming, we discussed several ideas, including AI games and possible variations on messaging platforms. We ended up combining these two ideas and going with this project, titled "Turing Messenger". "Turing Messenger" is directly inspired from the concept of the Turing Test where AI and human recognition are put to the test. In this web app, you start by entering a username, and then you land on a screen where you are matched with another player, who may be a person trying to deceive you or simply an AI. When you are matched up, you and your partner have 3 minutes to try and guess if the other player is a human or AI, or successfully deceive the other and win. This adds a gamification element to a classic thought experiment in CS education from Alan Turing.

## Client

The client is written in vuejs, and is the presentation layer. The client communicates with the server to get and store messages, users, etc.

## Server

The server is written in TS express, and hold all of the data that the client enters. The server is responsible for matching clients up with other clients, or matching up a client with the AI.

## AI

AI is a transfer learning network implementation based on GPT-2 and different variations of conv AIs.

The AI is built in python and communicates with the server via a simple flask app.
