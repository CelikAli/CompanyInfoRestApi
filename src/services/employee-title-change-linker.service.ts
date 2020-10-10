import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Employee} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class EmployeeTitleChangeLinkerService {
  constructor(/* Add @inject to inject parameters */) {}

  createNewTitleChange(employee: Employee) {}
}
