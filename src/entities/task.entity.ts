import { CommonEntity } from './common.entity';

export class Task extends CommonEntity {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  createdBy: string;
  assignedTo: string;
  projectId: string;
  project: any;
  comments: any;
  attachments: any;
  createdDate: Date;
  updatedDate: Date;
}
