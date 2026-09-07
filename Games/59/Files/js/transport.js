(function () {
  const keys = Object.freeze({
    transport: "browserTransport",
    wisp: "browserWispUrl",
  });
  const transportMigrationKey = "browserTransportDefaultV2";
  if (localStorage.getItem(transportMigrationKey) !== "epoxy") {
    if (localStorage.getItem(keys.transport) === "libcurl") {
      localStorage.setItem(keys.transport, "epoxy");
    }
    localStorage.setItem(transportMigrationKey, "epoxy");
  }
  const channel = typeof BroadcastChannel === "function" ? new BroadcastChannel("truffled-settings") : null;
  function defaultWisp() {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${location.host}/wisp/`;
  }
  function normalizeWisp(value) {
    const raw = String(value || "").trim();
    const url = new URL(raw || defaultWisp());
    if (!/^wss?:$/.test(url.protocol)) throw new TypeError("wisp must use ws:// or wss://");
    url.hash = "";
    if (!url.pathname.endsWith("/")) url.pathname += "/";
    return url.href;
  }
  function getTransport(value = localStorage.getItem(keys.transport)) {
    return value === "libcurl" ? "libcurl" : "epoxy";
  }
  function getWisp() {
    try {
      return normalizeWisp(localStorage.getItem(keys.wisp) || defaultWisp());
    } catch {
      localStorage.removeItem(keys.wisp);
      return defaultWisp();
    }
  }
  function getModule(transport = getTransport()) {
    return transport === "epoxy" ? "/epoxy/index.mjs" : "/js/libcurlbareclient.mjs";
  }
  async function createClient(requestedTransport) {
    const transport = getTransport(requestedTransport);
    const module = await import(getModule(transport));
    const Client = module.default;
    if (typeof Client !== "function") throw new Error(`${transport} transport did not load`);
    return new Client({ wisp: getWisp() });
  }
  function save(transport, wisp) {
    const nextTransport = getTransport(transport);
    const nextWisp = normalizeWisp(wisp);
    localStorage.setItem(keys.transport, nextTransport);
    localStorage.setItem(keys.wisp, nextWisp);
    localStorage.setItem("proxyBackend", "scramjet");
    sessionStorage.setItem("activeProxyBackend", "scramjet");
    sessionStorage.removeItem("encodedUrl");
    channel?.postMessage({ type: "browser-transport-changed", transport: nextTransport, wisp: nextWisp });
    return { transport: nextTransport, wisp: nextWisp };
  }
  function reset() {
    localStorage.removeItem(keys.transport);
    localStorage.removeItem(keys.wisp);
    return save("epoxy", defaultWisp());
  }
  localStorage.setItem("proxyBackend", "scramjet");
  localStorage.removeItem("proxyDefaultVersion");
  window.TruffledTransport = Object.freeze({
    keys,
    createClient,
    defaultWisp,
    getModule,
    getTransport,
    getWisp,
    normalizeWisp,
    reset,
    save,
  });
})();
