import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Department,
  Employee,
} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentEmployeeController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Department',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.number('id') id: typeof Department.prototype.id,
  ): Promise<Employee> {
    return this.departmentRepository.director(id);
  }
}
