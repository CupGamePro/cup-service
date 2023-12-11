/*
 * @Author: changwei changweicup@163.com
 * @Date: 2023-03-12 16:25:53
 * @LastEditors: changwei
 * @LastEditTime: 2023-04-01 23:42:16
 * @Description: 菜单列表返回DTO
 */

export class MenuListDto {
  uuid: string;

  name?: string;

  code?: string;

  icon?: string;

  path?: string;

  level?: number;

  parentId?: string;

  parentName?: string;

  type?: number;

  typeName?: string;

  sort?: number;

  describe?: string;

  status?: number;

  statusName?: string;

  children?: MenuListDto[];
}
