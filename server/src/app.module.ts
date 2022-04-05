import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { LocationModule } from './modules/location/location.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    LocationModule,
    StoreModule,
    MongooseModule.forRoot(appConfig().database.url, {
      connectionName: 'mongo',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
