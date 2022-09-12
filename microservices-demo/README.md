# Notes

This application is based on this [project](https://github.com/GoogleCloudPlatform/microservices-demo). It will be used as a demo for the K8s adoption journey. This clone of the project has been stripped down to focus only on the major parts as required by the adoption journey.

## Deployment

1. **Deploy the sample app to the cluster.**

    ```shell
    kubectl apply -f ./release/kubernetes-manifests.yaml
    ```

2. **Wait for the Pods to be ready.**

    ```shell
    kubectl get pods
    ```

    After a few minutes, you should see:

    ```text
    NAME                                     READY   STATUS    RESTARTS   AGE
    adservice-76bdd69666-ckc5j               1/1     Running   0          2m58s
    cartservice-66d497c6b7-dp5jr             1/1     Running   0          2m59s
    checkoutservice-666c784bd6-4jd22         1/1     Running   0          3m1s
    currencyservice-5d5d496984-4jmd7         1/1     Running   0          2m59s
    emailservice-667457d9d6-75jcq            1/1     Running   0          3m2s
    frontend-6b8d69b9fb-wjqdg                1/1     Running   0          3m1s
    loadgenerator-665b5cd444-gwqdq           1/1     Running   0          3m
    paymentservice-68596d6dd6-bf6bv          1/1     Running   0          3m
    productcatalogservice-557d474574-888kr   1/1     Running   0          3m
    recommendationservice-69c56b74d4-7z8r5   1/1     Running   0          3m1s
    redis-cart-5f59546cdd-5jnqf              1/1     Running   0          2m58s
    shippingservice-6ccc89f8fd-v686r         1/1     Running   0          2m58s
    ```

3. **Access the web frontend in a browser** using the frontend's `EXTERNAL_IP`.

    ```shell
    kubectl get service frontend-external | awk '{print $4}'
    ```

    You should see the following:

    ```text
    EXTERNAL-IP
    <your-ip>
    ```
