const API_BASE = import.meta.env.VITE_API_URL || window.__API_BASE__ || 'https://p4o6wzh11c.execute-api.us-east-2.amazonaws.com/prod';

if (API_BASE) {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    try {
      if (typeof input === 'string') {
        if (input.startsWith('/api/')) {
          input = API_BASE + input;
        }
      } else if (input instanceof Request) {
        const url = new URL(input.url);
        if (url.pathname.startsWith('/api/')) {
          const newUrl = API_BASE + url.pathname + url.search;
          input = new Request(newUrl, input);
        }
      }
    } catch (e) {
      // ignore and fall back to original
    }
    return originalFetch(input, init);
  };
}
