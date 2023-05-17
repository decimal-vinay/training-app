import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Account, AccountRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.accountNo,
  AccountRelations
> {

  public readonly createdByUser: BelongsToAccessor<User, typeof Account.prototype.accountNo>;

  public readonly modifiedByUser: BelongsToAccessor<User, typeof Account.prototype.accountNo>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Account, dataSource);
    this.modifiedByUser = this.createBelongsToAccessorFor('modifiedByUser', userRepositoryGetter,);
    this.registerInclusionResolver('modifiedByUser', this.modifiedByUser.inclusionResolver);
    this.createdByUser = this.createBelongsToAccessorFor('createdByUser', userRepositoryGetter,);
    this.registerInclusionResolver('createdByUser', this.createdByUser.inclusionResolver);
  }
}
