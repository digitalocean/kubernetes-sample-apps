os.putenv('DOCKER_DEFAULT_PLATFORM', 'linux/amd64')

k8s_yaml(kustomize('kustomize'))

docker_build('game-2048', '.')

k8s_resource('game-2048', port_forwards='8080')
