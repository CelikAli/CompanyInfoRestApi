import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department} from './department.model';
import {Employee} from './employee.model';

@model({
  settings: {
    foreignKeys: {
      fkTitleChangeDepartmentId: {
        name: 'fkTitleChangeDepartmentId',
        entity: 'Department',
        entityKey: 'id',
        foreignKey: 'departmentid',
      },
      fkTitleChangeEmployeeId: {
        name: 'fkTitleChangeEmployeeId',
        entity: 'Employee',
        entityKey: 'id',
        foreignKey: 'employeeid',
      },
    },
  },
})
export class TitleChange extends Entity {
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
  title: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @belongsTo(() => Department)
  departmentId: number;

  @belongsTo(() => Employee)
  employeeId: number;

  constructor(data?: Partial<TitleChange>) {
    super(data);
  }
}

export interface TitleChangeRelations {
  // describe navigational properties here
}

export type TitleChangeWithRelations = TitleChange & TitleChangeRelations;
