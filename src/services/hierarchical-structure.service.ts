import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class HierarchicalStructureService {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) {}

  async getHierarchicalStructure() {
    const NO_MANAGER_ID = -1;
    const baseFilter: Filter<Employee> = {where: {managerId: NO_MANAGER_ID}};
    const baseManagers: Employee[] = await this.employeeRepository.find(
      baseFilter,
    );

    await this.assignEmployeesToManagers(baseManagers);

    return baseManagers;
  }

  private async assignEmployeesToManagers(managers: Employee[]): Promise<void> {
    if (managers.length === 0) {
      return;
    }

    for (const manager of managers) {
      manager.employees = await this.employeeRepository.find({
        where: {managerId: manager.id},
      });

      await this.assignEmployeesToManagers(manager.employees);
    }
  }
}
