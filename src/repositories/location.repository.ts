import {DefaultCrudRepository} from '@loopback/repository';
import {Location, LocationRelations} from '../models';
import {AtezChallengeDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id,
  LocationRelations
> {
  constructor(
    @inject('datasources.atezChallengeDB') dataSource: AtezChallengeDbDataSource,
  ) {
    super(Location, dataSource);
  }
}
