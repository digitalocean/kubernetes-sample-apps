[![Build Status](https://travis-ci.org/digitalocean/doks-example.svg?branch=master)](https://travis-ci.org/digitalocean/doks-example)

# Getting Started

 1. Create your Kubernetes cluster: `doctl k8s cluster create example`
 1. Check that your cluster is available: `kubectl --context do-nyc1-example get nodes`
 1. Deploy a workload to your cluster: `kubectl --context do-nyc1-example apply -f manifest.yaml`
 1. Wait for the service to be ready: `script/wait-for-service do-nyc1-example doks-example`
 1. Open the returned IP address in your browser, or run `open http://$(kubectl --context do-nyc1-example get service doks-example --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")`

Or you can just run `script/up` to do all of this.

## Cleaning up

Run `script/down` to tear down the cluster and remove the load-balancer.

**Note:** If you delete the cluster directly, the load-balancer will stick around and result in charges.
