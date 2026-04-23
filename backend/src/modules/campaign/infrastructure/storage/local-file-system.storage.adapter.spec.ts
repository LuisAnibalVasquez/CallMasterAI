import { LocalFileSystemStorageAdapter } from './local-file-system.storage.adapter';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('LocalFileSystemStorageAdapter', () => {
  let adapter: LocalFileSystemStorageAdapter;

  beforeEach(() => {
    adapter = new LocalFileSystemStorageAdapter();
    jest.clearAllMocks();
  });

  it('should upload file', async () => {
    const file = Buffer.from('test');
    const pathResult = await adapter.uploadFile('t1', 'c1', file, 'test.txt');

    expect(fs.mkdir).toHaveBeenCalledWith(
      expect.stringContaining('uploads/tenants/t1/campaigns/c1'),
      { recursive: true },
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('test.txt'),
      file,
    );
    expect(pathResult).toContain('test.txt');
  });

  it('should delete file', async () => {
    await adapter.deleteFile('path/to/file');
    expect(fs.unlink).toHaveBeenCalledWith('path/to/file');
  });
});
