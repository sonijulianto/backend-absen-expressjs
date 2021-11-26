const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { user, absensi } = require("./models");

// app.use(cors());
const port = 3000;

app.listen(port, () => {
  console.log("listening on " + port);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.json());

app.post("/create", async (req, res) => {
  const find = await user.findOne({
    where: {
      nip: req.body.nip,
    },
  });

  console.log(req.body, find);

  if (find)
    return res.status(400).send({
      status: "failed",
      message: "nip already",
    });

  const users = await user.create({
    ...req.body,
  });
  return res.send({ status: "success create", users });
});

app.get("/users/:username", async (req, res) => {
  const users = await user.findAll({
    where: {
      username: req.params.username,
    },
  });
  return res.send({
    statuses: "success get",
    data: [
      ...users.map((d) => ({
        id: d.id,
        name: d.name,
        divisi: d.divisi,
        nip: d.nip,
        divisiid: d.divisiid,
      })),
    ],
  });
});

app.patch("/update/:name", async (req, res) => {
  const users = await user.update(
    { ...req.body },
    {
      where: {
        name: req.params.name,
      },
    }
  );
  return res.send({
    status: "success update",
    data: users,
  });
});

app.delete("/delete/:name", async (req, res) => {
  const users = await user.destroy({
    where: {
      name: req.params.name,
    },
  });

  return res.send({
    status: "success delete",
    data: users,
  });
});

app.get("/absensi/:nip", async (req, res) => {
  const absen = await absensi.findAll({
    where: {
      nip: req.params.nip,
    },
  });
  return res.send({
    statuses: "success get",
    data: [
      ...absen
        .map((d) => ({
          id: d.id,
          username: d.username,
          date: d.createdAt,
          status: d.status,
          jenisAbsen: d.jenisAbsen,
          userDate: d.userDate,
          address: d.address,
        }))
        .sort((a, b) =>
          Date.parse(a.date) > Date.parse(b.date)
            ? -1
            : Date.parse(a.date) < Date.parse(b.date)
            ? 1
            : 0
        ),
    ],
  });
});

app.post("/addAbsen", upload.single("imageFile"), async (req, res) => {
  const absens = await absensi.create({
    ...req.body,
  });
  return res.send({
    statuses: "success create",
    data: absens,
  });
});

// Auth

app.post("/register", async (req, res) => {
  const { password, username } = req.body;

  const find = await user.findOne({
    where: {
      username,
    },
  });

  if (find)
    return res.status(201).send({
      status: "failed",
      message: `User with username '${username}' already`,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const create = await user.create({
    ...req.body,
    password: hashedPassword,
  });

  return res.send({
    statuses: "success register",
    user: create,
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const find = await user.findOne({
    where: {
      username,
    },
  });

  if (!find)
    return res.status(201).send({
      statuses: "failed",
      message: "User not found",
    });

  const check = await bcrypt.compare(password, find.password);

  if (!check)
    return res.status(201).send({
      status: "failed",
      message: "Wrong Password",
    });

  const secret_key = "soni";
  const token = await jwt.sign({ id: find.id, username }, secret_key);

  return res.send({
    statuses: "success login",
    user: find,
    token,
  });
});

app.post("/check-auth", async (req, res) => {
  try {
    const token = req.body.token;
    const secret = "soni";

    const data = await jwt.verify(token, secret);

    if (!data)
      return res.status(401).send({
        status: "failed",
        message: "Forbidden",
      });

    const { username } = data;
    let find = await user.findOne({
      where: {
        username,
      },
    });

    if (!find)
      return res.status(201).send({
        status: "failed",
        message: "User not found",
      });

    find.password = undefined;
    return res.send({
      user: find,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "failed",
      error,
    });
  }
});
