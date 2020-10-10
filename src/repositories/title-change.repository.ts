import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TitleChange, TitleChangeRelations, Department, Employee} from '../models';
import {AtezChallengeDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DepartmentRepository} from './department.repository';
import {EmployeeRepository} from './employee.repository';

export class TitleChangeRepository extends DefaultCrudRepository<
  TitleChange,
  typeof TitleChange.prototype.id,
  TitleChangeRelations
> {

  public readonly department: BelongsToAccessor<Department, typeof TitleChange.prototype.id>;

  public readonly employee: BelongsToAccessor<Employee, typeof TitleChange.prototype.id>;

  constructor(
    @inject('datasources.atezChallengeDB') dataSource: AtezChallengeDbDataSource, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(TitleChange, dataSource);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
  }
}
