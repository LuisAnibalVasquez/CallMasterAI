import { Contact } from './contact.entity';
import { ContactStatus } from '../enums';

describe('Contact Entity', () => {
  it('should create a contact', () => {
    const contact = new Contact({
      id: '1',
      campaignId: 'c1',
      name: 'John Doe',
      phone: '1234567890',
    });
    expect(contact.status).toBe(ContactStatus.PENDING);
    expect(contact.name).toBe('John Doe');
  });
});
