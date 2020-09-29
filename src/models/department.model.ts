import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee} from './employee.model';
import {Location} from './location.model';

@model({
  settings: {
    foreignKeys: {
      fkDepartmentLocationId: {
        name: 'fkDepartmentLocationId',
        entity: 'Location',
        entityKey: 'id',
        foreignKey: 'locationid',
      },
      fkDepartmentDirectorId: {
        name: 'fkDepartmentDirectorId',
        entity: 'Employee',
        entityKey: 'id',
        foreignKey: 'directorid',
      },
    },
  },
})
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
