import { type Response, type Request } from "express";
import Robot from "../../../database/models/Robots";
import { getRobots } from "./robotsControllers";
import robotsMock from "../../../mocks/database/robots";

type CustomResponse = Pick<Response, "status" | "json" | "header">;

const response: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  header: jest.fn(),
};

const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getRobots function controller", () => {
  const request = {};

  describe("When it receives a response", () => {
    Robot.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(robotsMock),
    });

    test("Then it should call the response method status with 200", async () => {
      const expectedStatusCode = 200;

      await getRobots(request as Request, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a list of robots", async () => {
      const expectedResponseBody = { robots: robotsMock };

      await getRobots(request as Request, response as Response, next);
      expect(response.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
  describe("When it receives a next function and the exec method rejects with an 'Error retriving robots' error", () => {
    test("Then it should call next function with error 'Error retriving robots'", async () => {
      const response = {};

      const error = new Error("Error retriving robots");

      Robot.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getRobots(request as Request, response as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
