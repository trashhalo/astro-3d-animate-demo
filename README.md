# Astro Partial Hydration of 3D Scenes

![](./Demo.png)

I wanted to try and see if I could use [Astro](https://astro.build) to staticly paint a 3D scene using [Zdog](https://zzz.dog/). Then hydrate JS that animates the 3D scene.

[Demo](./src/components/Demo.jsx)

## browser-env

zdog assumes its executing in a browser and calls into document. To make the astro static renderer happy with this you need to add browser-env to your index.astro page.

```typescript
import browserEnv from "browser-env";
browserEnv();
```

And due to issues with snowpack you need to add browser-env to your external module list. See [snowpack.config.js](./snowpack.config.js)
