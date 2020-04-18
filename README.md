# tor-manager

I had an old project that did something similar but with way less feedback. Granted this isn't a whole lot of feedback either but streets ahead my other project.

Idea here is to spin up, down, and all around tor to rotate IPs. This runs as a service and has a SOCKS proxy you can pipe requests through. This is great because it doesn't change all traffic so you don't have to worry about network access in general. Only the requests you want through Tor require the proxy to be used.

To see a minimal test of how this can best be used run:
```bash
docker-compose -f docker-compose.test.yml --build up
```

And it should print your Tor'd IP address after several logs from the tor process itself. But you can take this Dockerfile as a reference for needed dependency on `tor`. And this also illustrates how to use this project in connection with a request library.

