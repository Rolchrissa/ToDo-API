
SHELL = /bin/bash

.PHONY: deps
deps:
	@echo "Installing dependencies for $(PWD)..."
	 docker run -it --volume "$(PWD)/:/app" -w /app --name deps node:16.17.0 npm install

.PHONY: build
build:
	@docker run -it --volume "$(PWD)/:/app" -w /app  node:16.17.0 npm run build:bundle

.PHONY: clean
clean:
	@rm -rf build/

.PHONY: fullclean
fullclean: clean
	@rm -rf node_modules/

.PHONY: reinit
reinit: fullclean deps

.PHONY: rundev
rundev:
	@docker run -it --volume "$(PWD)/:/app" -p "3000:3000"  -w /app --user $(id -u):$(id -g) node:16.17.0 npm run dev

.PHONY: fullrestart
fullrestart: fullclean deps build rundev


npm/install: ACTION=install
npm/update: ACTION=update
npm/require: ACTION=install $(module)
npm npm/install npm/update npm/require:
	@docker run -it --volume "$(PWD)/:/app" node:16.17.0 npm $(ACTION) --loglevel=warn
