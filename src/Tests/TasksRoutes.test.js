const request = require('supertest');

const app = require('../app');
const { connectToMongo, getDb } = require('../config/mongoClient');
const { createDefaultTask } = require('../utils/validationUtils')


let db;

beforeAll(async () => {
  await connectToMongo();
  db = getDb();
  await db.collection("tasks").deleteMany({});
  console.log("Connected to DB for tests");
});

afterAll(async () => {
  await db.collection("tasks").deleteMany({});
  await db.client.close();
  console.log("🧹 Test run complete - DB remains untouched");
});


describe('GET /tasks', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return tasks after inserting them', async () => {
    const tasks = Array.from({ length: 3 }, (_,index) => createDefaultTask(index));    
    await db.collection("tasks").insertMany(tasks)
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: tasks[0].name })
      ])
    )
  });
});


describe('POST /tasks/createTask', () => {
  it('should create a new task', async () => {
    const defaultTask = createDefaultTask(Date.now());
    const res = await request(app).post('/tasks/createTask').send(defaultTask);

    expect(res.statusCode).toBe(201);
    expect(res.body.insertedId).toBeDefined();
  });

  it('should fail when missing required fields', async () => {
    const res = await request(app).post('/tasks/createTask').send({});
    expect(res.statusCode).toBe(400);
  });
});


describe('PUT /tasks/:id', () => {
  it('should update an existing task', async () => {
    const defaultTask = createDefaultTask(Date.now());
    const newTask = await db.collection("tasks").insertOne(defaultTask);
    const taskId = newTask.insertedId.toString();
    
    const updatedTask = { ...defaultTask, name: 'Jest Testing Updated' };
    const res = await request(app).put(`/tasks/${taskId}`).send(updatedTask);

    expect(res.statusCode).toBe(200);
    expect(res.body.task.name).toBe('Jest Testing Updated ');
  });

  it('should return 400 if task not found', async () => {
    const res = await request(app)
      .put('/tasks654321123456789123456789')
      .send({ name: 'Fake Update' });

    expect(res.statusCode).toBe(404);
  });
});


describe('DELETE /tasks/:id', () => {
  it('should delete an existing task', async () => {
    const defaultTask = createDefaultTask(Date.now());
    const newTask = await db.collection("tasks").insertOne(defaultTask);
    const taskId = newTask.insertedId;
    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });

  it('should return 404 if task does not exist', async () => {
    const res = await request(app).delete('/tasks/654321123456789123456789');
    expect(res.statusCode).toBe(404);
    expect(res.body).toBe('Task not found');
  });
});
