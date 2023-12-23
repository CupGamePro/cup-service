import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity({ name: 'services' })
export class Services extends CommonEntity {
  @Column()
  name: string;

  @Column({ name: 'git_address' })
  gitAddress: string;

  @Column({ name: 'git_branch' })
  gitBranch: string;

  @Column({ name: 'git_commit_id' })
  gitCommitId: string;

  @Column({ name: 'git_commit_message' })
  gitCommitMessage: string;

  @Column({
    name: 'git_commit_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  gitCommitTime: Date;

  @Column()
  owner: string;
}
