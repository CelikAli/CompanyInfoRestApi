import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Department, DepartmentWithRelations} from './department.model';

@model()
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

  @belongsTo(() => Employee, {}, {default: -1})
  managerId: number;

  @hasMany(() => Employee, {keyTo: 'managerId'})
  employees: Employee[];

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  department?: DepartmentWithRelations;
  manager?: EmployeeWithRelations;
  employees?: EmployeeWithRelations[];
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
