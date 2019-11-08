const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("User", () => {
	beforeEach(async () => {
		await truncate();
	});

	it("should create user", async () => {
		const user = await factory.build("User");

		const response = await request(app)
			.post("/user")
			.send({
				name: user.name,
				email: user.email,
				password: user.password,
			});

		expect(response.status).toBe(201);
	});

	it("should not create user", async () => {
		const user = await factory.create("User", {
			name: "thales",
			email: "thalesburakowski@gmail.com",
			password: "123456",
		});

		const response = await request(app)
			.post("/user")
			.send({
				name: user.name,
				email: user.email,
				password: user.password,
			});

		expect(response.status).toBe(400);
	});

	it("should not create user when body attributes are blank or null", async () => {
		const user = await factory.build("User", {
			name: null,
			email: "",
			password: "",
		});

		const response = await request(app)
			.post("/user")
			.send({
				name: user.name,
				email: user.email,
				password: user.password,
			});

		expect(response.status).toBe(400);
	});

	it("should return a list of users", async () => {
		const fakeUserList = generateFakeUsers(3);
		await factory.createMany("User", fakeUserList);

		const response = await request(app).get("/user");

		expect(response.body.pages).toBe(1);
		expect(response.body.users.length).toBe(3);
	});

	it("should return a paginated list of 10 users", async () => {
		const fakeUserList = generateFakeUsers(13);
		await factory.createMany("User", fakeUserList);

		const response = await request(app).get("/user");

		expect(response.body.pages).toBe(2);
		expect(response.body.users.length).toBe(10);
	});

	it("should return a paginated list of 3 users", async () => {
		const fakeUserList = generateFakeUsers(13);
		await factory.createMany("User", fakeUserList);

		const response = await request(app).get("/user/2");

		expect(response.body.pages).toBe(2);
		expect(response.body.users.length).toBe(3);
	});

	it("should return a updated user", async () => {
		const user = await factory.create("User");

		const response = await request(app)
			.put("/user")
			.send({
				email: user.email,
				name: user.name,
			});

		expect(response.body.name).toBe(user.name);
	});

	it("should delete an user", async () => {
		const user = await factory.create("User");

		const response = await request(app).delete(`/user/${user.email}`);
		const users = await request(app).get("/user");

		expect(response.status).toBe(200);
		expect(users.body.users.length).toBe(0);
	});
});

function generateFakeUsers(quantity = 1) {
	const users = [];
	for (let index = 0; index < quantity; index++) {
		users.push({
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		});
	}
	return users;
}
