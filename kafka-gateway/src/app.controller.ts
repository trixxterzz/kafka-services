import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePost, EditPost } from './interfaces/post.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/post')
  async createPost(@Body() body: CreatePost) {
    return await this.appService.createPost(body);
  }

  @Delete('/post/:id')
  async deletePost(@Param('id') id: number) {
    return await this.appService.deletePost(id);
  }

  @Put('/post/:id')
  async editPost(@Param('id') id: number, @Body() data: EditPost) {
    return await this.appService.editPost(id, data);
  }

  @Get('/post/:id')
  async getPostById(@Param('id') id: number) {
    return await this.appService.getPostById(id);
  }

  @Get('/post')
  async getPosts() {
    return await this.appService.getPosts();
  }
}
