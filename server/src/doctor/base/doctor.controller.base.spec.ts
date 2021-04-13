import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { DoctorController } from "../doctor.controller";
import { DoctorService } from "../doctor.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  clinic: "exampleClinic",
  createdAt: new Date(),
  dateLastPacient: new Date(),
  email: "exampleEmail",
  id: "exampleId",
  lastPacient: "true",
  mobile: "exampleMobile",
  name: "exampleName",
  services: "exampleServices",
  updatedAt: new Date(),
  workHour: "exampleWorkHour",
};
const CREATE_RESULT = {
  clinic: "exampleClinic",
  createdAt: new Date(),
  dateLastPacient: new Date(),
  email: "exampleEmail",
  id: "exampleId",
  lastPacient: "true",
  mobile: "exampleMobile",
  name: "exampleName",
  services: "exampleServices",
  updatedAt: new Date(),
  workHour: "exampleWorkHour",
};
const FIND_MANY_RESULT = [
  {
    clinic: "exampleClinic",
    createdAt: new Date(),
    dateLastPacient: new Date(),
    email: "exampleEmail",
    id: "exampleId",
    lastPacient: "true",
    mobile: "exampleMobile",
    name: "exampleName",
    services: "exampleServices",
    updatedAt: new Date(),
    workHour: "exampleWorkHour",
  },
];
const FIND_ONE_RESULT = {
  clinic: "exampleClinic",
  createdAt: new Date(),
  dateLastPacient: new Date(),
  email: "exampleEmail",
  id: "exampleId",
  lastPacient: "true",
  mobile: "exampleMobile",
  name: "exampleName",
  services: "exampleServices",
  updatedAt: new Date(),
  workHour: "exampleWorkHour",
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

describe("Doctor", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: DoctorService,
          useValue: service,
        },
      ],
      controllers: [DoctorController],
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

  test("POST /doctors", async () => {
    await request(app.getHttpServer())
      .post("/doctors")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        dateLastPacient: CREATE_RESULT.dateLastPacient.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /doctors", async () => {
    await request(app.getHttpServer())
      .get("/doctors")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          dateLastPacient: FIND_MANY_RESULT[0].dateLastPacient.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /doctors/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/doctors"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /doctors/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/doctors"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        dateLastPacient: FIND_ONE_RESULT.dateLastPacient.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
