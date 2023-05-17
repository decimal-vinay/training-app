import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Account,
} from '../models';
import {UserRepository} from '../repositories';

export class UserAccountController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/accounts', {
    responses: {
      '200': {
        description: 'Array of User has many Account',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Account)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.userRepository.accounts(id).find(filter);
  }

  @post('/users/{id}/accounts', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Account)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccountInUser',
            exclude: ['accountNo'],
            optional: ['createdBy']
          }),
        },
      },
    }) account: Omit<Account, 'accountNo'>,
  ): Promise<Account> {
    return this.userRepository.accounts(id).create(account);
  }

  @patch('/users/{id}/accounts', {
    responses: {
      '200': {
        description: 'User.Account PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Partial<Account>,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return this.userRepository.accounts(id).patch(account, where);
  }

  @del('/users/{id}/accounts', {
    responses: {
      '200': {
        description: 'User.Account DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return this.userRepository.accounts(id).delete(where);
  }
}
