import { ClientKafka } from '@nestjs/microservices';

const list = [
  'post-create',
  'post-delete',
  'post-edit',
  'post-get',
  'post-get-id',
];

export async function createTopicsIfNeeded(admin: any, topics: any) {
  const topicList = [];

  list.forEach((topic) => {
    if (!topics.includes(topic)) {
      topicList.push({
        topic: topic,
        numPartitions: 3,
        replicationFactor: 1,
      });
    }

    if (!topics.includes(`${topic}.reply`)) {
      topicList.push({
        topic: `${topic}.reply`,
        numPartitions: 3,
        replicationFactor: 1,
      });
    }
  });

  if (topicList.length) {
    await admin.createTopics({
      topics: topicList,
    });
  }
}

export function subscribeToTopics(client: ClientKafka) {
  for (const topic of list) {
    client.subscribeToResponseOf(topic);
  }
}
