import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Location} from './location.model';
import {Employee} from './employee.model';

@model()
export class Department extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Location)
  locationId: number;

  @belongsTo(() => Employee)
  directorId: number;

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
