import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('post-create')
  async createPost(@Payload() message) {
    return await this.appService.createPost(message.data);
  }

  @MessagePattern('post-edit')
  async editPost(@Payload() message) {
    return await this.appService.editPost(message.id, message.data);
  }

  @MessagePattern('post-delete')
  async deletePost(@Payload() message) {
    return await this.appService.deletePost(message.id);
  }

  @MessagePattern('post-get')
  async getPosts() {
    return await this.appService.getPosts();
  }

  @MessagePattern('post-get-id')
  async getPostById(@Payload() message) {
    return await this.appService.getPostById(message.id);
  }
}
