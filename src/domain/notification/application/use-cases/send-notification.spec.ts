import { SendNotificationUseCase } from './send-notification';

import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to Send a notification', async () => {
    const result = await sut.execute({
      title: 'test-notification',
      content: 'test-content-notification',
      recipientId: 'test-recipient-id',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(result.value?.notification);
  });
});

