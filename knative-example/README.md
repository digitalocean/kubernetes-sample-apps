# Overview

Sample javascript application implementing the classic [2048 game](https://en.wikipedia.org/wiki/2048_(video_game). Main project is based on the [game-2048 library](https://www.npmjs.com/package/game-2048) and [Webpack](https://webpack.js.org).

Main purpose is to serve as a demo for the [DOKS-CI-CD](https://github.com/digitalocean/container-blueprints/tree/main/DOKS-CI-CD) blueprint.

## Building the 2048 Game Application

Main project is [npm](https://www.npmjs.com) based, hence you can build the application via:

```shell
npm install --include=dev

npm run build
```

You can test the application locally, by running below command:

```shell
npm start
```

Above command will start a web server in development mode, which you can access at [localhost:8080](http://localhost:8080). Please visit the main library [configuration](https://www.npmjs.com/package/game-2048#config) section from the public npm registry to see all available options.

## Building the Docker Image

A sample [Dockerfile](./Dockerfile) is provided in this repository as well, to help you get started with dockerizing the 2048 game app. Depending on the `NODE_ENV` environment variable, you can create and publish a `development` or `production` ready Docker image.

First, issue below command to build the docker image for the 2048 game app, Below examples assume you already have a [DigitalOcean Docker Registry](https://docs.digitalocean.com/products/container-registry) set up (make sure to replace the `<>` placeholders accordingly):

```shell
cd knative-example

docker build -t registry.digitalocean.com/<YOUR_DOCKER_REGISTRY_NAME_HERE>/2048-game .
```

**Note:**

The sample [Dockerfile](./Dockerfile) provided in this repository is using the [multistage build](https://docs.docker.com/develop/develop-images/multistage-build) feature. It means, the final image contains only the application assets (build process artifacts are automatically discarded).

Then, you can issue bellow command to launch the `2048-game` container (make sure to replace the `<>` placeholders accordingly):

```shell
docker run --rm -it -p 8080:80 registry.digitalocean.com/<YOUR_DOCKER_REGISTRY_NAME_HERE>/2048-game
```

Now, visit [localhost:8080](http://localhost:8080) to check the 2048 game app in your web browser. Finally, you can push the image to your DigitalOcean docker registry (make sure to replace the `<>` placeholders accordingly):

```shell
docker push registry.digitalocean.com/<YOUR_DOCKER_REGISTRY_NAME_HERE>/2048-game
```

**Note:**

Pushing images to your DigitalOcean docker registry is possible only after a successful authentication. Please read the official DigitalOcean [guide](https://docs.digitalocean.com/products/container-registry/how-to/use-registry-docker-kubernetes) and follow the steps.

## Deploying to Kubernetes

The sample manifest provided in this repository will get you started with [Knative Serving](https://knative.dev/docs/serving).

First, you need a [DOKS](https://docs.digitalocean.com/products/kubernetes/quickstart) cluster configured and running. Then, the [Knative 1-Click App](https://marketplace.digitalocean.com/apps/knative) must be provisioned to your DOKS cluster.

Next, edit the [knative-service](resources/knative-service.yaml) manifest provided in this repository, and replace the `<>` placeholders accordingly. Finally, apply changes using `kubectl` (make sure to change directory to `knative-example` first):

```shell
kubectl apply -f resources/knative-service.yaml
```

You can check Knative service status via [kn](https://knative.dev/docs/install/client/install-kn) CLI:

```shell
kn services list
```

If everything went fine, you should be able to access the service either by port-forwarding, or via your custom domain (if Knative was configured to use a custom domain). You can check the [DOKS-CI-CD](https://github.com/digitalocean/container-blueprints/tree/main/DOKS-CI-CD) blueprint for more details.
