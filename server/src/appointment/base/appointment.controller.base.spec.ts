import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AppointmentController } from "../appointment.controller";
import { AppointmentService } from "../appointment.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  clinic: "exampleClinic",
  createdAt: new Date(),
  date: new Date(),
  history: "exampleHistory",
  id: "exampleId",
  services: "exampleServices",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  clinic: "exampleClinic",
  createdAt: new Date(),
  date: new Date(),
  history: "exampleHistory",
  id: "exampleId",
  services: "exampleServices",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    clinic: "exampleClinic",
    createdAt: new Date(),
    date: new Date(),
    history: "exampleHistory",
    id: "exampleId",
    services: "exampleServices",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  clinic: "exampleClinic",
  createdAt: new Date(),
  date: new Date(),
  history: "exampleHistory",
  id: "exampleId",
  services: "exampleServices",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Appointment", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AppointmentService,
          useValue: service,
        },
      ],
      controllers: [AppointmentController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /appointments", async () => {
    await request(app.getHttpServer())
      .post("/appointments")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        date: CREATE_RESULT.date.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /appointments", async () => {
    await request(app.getHttpServer())
      .get("/appointments")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          date: FIND_MANY_RESULT[0].date.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /appointments/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/appointments"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /appointments/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/appointments"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        date: FIND_ONE_RESULT.date.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
