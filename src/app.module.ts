import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GangsanModule } from './gangsan/gangsan.module';
import { OpenAIModule } from './open-ai/open-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GangsanModule,
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
