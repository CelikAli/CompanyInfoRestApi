import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TitleChange,
  Employee,
} from '../models';
import {TitleChangeRepository} from '../repositories';

export class TitleChangeEmployeeController {
  constructor(
    @repository(TitleChangeRepository)
    public titleChangeRepository: TitleChangeRepository,
  ) { }

  @get('/title-changes/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to TitleChange',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.number('id') id: typeof TitleChange.prototype.id,
  ): Promise<Employee> {
    return this.titleChangeRepository.employee(id);
  }
}
