import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Account,
  User,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountUserController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/modified', {
    responses: {
      '200': {
        description: 'User belonging to Account',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getModifiedUser(
    @param.path.number('id') id: typeof Account.prototype.accountNo,
  ): Promise<User> {
    return this.accountRepository.modifiedByUser(id);
  }

  @get('/accounts/{id}/created', {
    responses: {
      '200': {
        description: 'User belonging to Account',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getCreatedUser(
    @param.path.number('id') id: typeof Account.prototype.accountNo,
  ): Promise<User> {
    return this.accountRepository.createdByUser(id);
  }
}
