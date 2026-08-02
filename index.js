import { express, app, connectToDb } from "./connection.js";
import addProduct from "./controllers/addProduct.js";
import deleteProduct from "./controllers/deleteProduct.js";
import getMostRatedProducts from "./controllers/getMostRatedProducts.js";
import getproductById from "./controllers/getProductById.js";
import getProducts from "./controllers/getproducts.js";
import getProductsByName from "./controllers/getProductsByName.js";
import updateProduct from "./controllers/updateProduct.js";

import slidingWindowLimiter from "./middlewares/rateLimiters/slidingWindowLimiter.js";

app.use(express.json());
app.get("/api", slidingWindowLimiter(60_000, 5), getProducts);
app.get(
  "/api/most_rated",
  slidingWindowLimiter(30_000, 5),
  getMostRatedProducts,
);

app.get("/api/find", slidingWindowLimiter(30_000, 6), getProductsByName);
app.get("/api/:id", slidingWindowLimiter(30_000, 6), getproductById);

app.post("/api", slidingWindowLimiter(30_000, 6), addProduct);
app.put("/api/:id", slidingWindowLimiter(30_000, 10), updateProduct);

app.delete("/api/:id", slidingWindowLimiter(30_000, 6), deleteProduct);

connectToDb();
