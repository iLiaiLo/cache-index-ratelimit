class SlidingWindow {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize;
    this.maxRequests = maxRequests;
    this.requests = [];
  }

  allowRequest() {
    const now = Date.now();
    while (
      this.requests.length > 0 &&
      this.requests[0] <= now - this.windowSize
    ) {
      this.requests.shift();
    }

    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    } else {
      return false;
    }
  }
}
export default SlidingWindow;
