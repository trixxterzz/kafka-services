import { ClientKafka } from '@nestjs/microservices';

export async function request(
  client: ClientKafka,
  topic: string,
  data: any,
): Promise<any> {
  return new Promise((resolve) => {
    client.send(topic, data).subscribe((result: any) => resolve(result));
  });
}
