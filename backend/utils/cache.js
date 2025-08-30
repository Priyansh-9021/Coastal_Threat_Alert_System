// utils/cache.js
const store = new Map();

/**
 * Save to cache with TTL (ms)
 */
export function setCache(key, value, ttlMs = 300000) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

/**
 * Get from cache or null if expired/missing
 */
export function getCache(key) {
  const hit = store.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    store.delete(key);
    return null;
  }
  return hit.value;
}
