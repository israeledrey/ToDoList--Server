const request = require('supertest');
const app = require('../app');
const { connectToMongo, getDb } = require('../Config/ConnectedMongo');

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


// GET test
describe('GET /tasksList', () => {
    it('should return an empty array initially', async () => {
        const res = await request(app).get('/tasksList');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
});


// POST test
describe('POST /tasks/createTask', () => {
  it('should create a new task', async () => {
    const task = {
      name: 'Just test',
      subject: 'Studies',
      dayToComplete: '2025-03-20',
      priority: '30%',
      completed: false,
      location: [32.0853, 34.7818],
    };

    const res = await request(app).post('/tasks/createTask').send(task);
    expect(res.statusCode).toBe(201);
    expect(res.body.insertedId).toBeDefined();
  });

  it('should fail when missing required fields', async () => {
    const res = await request(app).post('/tasks/createTask').send({});
    expect(res.statusCode).toBe(400);
  });
});

// PUT test
describe('PUT /tasksList/:id', () => {
  it('should update an existing task', async () => {
    const task = {
      name: 'Updated Task',
      subject: 'Work',
      dayToComplete: "2000-11-22",
      priority: "30%",
      completed: true,
      location: [-34.4444, 122.3344]
    };

    const newTask = await db.collection("tasks").insertOne(task);
    const taskId = newTask.insertedId;
    const res = await request(app)
      .put(`/tasksList/${taskId}`)  
      .send(task);
      console.log(newTask.insertedId);

    expect(res.statusCode).toBe(200);
    expect(res.body.task.name).toBe('Jest Testing Updated');
  });

  it('should return 400 if task not found', async () => {
    const res = await request(app)
      .put('/tasksList/654321123456789123456789')
      .send({ name: 'Fake Update' });

    expect(res.statusCode).toBe(400);
  });
});

// DELETE test
describe('DELETE /tasksList/:id', () => {
  it('should delete an existing task', async () => {
    const newTask = await db.collection("tasks").insertOne({
      name: 'To Delete',
      subject: 'Leisure',
    });

    const res = await request(app).delete(`/tasksList/${newTask.insertedId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });

  it('should return 404 if task does not exist', async () => {
    const res = await request(app).delete('/tasksList/654321123456789123456789');
    expect(res.statusCode).toBe(404);
    expect(res.body).toBe('Task not found');
  });
});
