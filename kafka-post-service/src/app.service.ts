import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private appRepository: AppRepository) {}
  async createPost(data: any) {
    return JSON.stringify(await this.appRepository.createPost(data));
  }
  async editPost(id: number, data: any) {
    const result = await this.appRepository.editPost(id, data);

    if (!result.affected) {
      return JSON.stringify({ message: 'No such post' });
    }

    return JSON.stringify({ message: 'Success' });
  }
  async deletePost(id: number) {
    const result = await this.appRepository.deletePost(id);
    if (!result.affected) {
      return JSON.stringify({ message: 'No such post' });
    }

    return JSON.stringify({ message: 'Success' });
  }
  async getPosts() {
    return await this.appRepository.getAllPosts();
  }
  async getPostById(id: number) {
    const post = await this.appRepository.getPostById(id);
    if (!post) {
      return { message: 'No such post' };
    }

    return JSON.stringify(post);
  }
}
