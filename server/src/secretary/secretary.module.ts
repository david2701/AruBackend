import { Module } from "@nestjs/common";
import { SecretaryModuleBase } from "./base/secretary.module.base";
import { SecretaryService } from "./secretary.service";
import { SecretaryController } from "./secretary.controller";
import { SecretaryResolver } from "./secretary.resolver";

@Module({
  imports: [SecretaryModuleBase],
  controllers: [SecretaryController],
  providers: [SecretaryService, SecretaryResolver],
  exports: [SecretaryService],
})
export class SecretaryModule {}
