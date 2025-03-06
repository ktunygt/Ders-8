const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./data/db");
const errerCatcher = require("./middlewares/error-catcher");
const logger = require("./helpers/logger");
const path = require("path");

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE"
}));

app.use(express.json());

require("./models/user");
require("./models/blog");
require("./models/log");
require("./models/task");

app.use("/images", express.static(path.join(process.cwd(), "public/images")));

(async () => {
    await sequelize.sync({ alter: true });
})();

const routes = require("./restAPI/index");
app.use(routes);

const unknownRoute = require("./restAPI/home/unknownRoute/index");
app.use(unknownRoute);

app.listen(4000, () => {
    logger.info("API çalışmakta", { code: 1 });
});

app.use(errerCatcher);
