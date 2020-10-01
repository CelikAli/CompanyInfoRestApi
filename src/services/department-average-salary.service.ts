import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {Department, Employee} from '../models';
import {DepartmentRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class DepartmentAverageSalaryService {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) {}

  async averageSalary(id: number): Promise<number> {
    const filter: Filter<Department> = {
      include: [
        {
          relation: 'employees',
        },
      ],
    };
    const department: Department = await this.departmentRepository.findById(
      id,
      filter,
    );

    const depEmployees: Employee[] = department.employees;

    let totalSalary = 0;

    for (const employee of depEmployees) {
      totalSalary += employee.salary;
    }

    const employeeCount: number = depEmployees.length;
    const averageSalary: number = totalSalary / employeeCount;

    return averageSalary;
  }
}
