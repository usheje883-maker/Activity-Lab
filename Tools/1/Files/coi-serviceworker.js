/*! coi-serviceworker v0.1.7 - Guido Zuidhof / gzuidhof, licensed under MIT */
let coepCredentialless = false;
if (typeof window === "undefined") {
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

  self.addEventListener("message", (ev) => {
    if (ev.data && ev.data.type === "deregister") {
      self.registration
        .unregister()
        .then(() => {
          return self.clients.matchAll();
        })
        .then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
    }
  });

  self.addEventListener("fetch", function (event) {
    const r = event.request;
    if (r.cache === "only-if-cached" && r.mode !== "same-origin") {
      return;
    }

    const request =
      coepCredentialless && r.mode === "no-cors"
        ? new Request(r, {
            credentials: "omit",
          })
        : r;
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) {
            return response;
          }

          const newHeaders = new Headers(response.headers);
          newHeaders.set(
            "Cross-Origin-Embedder-Policy",
            coepCredentialless ? "credentialless" : "require-corp"
          );
          newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        })
        .catch((e) => console.error(e))
    );
  });
} else {
  (() => {
    const reloadedBySelf = window.sessionStorage.getItem("coiReloadedBySelf");
    window.sessionStorage.removeItem("coiReloadedBySelf");

    const coepDegrading = reloadedBySelf === "coepdegrade";

    // You can customize the behavior of this script through a global `coi` variable.
    const coi = {
      shouldRegister: () => !window.crossOriginIsolated,
      shouldDeregister: () => window.crossOriginIsolated,
      coepCredentialless: () => true,
      coepDegrade: () => true,
      doReload: () => window.location.reload(),
      quiet: false,
      ...window.coi,
    };

    if (!coi.shouldRegister()) {
      if (coi.shouldDeregister()) {
        navigator.serviceWorker.controller?.postMessage({ type: "deregister" });
      }
      return;
    }

    if (
      !window.isSecureContext &&
      !coi.quiet
    ) {
      console.log(
        "COOP/COEP Service Worker: Secure context is required for crossOriginIsolated."
      );
      return;
    }

    // In some environments (e.g. Firefox private mode) service workers are not available.
    if (!("serviceWorker" in navigator)) {
      if (!coi.quiet) {
        console.error(
          "COOP/COEP Service Worker: Service workers are not available."
        );
      }
      return;
    }

    navigator.serviceWorker
      .register(window.document.currentScript.src)
      .then(
        (registration) => {
          if (!coi.quiet) {
            console.log(
              "COOP/COEP Service Worker: registered",
              registration.scope
            );
          }

          registration.addEventListener("updatefound", () => {
            if (!coi.quiet) {
              console.log(
                "COOP/COEP Service Worker: new worker found, installing..."
              );
            }
            registration.installing.addEventListener("statechange", function () {
              if (this.state === "activated") {
                if (!coi.quiet) {
                  console.log("COOP/COEP Service Worker: activated");
                }
                window.sessionStorage.setItem("coiReloadedBySelf", "true");
                coi.doReload();
              }
            });
          });
        },
        (err) => {
          if (!coi.quiet) {
            console.error(
              "COOP/COEP Service Worker: registration failed",
              err
            );
          }
        }
      );
  })();
}
