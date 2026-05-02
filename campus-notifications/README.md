# Campus Notifications Frontend

A clean, responsive campus notifications application built with Next.js, TypeScript, and Material UI.

## Overview

This project provides a UI for students to receive real-time updates regarding Placements, Events, and Results. 

Key features include:
- Viewing all incoming notifications with pagination and filtering.
- A "Priority Inbox" to view the top most important notifications, sorted by type weight and recency.
- Visual distinction between new and previously viewed notifications.
- Robust logging integration to an external evaluation service.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Material UI

## Setup & Running

1. Run `npm install` to install dependencies.
2. In the `.env.local` file, add your Bearer Token for the protected API:
   `API_BEARER_TOKEN="your_token_here"`
3. Start the dev server:
   `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
