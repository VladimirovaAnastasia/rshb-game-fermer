const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
    try {
        const {username, password} = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {users = []} = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            delete userFromBd.password;
            return res.json(userFromBd);
        }

        return res.status(403).json({message: "User not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Эндпоинт для грядок
server.get("/beds", (req, res) => {
    try {
        const {user_id} = req.query;

        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {beds = []} = db;

        const bedsFilteredByUser = beds
            .filter((bed) => bed.user_id === user_id)
            .map((bed) => ({
                ...bed,
                harvest:
                    !!bed.plant_time &&
                    new Date() - new Date(bed.plant_time) > 24 * 60 * 60 * 1000, // 24 hours
            }));

        if (bedsFilteredByUser) {
            return res.json(bedsFilteredByUser);
        }

        return res.status(403).json({message: "Beds for user not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Эндпоинт для сбора урожая
server.post("/beds/harvest", (req, res) => {
    try {
        const {user_id, bed_id} = req.body;

        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {beds = [], users = []} = db;

        const harvestIndex = beds.findIndex(
            (bed) => bed.user_id === user_id && bed.id === bed_id,
        );

        if (harvestIndex !== -1) {
            beds[harvestIndex].plant_time = null;
            beds[harvestIndex].crop = null;
            const bedsFiltered = beds.map((bed) => ({
                ...bed,
                harvest:
                    !!bed.plant_time &&
                    new Date() - new Date(bed.plant_time) > 24 * 60 * 60 * 1000, // 24 hours
            }));
            db.beds = beds;

            const userIndex = users.findIndex((user) => user.id === user_id);
            db.users[userIndex].ballance += 100;

            fs.writeFileSync(
                path.resolve(__dirname, "db.json"),
                JSON.stringify(db, null, 2),
            );
            return res.json(bedsFiltered);
        }

        return res.status(403).json({message: "Beds for user not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Эндпоинт для засеивания грядок
server.post("/beds/plant", (req, res) => {
    try {
        const {user_id, beds: planted_beds} = req.body;

        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {beds = [], users = []} = db;

        for (let i = 0; i < 10; i++) {
            const bedIndex = beds.findIndex(
                (bed) => bed.user_id === user_id && planted_beds[i].id === bed.id,
            );
            db.beds[bedIndex].crop = planted_beds[i].crop;
            db.beds[bedIndex].plant_time = new Date().toISOString();
        }
        fs.writeFileSync(
            path.resolve(__dirname, "db.json"),
            JSON.stringify(db, null, 2),
        );
        return res.json(db.beds.filter((bed) => bed.user_id === user_id));

        return res.status(403).json({message: "Beds for user not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Эндпоинт для задач
server.get("/tasks", (req, res) => {
    try {
        const {user_id} = req.query;

        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {tasks = []} = db;

        const tasksFilteredByUser = tasks
            .filter((tasks) => tasks.user_id === user_id)
            .map((task) => ({
                ...task,
                active:
                    new Date() - new Date(task.last_activity_time) > 12 * 60 * 60 * 1000,
            }));

        if (tasksFilteredByUser) {
            return res.json(tasksFilteredByUser);
        }

        return res.status(403).json({message: "Beds for user not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Эндпоинт для сбора урожая
server.post("/tasks/complete", (req, res) => {
    try {
        const {task_id} = req.body;

        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {tasks = [], users = []} = db;

        // TODO: Это небезопасно, рест открытый и кто угодно может намайнить себе сколько угодно денег
        const completedTaskIndex = tasks
            .map((task) => ({
                ...task,
                active:
                    new Date() - new Date(task.last_activity_time) > 12 * 60 * 60 * 1000,
            }))
            .findIndex((task) => task.id === task_id && !task.completed);

        if (completedTaskIndex !== -1) {
            tasks[completedTaskIndex].last_activity_time = new Date().toISOString();
            const userIndex = users.findIndex(
                (user) => user.id === tasks[completedTaskIndex].user_id,
            );
            db.users[userIndex].ballance += tasks[completedTaskIndex].cost;
            db.tasks = tasks;

            const tasksFiltered = tasks
                .filter((tasks) => tasks.user_id === users[userIndex].id)
                .map((task) => ({
                    ...task,
                    active:
                        new Date() - new Date(task.last_activity_time) >
                        12 * 60 * 60 * 1000,
                }));

            fs.writeFileSync(
                path.resolve(__dirname, "db.json"),
                JSON.stringify(db, null, 2),
            );

            return res.json(tasksFiltered);
        }

        return res.status(403).json({message: "Task not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

server.post("/tasks/fail", (req, res) => {
    try {
        const {task_id} = req.body;

        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {tasks = [], users = []} = db;

        // TODO: Это небезопасно, рест открытый и кто угодно может намайнить себе сколько угодно денег
        const failedTaskIndex = tasks
            .map((task) => ({
                ...task,
                active:
                    new Date() - new Date(task.last_activity_time) > 12 * 60 * 60 * 1000,
            }))
            .findIndex((task) => task.id === task_id && !task.completed);

        if (failedTaskIndex !== -1) {
            tasks[failedTaskIndex].last_activity_time = new Date().toISOString();
            const userIndex = users.findIndex(
                (user) => user.id === tasks[failedTaskIndex].user_id,
            );
            db.tasks = tasks;

            const tasksFiltered = tasks
                .filter((tasks) => tasks.user_id === users[userIndex].id)
                .map((task) => ({
                    ...task,
                    active:
                        new Date() - new Date(task.last_activity_time) >
                        12 * 60 * 60 * 1000,
                }));

            fs.writeFileSync(
                path.resolve(__dirname, "db.json"),
                JSON.stringify(db, null, 2),
            );

            return res.json(tasksFiltered);
        }

        return res.status(403).json({message: "Task not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Получение данных пользователя
server.get("/user", (req, res) => {
    try {
        const {user_id} = req.query;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {users = []} = db;

        const user = users.find((user) => user.id === user_id);

        if (user) {
            delete user.password;
            return res.json(user);
        }

        return res.status(403).json({message: "User not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

// Получение викторины
server.get("/surveys", (req, res) => {
    try {
        const {task_id} = req.query;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const {surveys = []} = db;

        const survey = surveys.find((survey) => survey.task_id === task_id);

        if (survey) {
            return res.json(survey);
        }

        return res.status(403).json({message: "Survey not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

server.get("/products", (req, res) => {
    try {
        const {filter, user_id} = req.query;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );

        let {products} = db;
        const {users} = db;

        const user = users.find(user => user.id === user_id);

        if (user_id && user) {
            switch (filter) {
                case "mine": {
                    products = products.filter((item) => user.products.includes(item.id))
                    break;
                }
                case "available": {
                    products = products.filter((item) => user.ballance > item.price && !user.products.includes(item.id))
                    break;
                }
            }
        }

        products.forEach(item => {
            if (!user.products.includes(item.id)) {
                delete item.content
            }
        })

        if (products) {
            return res.json(products);
        }

        return res.status(403).json({message: "Survey not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

server.post("/products", (req, res) => {
    try {
        const {user_id, product_id} = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );

        let {products} = db;
        const {users} = db;

        const userIndex = users.findIndex(user => user.id === user_id);
        const productIndex = products.findIndex(product => product.id === product_id);

        if (userIndex !== -1 && productIndex != -1) {
            if (users[userIndex].ballance < products[productIndex].price) {
                return res.status(409).json({message: "Not enought money on ballance"})
            }
            if (users[userIndex].products.includes(products[productIndex].id)) {
                return res.status(409).json({message: "Already bought"})
            }

            users[userIndex].ballance -= products[productIndex].price;
            users[userIndex].products.push(products[productIndex].id)

            db.users = users;

            fs.writeFileSync(
                path.resolve(__dirname, "db.json"),
                JSON.stringify(db, null, 2),
            );
        }

        products.forEach(item => {
            if (!users[userIndex].products.includes(item.id)) {
                delete item.content
            }
        })

        if (products) {
            return res.json(products);
        }

        return res.status(403).json({message: "Survey not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

server.get("/images/products", (req, res) => {
    try {
        const {image} = req.query;

        const contents = fs.readFileSync(path.resolve(__dirname, `images/products/${image}`));

        if (contents) {
            res.setHeader("content-type", "image/png")
            return res.send(contents);
        }

        return res.status(403).json({message: "Survey not found"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
})



// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({message: "AUTH ERROR"});
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log("server is running on 8000 port");
});
