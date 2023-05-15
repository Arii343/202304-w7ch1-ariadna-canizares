import { type Response, type Request } from "express";
import Robot from "../../../database/models/Robots";
import { getRobot, getRobots } from "./robotsControllers";
import { robotsMock, robotMock } from "../../../mocks/database/robots";
import CustomError from "../../../CustomError/CustomError.js";

type CustomResponse = Pick<Response, "status" | "json" | "header">;
type CustomRequest = Pick<Request, "params">;

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

describe("Given a getRobot function controller", () => {
  const request: CustomRequest = {
    params: { id: robotMock._id.toString() },
  };
  describe("When it receives a response", () => {
    Robot.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(robotMock),
    });

    test("Then it should call the response method status with 200", async () => {
      const expectedStatusCode = 200;

      await getRobot(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response's method json with a robot", async () => {
      const expectedResponseBody = { robot: robotMock };

      await getRobot(
        request as Request<{ id: string }>,
        response as Response,
        next
      );
      expect(response.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
  describe("When it receives a next function and the exec method rejects with an 'Error retriving the robot' error", () => {
    test("Then it should call next function with error 'Error retriving the robot'", async () => {
      const response = {};

      const error = new Error("Error retriving the robot");

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getRobot(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a next function and the exec method rejects with an 'Robot not found' error", () => {
    test("Then it should call next function with error 'Robot not found'", async () => {
      const response = {};
      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      const error = new CustomError(404, "Robot not found");

      await getRobot(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
