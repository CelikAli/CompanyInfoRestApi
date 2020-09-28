import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Department, DepartmentRelations, Location, Employee} from '../models';
import {AtezChallengeDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LocationRepository} from './location.repository';
import {EmployeeRepository} from './employee.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly location: BelongsToAccessor<Location, typeof Department.prototype.id>;

  public readonly director: BelongsToAccessor<Employee, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.atezChallengeDB') dataSource: AtezChallengeDbDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Department, dataSource);
    this.director = this.createBelongsToAccessorFor('director', employeeRepositoryGetter,);
    this.registerInclusionResolver('director', this.director.inclusionResolver);
    this.location = this.createBelongsToAccessorFor('location', locationRepositoryGetter,);
    this.registerInclusionResolver('location', this.location.inclusionResolver);
  }
}
