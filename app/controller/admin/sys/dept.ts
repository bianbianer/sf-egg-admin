import BaseController from '../../base';
import { AdminRoute } from '../../../decorator/router_register';

/**
 * 系统部门控制器
 */
export default class SysDeptController extends BaseController {

  @AdminRoute('/sys/dept/list', 'get')
  async list() {
    this.res(
      {
        data: await this.service.admin.sys.dept.getDepts(this.ctx.token.uid),
      },
    );
  }

  @AdminRoute('/sys/dept/add', 'post')
  async add() {
    const errors = this.app.validator.validate({
      departmentName: 'string',
      parentDepartmentId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { departmentName, parentDepartmentId } = this.getBody();
    await this.service.admin.sys.dept.add(departmentName, parentDepartmentId);
    this.res();
  }

  @AdminRoute('/sys/dept/delete', 'post')
  async delete() {
    const errors = this.app.validator.validate({
      departmentId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { departmentId } = this.getBody();
    // 查询是否有关联用户，如果含有则无法删除
    const count = await this.service.admin.sys.dept.countUserByDeptId(departmentId);
    if (count > 0) {
      this.res({
        code: 10009,
      });
      return;
    }
    // 查询是否有关联的角色，角色与部门存在数据相互绑定
    const count2 = await this.service.admin.sys.dept.countRoleByDeptId(departmentId);
    if (count2) {
      this.res({
        code: 10010,
      });
      return;
    }
    await this.service.admin.sys.dept.delete(departmentId);
    this.res();
  }

  @AdminRoute('/sys/dept/info', 'get')
  async info() {
    const errors = this.app.validator.validate({
      departmentId: 'string',
    }, this.getQuery());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { departmentId } = this.getQuery();
    this.res({
      data: await this.service.admin.sys.dept.info(parseInt(departmentId)),
    });
  }

  @AdminRoute('/sys/dept/update', 'post')
  async update() {
    const errors = this.app.validator.validate({
      id: 'int',
      name: 'string',
      parentId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    await this.service.admin.sys.dept.update(this.getBody());
    this.res();
  }

  @AdminRoute('/sys/dept/transfer', 'post')
  async transfer() {
    const errors = this.app.validator.validate({
      userIds: 'array',
      departmentId: 'int',
    }, this.getBody());
    if (errors) {
      this.res({
        code: 10000,
      });
      return;
    }
    const { userIds, departmentId } = this.getBody();
    await this.service.admin.sys.dept.transfer(userIds, departmentId);
    this.res();
  }
}
