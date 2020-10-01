import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeEmployeeController {
  constructor(
    @repository(EmployeeRepository)
    protected employeeRepository: EmployeeRepository,
  ) {}

  @get('/employees/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Employee has many Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.employees(id).find(filter);
  }

  @get('/employees/{id}/manager', {
    responses: {
      '200': {
        description: 'The manager of the employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getManager(
    @param.path.number('id') id: typeof Employee.prototype.id,
  ): Promise<Employee> {
    return this.employeeRepository.manager(id);
  }

  @post('/employees/{id}/employees', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInEmployee',
            exclude: ['id'],
            optional: ['managerId'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.employeeRepository.employees(id).create(employee);
  }

  @patch('/employees/{id}/employees', {
    responses: {
      '200': {
        description: 'Employee.Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Partial<Employee>,
    @param.query.object('where', getWhereSchemaFor(Employee))
    where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.employees(id).patch(employee, where);
  }

  @del('/employees/{id}/employees', {
    responses: {
      '200': {
        description: 'Employee.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee))
    where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.employees(id).delete(where);
  }
}
