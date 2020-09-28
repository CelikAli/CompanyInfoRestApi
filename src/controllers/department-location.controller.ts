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
  Location,
} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentLocationController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/location', {
    responses: {
      '200': {
        description: 'Location belonging to Department',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Location)},
          },
        },
      },
    },
  })
  async getLocation(
    @param.path.number('id') id: typeof Department.prototype.id,
  ): Promise<Location> {
    return this.departmentRepository.location(id);
  }
}
