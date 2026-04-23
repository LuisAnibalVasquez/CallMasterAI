export interface IFileStorageProvider {
  uploadFile(tenantId: string, campaignId: string, file: Buffer, originalName: string): Promise<string>;
  deleteFile(path: string): Promise<void>;
}
