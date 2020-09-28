import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employee,
  Employee,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeEmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.number('id') id: typeof Employee.prototype.id,
  ): Promise<Employee> {
    return this.employeeRepository.manager(id);
  }
}
