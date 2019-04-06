# Getting Started

 1. Create your Kubernetes cluster: `doctl k8s cluster create example`
 1. Check that your cluster is available: `kubectl get nodes`
 1. Deploy a workload to your cluster: `kubectl apply -f manifest.yaml`
 1. Wait for the service to be ready: `script/wait-for-service doks-example`
 1. Open the returned IP address in your browser, or run `open http://$(kubectl get service doks-example --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")`

Or you can just run `script/up` to do all of this.

## Cleaning up

Run `script/down` or `doctl k8s cluster delete example`