import { DataSource, DeleteResult, UpdateResult, Repository } from 'typeorm';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository extends Repository<Post> {
  constructor(private datasource: DataSource) {
    super(Post, datasource.createEntityManager());
  }

  async createPost(data: Post): Promise<Post> {
    const { title, content } = data;

    const post = this.create({
      title,
      content,
    });

    await this.save(post);
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const query = this.createQueryBuilder('post');
    return await query.getMany();
  }

  async getPostById(id: number): Promise<Post> {
    const query = this.createQueryBuilder('post');
    query.where({ id });

    return await query.getOne();
  }

  async editPost(id: number, data: Post): Promise<UpdateResult> {
    const { title, content } = data;
    const result = await this.update({ id }, { title, content });
    console.log(result);
    return result;
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
