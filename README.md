# Artifact Browser

## Project Organization
Three packages:
- **artifact-browser** - Web App (React)
- **tools-api** - API layer between React and Node server
- **tools-server** - Express Node server for interacting with the file system and remote servers

## Running the App

### Preparation
1. Clone project
2. Install nvm-windows and use to install latest version of Node
3. Install npm 7+
4. From project root, run `npm install`
5. Clone artifact DB as a sibling of project root. (https://github.com/bennyflint/artifact-browser-db)

### Front-End
From project root, `artifact-browser-root/`, run `npm -w artifact-browser start`. Should open a browser running app. Click _Artifact Browser_ on left nav to access the app.

### Server
In another terminal, run `npm -w @bflint/tools-server run dev`, also from project root.

## Features
- Reads artifact metadata files from local Git repository.
- Renders artifact list, using a drawer for showing/hiding details.
- Allows inline editing of artifact notes.

## Shortcomings
- Artifact DB must be manually cloned and pulled.
- Filesystem API is not generic. It's hard-coded to read artifact file contents.
- No filtering/sorting of artifact list.
- Editing artifact notes does not save to file.
- Did not get to implement launchers.