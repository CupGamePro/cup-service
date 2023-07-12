/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-31 16:44:01
 * @LastEditors: changwei
 * @LastEditTime: 2023-05-30 09:22:42
 * @Description: 新建页面
 */
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
  updateTime: Date;

  // 删除
  @Column({
    default: '0',
  })
  isDelete: string;
}
