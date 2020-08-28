// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBase from '../../../app/service/base';
import ExportAdminComm from '../../../app/service/admin/comm';
import ExportAdminSysMenu from '../../../app/service/admin/sys/menu';
import ExportAdminSysRole from '../../../app/service/admin/sys/role';
import ExportAdminSysUser from '../../../app/service/admin/sys/user';

declare module 'egg' {
  interface IService {
    base: AutoInstanceType<typeof ExportBase>;
    admin: {
      comm: AutoInstanceType<typeof ExportAdminComm>;
      sys: {
        menu: AutoInstanceType<typeof ExportAdminSysMenu>;
        role: AutoInstanceType<typeof ExportAdminSysRole>;
        user: AutoInstanceType<typeof ExportAdminSysUser>;
      }
    }
  }
}
