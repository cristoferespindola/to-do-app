import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Creates a rate limit middleware
 * @param time - Time window in minutes (default: 15)
 * @param max - Maximum requests per time window (default: 100)
 * @returns Rate limit middleware
 */
const createRateLimiter = (
  time = 15, 
  max = 100
): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: time * 60 * 1000,
    max,
    message: {
      error: 'Too many requests, please try again later.',
      retryAfter: time * 60,
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};

export default createRateLimiter;