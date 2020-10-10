import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Employee, TitleChange} from '../models';
import {TitleChangeRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class EmployeeTitleChangeLinkerService {
  constructor(
    @repository(TitleChangeRepository)
    public titleChangeRepository: TitleChangeRepository,
  ) {}

  async createNewTitleChange(employee: Employee): Promise<TitleChange> {
    const titleChange: Omit<TitleChange, 'id'> = new TitleChange({
      title: employee.title,
      startDate: employee.employmentDate,
      departmentId: employee.departmentId,
      employeeId: employee.id,
    });

    return this.titleChangeRepository.create(titleChange);
  }
}
