const express = require("express");
const cors = require("cors");
const tarefasRoutes = require("./routes/tarefas");
const comentariosRoute = require("./routes/comentarios");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tarefas", tarefasRoutes);
app.use("/api/comentarios", comentariosRoute); // agora tem nova rota
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});