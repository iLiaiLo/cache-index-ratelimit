import SlidingWindow from "../../utils/rateLimitClasses/slidingWindow.js";

const slidingWindowLimiter = (windowSize, maxRequests) => {
  const clients = new Map();

  return (req, res, next) => {
    const reqId = req.ip;
    if (!clients.has(reqId)) {
      clients.set(reqId, new SlidingWindow(windowSize, maxRequests));
    }

    const now = Date.now();
    const limiter = clients.get(reqId);

    const allowed = limiter.allowRequest();

    const remaining = Math.max(
      0,
      limiter.maxRequests - limiter.requests.length,
    );

    const oldestRequest = limiter.requests[0];
    const resetTime = oldestRequest
      ? Math.ceil((oldestRequest + limiter.windowSize) / 1000)
      : Math.ceil((now + limiter.windowSize) / 1000);

    res.setHeader("X-RateLimit-Limit", limiter.maxRequests);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", resetTime);

    if (allowed) {
      return next();
    }

    const retryAfterMs = limiter.requests[0] + limiter.windowSize - now;
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);

    res.setHeader("Retry-After", Math.max(1, retryAfterSeconds));
    return res.status(429).json({
      error: "Too Many Requests",
      message: `sliding window: You have exceeded the rate limit. Please try again in ${retryAfterSeconds} seconds`,
    });
  };
};
export default slidingWindowLimiter;
