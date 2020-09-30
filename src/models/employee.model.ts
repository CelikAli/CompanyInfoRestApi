import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department, DepartmentWithRelations} from './department.model';

@model({
  settings: {
    foreignKeys: {
      fkEmployeeDepartmentId: {
        name: 'fkEmployeeDepartmentId',
        entity: 'Department',
        entityKey: 'id',
        foreignKey: 'departmentid',
      },
      fkEmployeeManagerId: {
        name: 'fkEmployeeManagerId',
        entity: 'Employee',
        entityKey: 'id',
        foreignKey: 'managerid',
      },
    },
  },
})
export class Employee extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @property({
    type: 'date',
    required: true,
  })
  employmentDate: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @belongsTo(() => Department)
  departmentId: number;

  @belongsTo(() => Employee)
  managerId: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  department?: DepartmentWithRelations;
  manager?: EmployeeWithRelations;
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
