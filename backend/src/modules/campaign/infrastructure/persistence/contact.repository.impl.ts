import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IContactRepository } from '../../domain/repositories/contact.repository.interface';
import { Contact } from '../../domain/entities/contact.entity';
import { ContactOrmEntity } from './contact.orm-entity';
import { ContactMapper } from './mappers/contact.mapper';

@Injectable()
export class ContactRepositoryImpl implements IContactRepository {
  constructor(
    @InjectRepository(ContactOrmEntity)
    private readonly repository: Repository<ContactOrmEntity>,
  ) {}

  async save(contact: Contact): Promise<void> {
    const ormEntity = ContactMapper.toPersistence(contact);
    await this.repository.save(ormEntity);
  }

  async findByCampaignId(campaignId: string): Promise<Contact[]> {
    const ormEntities = await this.repository.find({ where: { campaignId } });
    return ormEntities.map(ContactMapper.toDomain);
  }
}
