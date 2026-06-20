SHELL := /bin/zsh
NVM_DIR := $(HOME)/.nvm

install:
	. $(NVM_DIR)/nvm.sh && npm ci

dev:
	. $(NVM_DIR)/nvm.sh && npx vite

build:
	. $(NVM_DIR)/nvm.sh && npx vite build

lint:
	. $(NVM_DIR)/nvm.sh && npx eslint .

.PHONY: install dev build lint