# Teddy Bear Hospital

## tech stack

backend:

- python 3.12
- uv: python dependancies management
- fastapi: backend apis

frontend:

- NODE.js
- TypeSkript: type checking
- pnpm: JavaSkript dependancy management
- vite: project builder
- react: UI framework

## local developement

install backend dependancies `uv --directory backend sync`

install frontend dependancies `pnpm -C frontend install`

start backend in developement mode `uv --directory backend run fastapi run --port 8000 app/app.py`

start frontend in developement mode `pnpm -C frontend run dev --port 3000`

## run history

https://asdf-vm.com/guide/getting-started-legacy.html

```
brew install coreutils curl git
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.15.0
echo $SHELL
touch ~/.zshrs
which asdf
which asdf
asdf plugin-add direnv
asdf plugin-add python
asdf plugin-add uv
asdf plugin-add nodejs
asdf plugin-add pnpm
asdf direnv setup --shell zsh --version 2.35.0
asdf list all python | grep 3.12
asdf install python 3.12.10
asdf global direnv 2.35.0
asdf global python 3.12.10
asdf list all uv
asdf install uv 0.6.14
asdf global uv 0.6.14
asdf list all nodejs
asdf install nodejs 23.11.0
asdf global nodejs 23.11.0
asdf list all pnpm
asdf install pnpm 10.7.1
asdf global pnpm 10.7.1
```

```
cd backend
uv add --dev ruff pyright
uv add pydantic fastapi fastapi-cli
```
