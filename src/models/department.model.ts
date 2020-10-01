import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
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

  @hasMany(() => Employee)
  employees: Employee[];

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  location?: LocationWithRelations;
  director?: EmployeeWithRelations;
  employees?: EmployeeWithRelations[];
}

export type DepartmentWithRelations = Department & DepartmentRelations;
