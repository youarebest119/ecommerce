const app = require("./app");
const { PORT } = require("./utils/constants");

app.listen(PORT, () => {
    console.log(`application is running at http://localhost:${PORT}`);
})