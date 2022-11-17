# Overview

**Note:**

**This demo application serves as a companion for the [Kubernetes Adoption Journey](https://digitalocean.github.io/k8s-adoption-journey/) project. Please follow the Kubernetes adoption journey project for more information and comprehensive guidelines.**

This application is a clone of this [GoogleCloudPlatform](https://github.com/GoogleCloudPlatform/microservices-demo) project. It will be used as a demo for the K8s adoption journey. This clone of the project has been stripped down to focus only on the major parts as required by the adoption journey.

## Prerequisites

1. [Tilt](https://tilt.dev/) installed on your local machine.
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your local machine, with built-in Kubernetes cluster enabled and running.

## Quick Start

1. Run the following command in the project root directory to deploy the **microservices-demo** app to your local Kubernetes cluster:

    ```shell
    cp tilt-resources/local/tilt_config.json .
    tilt up
    ```

2. Open Tilt [web interface](http://localhost:10350/), and wait for all services to be ready.
3. Access the [web frontend](http://localhost:9090/) in a browser.

## Cleaning Up

Run following command from this project root directory to clean up all resources:

```shell
tilt down
```
