import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    NotesModule,
    // Use NestJS ServeStaticModule for serving SPA static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ]
})
export class AppModule {}
