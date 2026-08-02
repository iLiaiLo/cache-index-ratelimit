import NodeCache from "@cacheable/node-cache";

const nodeCache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

export default nodeCache;
