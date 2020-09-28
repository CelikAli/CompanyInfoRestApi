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
  Department,
} from '../models';
import {TitleChangeRepository} from '../repositories';

export class TitleChangeDepartmentController {
  constructor(
    @repository(TitleChangeRepository)
    public titleChangeRepository: TitleChangeRepository,
  ) { }

  @get('/title-changes/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to TitleChange',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department)},
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.number('id') id: typeof TitleChange.prototype.id,
  ): Promise<Department> {
    return this.titleChangeRepository.department(id);
  }
}
