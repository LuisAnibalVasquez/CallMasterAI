import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IFileStorageProvider } from '../../application/ports/file-storage.provider.interface';

@Injectable()
export class LocalFileSystemStorageAdapter implements IFileStorageProvider {
  private readonly rootDir = 'uploads';

  async uploadFile(
    tenantId: string,
    campaignId: string,
    file: Buffer,
    originalName: string,
  ): Promise<string> {
    const dir = path.join(
      this.rootDir,
      'tenants',
      tenantId,
      'campaigns',
      campaignId,
    );
    await fs.mkdir(dir, { recursive: true });

    const filePath = path.join(dir, `${Date.now()}-${originalName}`);
    await fs.writeFile(filePath, file);

    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
}
