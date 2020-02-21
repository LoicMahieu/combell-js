import { BaseLib } from './BaseLib';

export interface DNSRecord {
  id: string;
  type: 'A' | 'MX' | 'CNAME' | 'SRV' | 'TXT';
  record_name: string;
  ttl?: number;
  content: string;
  service?: string | null;
  target?: string | null;
  protocol?: string | null;
  priority?: number;
  port?: number | null;
  weight?: number | null;
}

export class DNS extends BaseLib {
  getRecords(domain: string) {
    return this.client.get<DNSRecord[]>(`/v2/dns/${domain}/records`);
  }

  getRecord(domain: string, recordId: string) {
    return this.client.get<DNSRecord>(`/v2/dns/${domain}/records/${recordId}`);
  }

  createRecord(domain: string, record: Omit<DNSRecord, 'id'>) {
    return this.client.post(`/v2/dns/${domain}/records`, record);
  }

  editRecord(domain: string, recordId: string, record: DNSRecord) {
    return this.client.put(`/v2/dns/${domain}/records/${recordId}`, record);
  }

  deleteRecord(domain: string, recordId: string) {
    return this.client.del(`/v2/dns/${domain}/records/${recordId}`);
  }
}
