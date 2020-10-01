import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
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

  public readonly employees: HasManyRepositoryFactory<
    Employee,
    typeof Employee.prototype.id
  >;

  constructor(
    @inject('datasources.atezChallengeDB')
    dataSource: AtezChallengeDbDataSource,
    @repository.getter('DepartmentRepository')
    protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Employee, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor(
      'employees',
      Getter.fromValue(this),
    );
    this.registerInclusionResolver(
      'employees',
      this.employees.inclusionResolver,
    );
    this.manager = this.createBelongsToAccessorFor(
      'manager',
      Getter.fromValue(this),
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
