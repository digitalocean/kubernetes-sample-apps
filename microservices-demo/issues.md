## Background

With Tilt is very easy to deploy a bunch of software components, not only locally, but on remote environments and in the CI process as well. We use `kustomize` and `overlays` in our project to distinguish between different `environments`. Hence, a dedicated `overlay directory` is used for each environment, containing a `kustomization.yaml` file. The kustomization.yaml manifest from each overlay folder is used to track and apply changes for that specific environment using a common set of manifests, located in the `base` directory.

What each overlay does is to override or add extra configuration over the `base` directory. The base contains common stuff used by all project components (microservices). Below is the structure for the kustomize folder used in the K8S adoption journey project:

```text
kustomize/
├── base
│   ├── cartservice.yaml
│   ├── checkoutservice.yaml
│   ├── currencyservice.yaml
│   ├── emailservice.yaml
│   ├── frontend.yaml
│   ├── kustomization.yaml
│   ├── namespace.yaml
│   ├── paymentservice.yaml
│   ├── productcatalogservice.yaml
│   ├── recommendationservice.yaml
│   ├── redis.yaml
│   └── shippingservice.yaml
├── dev
│   └── kustomization.yaml
├── local
│   └── kustomization.yaml
├── prod
│   └── kustomization.yaml
├── staging
│   └── kustomization.yaml
└── kustomization.yaml
```

Now, the beauty of this setup is that you can use - `kubectl apply -k kustomize/<overlay_dir>` to deploy all components for that specific environment. All with a single line! If you want to decomission or destroy the setup, you need a single line as well - `kubectl delete -k kustomize/<overlay_dir>`.

Because we have this setup already in place, the next question comes - can I re-use it for Tilt as well ? At a first glace it seems natural to do so. You need to add this part in your `Tiltfile` - `k8s_yaml( kustomize("kustomize/dev") )`. This line and associated functions is exactly the same as you would run - `kubectl apply -k kustomize/dev`. If you want to run Tilt for local development then, you need to use the `local` overlay via - `k8s_yaml( kustomize("kustomize/local") )`. Of course, the overlay folder is parameterized, and can be injected from a `tilt_config.json` file, which is environment specific.

Yes, Tilt can use profiles - this is another powerful concept where you separate application logic from configuration data. So, you can use several `tilt_config.json` files which are environment specific. Then, overlay each in a separate folder, just as with Kustomize. Below is an example of such setup:

```text
├── tilt-resources
│   ├── dev
│   │   └── tilt_config.json
│   ├── local
│   │   └── tilt_config.json
│   └── Tiltfile-lib
├── Tiltfile
└── tilt_config.json
```

You use a single Tiltfile containing logic for your project, which in turn loads an environment specific tilt_config.json file. No need to touch or alter the Tiltfile, you only need to copy over environment specific configuration:

1. If you want local env - `cp tilt-resources/local/tilt_config.json <Tiltfile_directory>`. Then, `tilt up`, and that's it!
2. If you want remote dev env - `cp tilt-resources/dev/tilt_config.json <Tiltfile_directory>`. Then, `tilt up`, and that's it!

But, in reality the fun is just about to begin. Because for each overlay there are specific settings, like namespace name, docker image tag, etc.

For example, kustomize/dev overlay has the following configuration:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: microservices-demo-dev
commonLabels:
  variant: dev

resources:
  - ../base

images:
  - name: cartservice
    newName: registry.digitalocean.com/microservices-demo/cartservice
    newTag: 1.0.0
  - name: checkoutservice
    newName: registry.digitalocean.com/microservices-demo/checkoutservice
    newTag: 1.0.0
  - name: currencyservice
    newName: registry.digitalocean.com/microservices-demo/currencyservice
    newTag: 1.0.0
  - name: emailservice
    newName: registry.digitalocean.com/microservices-demo/emailservice
    newTag: 1.0.0
  - name: frontend
    newName: registry.digitalocean.com/microservices-demo/frontend
    newTag: 1.0.0
  - name: paymentservice
    newName: registry.digitalocean.com/microservices-demo/paymentservice
    newTag: 1.0.0
  - name: productcatalogservice
    newName: registry.digitalocean.com/microservices-demo/productcatalogservice
    newTag: 1.0.0
  - name: recommendationservice
    newName: registry.digitalocean.com/microservices-demo/recommendationservice
    newTag: 1.0.0
  - name: shippingservice
    newName: registry.digitalocean.com/microservices-demo/shippingservice
    newTag: 1.0.0
```

But the above configuration is dev cluster specific which is already deployed and maybe you don't want to mess with it. How can you prevent changes to the real env, and keep `k8s_yaml( kustomize("kustomize/dev") )` in the Tiltfile? If you run it, Tilt will try to build and push docker images that are already present in the docker registry (possibly override the artifacts if you have permissions to do so) - not good. Tilt has a somehow "safe way", and it tags images using some built-in timestamp. This way you don't override images on the remote registry.

Of course, you can use `kustomize edit set image`, but that will write changes to the `kustomization.yaml` file for the dev overlay. It's safe for now, because changes are present only on your local machine. But you may forget, and commit to Git by mistake.

So, is full remote development via Tilt wrong ?

What if Tilt was not meant for this? What if Tilt is "abused" this way and not the right way of doing things ?

On the other hand, having multiple team members perform remote development on the same cluster (DEV cluster) is not a good thing for several reasons:

1. Each developer (if he/she has the right permissions) can deploy the same set of microservices to the same cluster, in a different namespace to avoid conflicts. But, this will lead to resource exhaustion for the DEV cluster - NOT GOOD!
2. What stops each developer to not deploy in the same namespace ? Only RBAC. But, if not set, can disrupt or make the DEV cluster unstable. Also, conflicts will arise if using the same namespace - NOT GOOD!

Next, comes the CI part. Again, you can use Tilt to spin up microservices on the DEV cluster, the same way as with full remote development. This approach has the potential benefit that, if you build and test your microservice or set of microservices the same way as the CI workflow does, then you gain confidence that your PR build will pass.

Yet again, what are the chances to run into conflicts again, or destabilize the DEV cluster ? For the CI process, you can disable concurrency for GitHub workkflows - this is a first thing measure. It implies waiting time for other PRs, but if you want to run deployment tests, E2E tests, etc. well you don't want to overload the same DEV cluster again.

Is spinning a new DOKS cluster on the fly (for a period of time) a solution ? For both CI workflows and full remote development ? Then after idling for a period of time (interesting to check when a DOKS cluster idles, btw), tear it down to save money and resources.

TO BE CONTINUED ...
