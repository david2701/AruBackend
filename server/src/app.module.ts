import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { DoctorModule } from "./doctor/doctor.module";
import { SecretaryModule } from "./secretary/secretary.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { ServiceModule } from "./service/service.module";
import { ConfigModule } from "./config/config.module";
import { ChatModule } from "./chat/chat.module";
import { SessionModule } from "./session/session.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    DoctorModule,
    SecretaryModule,
    AppointmentModule,
    ServiceModule,
    ConfigModule,
    ChatModule,
    SessionModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
