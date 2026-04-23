import { ContactMapper } from './contact.mapper';
import { Contact } from '../../../domain/entities/contact.entity';
import { ContactOrmEntity } from '../contact.orm-entity';
import { ContactStatus } from '../../../domain/enums';

describe('ContactMapper', () => {
  it('should map domain to persistence', () => {
    const domain = new Contact({
      id: '1',
      campaignId: 'c1',
      name: 'John Doe',
      phone: '123456789',
    });

    const orm = ContactMapper.toPersistence(domain);

    expect(orm.id).toBe(domain.id);
    expect(orm.status).toBe(ContactStatus.PENDING);
  });

  it('should map persistence to domain', () => {
    const orm = new ContactOrmEntity();
    orm.id = '1';
    orm.campaignId = 'c1';
    orm.name = 'John Doe';
    orm.phone = '123456789';
    orm.status = ContactStatus.PENDING;

    const domain = ContactMapper.toDomain(orm);

    expect(domain.id).toBe(orm.id);
    expect(domain.status).toBe(orm.status);
  });
});
