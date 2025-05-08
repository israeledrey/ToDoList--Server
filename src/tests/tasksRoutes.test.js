const request = require('supertest');
const { StatusCodes } = require("http-status-codes");

const app = require('../app');
const { connectToMongo, getDb } = require('../db/mongoClient');
const { createTask } = require('../utils/generateMockTask')


let db;
jest.setTimeout(15000);

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

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toEqual([]);
  });

  it('should return tasks after inserting them', async () => {
    const tasks = Array.from({ length: 3 }, () => createTask());
    await db.collection("tasks").insertMany(tasks)
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(StatusCodes.OK);
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
    const task = createTask();
    const res = await request(app).post('/tasks/createTask').send(task);

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(res.body._id).toBeDefined();
  });

  it('should fail when missing required fields', async () => {
    const res = await request(app).post('/tasks/createTask').send({});

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});


describe('PUT /tasks/:id', () => {
  it('should update an existing task', async () => {
    const task = createTask();
    const insertedTask = await db.collection("tasks").insertOne(task);
    const id = insertedTask.insertedId.toString();

    const updateTask = createTask({ name: 'Jest Testing Updated' });
    const { _id, ...taskWithoutId } = updateTask;
    const res = await request(app).put(`/tasks/${id}`).send(taskWithoutId);

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.name).toBe('Jest Testing Updated');
  });

  it('should return 400 if task not found', async () => {
    const res = await request(app)
      .put('/tasks654321123456789123456789')
      .send({ name: 'Fake Update' });

    expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});


describe('DELETE /tasks/:id', () => {
  it('should delete an existing task', async () => {
    const task = createTask();    
    const insertedTask = await db.collection("tasks").insertOne(task);
    const id = insertedTask.insertedId;
    const res = await request(app).delete(`/tasks/${id}`);

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.message).toBe('Task deleted successfully');
  });

  it('should return 404 if task does not exist', async () => {
    const res = await request(app).delete('/tasks/654321123456789123456789');

    expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(res.body).toBe('Task not found or invalid ID');
  });
});
