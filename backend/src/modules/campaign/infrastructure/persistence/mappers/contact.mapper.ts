import { Contact } from '../../../domain/entities/contact.entity';
import { ContactOrmEntity } from '../contact.orm-entity';

export class ContactMapper {
  static toDomain(ormEntity: ContactOrmEntity): Contact {
    return Contact.fromPersistence({
      id: ormEntity.id,
      campaignId: ormEntity.campaignId,
      name: ormEntity.name,
      phone: ormEntity.phone,
      status: ormEntity.status,
    });
  }

  static toPersistence(domainEntity: Contact): ContactOrmEntity {
    const ormEntity = new ContactOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.campaignId = domainEntity.campaignId;
    ormEntity.name = domainEntity.name;
    ormEntity.phone = domainEntity.phone;
    ormEntity.status = domainEntity.status;
    return ormEntity;
  }
}
