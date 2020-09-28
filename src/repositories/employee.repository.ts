import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {AtezChallengeDbDataSource} from '../datasources';
import {Department, Employee, EmployeeRelations} from '../models';
import {DepartmentRepository} from './department.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  public readonly department: BelongsToAccessor<
    Department,
    typeof Employee.prototype.id
  >;

  public readonly manager: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;

  constructor(
    @inject('datasources.atezChallengeDB')
    dataSource: AtezChallengeDbDataSource,
    @repository.getter('DepartmentRepository')
    protected departmentRepositoryGetter: Getter<DepartmentRepository>,
    @repository.getter('EmployeeRepository')
    protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Employee, dataSource);
    this.manager = this.createBelongsToAccessorFor(
      'manager',
      employeeRepositoryGetter,
    );
    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.department = this.createBelongsToAccessorFor(
      'department',
      departmentRepositoryGetter,
    );
    this.registerInclusionResolver(
      'department',
      this.department.inclusionResolver,
    );
  }
}
