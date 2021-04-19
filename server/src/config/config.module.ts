import { Module } from "@nestjs/common";
import { ConfigModuleBase } from "./base/config.module.base";
import { ConfigService } from "./config.service";
import { ConfigController } from "./config.controller";
import { ConfigResolver } from "./config.resolver";

@Module({
  imports: [ConfigModuleBase],
  controllers: [ConfigController],
  providers: [ConfigService, ConfigResolver],
  exports: [ConfigService],
})
export class ConfigModule {}
