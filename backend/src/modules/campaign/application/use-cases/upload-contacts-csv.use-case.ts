import { Injectable, Inject } from '@nestjs/common';
import type { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import type { IContactRepository } from '../../domain/repositories/contact.repository.interface';
import type { IFileStorageProvider } from '../ports/file-storage.provider.interface';
import { CAMPAIGN_REPOSITORY, CONTACT_REPOSITORY, FILE_STORAGE_PROVIDER } from '../constants/injection-tokens';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { CampaignStatus } from '../../domain/enums/campaign-status.enum';
import { Contact } from '../../domain/entities/contact.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadContactsCsvUseCase {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: IContactRepository,
    @Inject(FILE_STORAGE_PROVIDER)
    private readonly fileStorageProvider: IFileStorageProvider,
  ) {}

  async execute(data: {
    campaignId: string;
    file: Buffer;
    originalName: string;
  }): Promise<{ total: number; valid: number; invalid: number }> {
    const campaign = await this.campaignRepository.findById(data.campaignId);
    if (!campaign) {
      throw new DomainException('Campaign not found');
    }

    if (campaign.status !== CampaignStatus.DRAFT) {
      throw new DomainException('Campaign must be in DRAFT status');
    }

    await this.fileStorageProvider.uploadFile(
      campaign.tenantId,
      campaign.id,
      data.file,
      data.originalName,
    );

    const lines = data.file.toString().split('\n');
    lines.shift(); // skip header

    let valid = 0;
    let invalid = 0;

    for (const line of lines) {
      if (!line.trim()) continue;
      const [name, phone] = line.split(',');
      if (name && phone) {
        const contact = new Contact({
          id: uuidv4(),
          campaignId: campaign.id,
          name: name.trim(),
          phone: phone.trim(),
        });
        await this.contactRepository.save(contact);
        valid++;
      } else {
        invalid++;
      }
    }

    return { total: valid + invalid, valid, invalid };
  }
}
