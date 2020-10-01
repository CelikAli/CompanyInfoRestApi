import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee, EmployeeWithRelations} from './employee.model';
import {Location, LocationWithRelations} from './location.model';

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
  location?: LocationWithRelations;
  director?: EmployeeWithRelations;
}

export type DepartmentWithRelations = Department & DepartmentRelations;
