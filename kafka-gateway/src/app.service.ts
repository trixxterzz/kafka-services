import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { createTopicsIfNeeded, subscribeToTopics } from './utils/topics';
import { CreatePost, EditPost } from './interfaces/post.interface';
import { request } from './utils/request';

@Injectable()
export class AppService implements OnModuleInit {
  @Inject('GATEWAY_SERVICE')
  private readonly client: ClientKafka;
  constructor() {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('post-get');
    subscribeToTopics(this.client);
    await this.client.connect();

    const kafka = new Kafka({
      clientId: 'app',
      brokers: ['localhost:9092'],
    });

    const admin = kafka.admin();

    const topicList = await admin.listTopics();

    await createTopicsIfNeeded(admin, topicList);
  }

  getHello(): string {
    return 'Hello from Kafka Service!';
  }

  async createPost(data: CreatePost) {
    const result = await request(this.client, 'post-create', { data });
    return result;
  }

  async deletePost(id: number) {
    const result = await request(this.client, 'post-delete', { id });

    return result;
  }

  async editPost(id: number, data: EditPost) {
    const result = await request(this.client, 'post-edit', { id, data });

    return result;
  }

  async getPosts() {
    const result = await request(this.client, 'post-get', {});

    return result;
  }

  async getPostById(id: number) {
    const result = await request(this.client, 'post-get-id', { id });
    return result;
  }

  async switchPostLike(id: number) {
    const result = await request(this.client, 'post-like', { id });

    return result;
  }
}
