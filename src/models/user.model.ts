import {Entity, model, property, hasMany} from '@loopback/repository';
import {Account} from './account.model';

@model({
  settings: {
    indexes: {
      uniqueEmpCode: {
        keys: {
          empcode: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    postgresql: {
      dataType: 'bigint'
    },
  })
  mobileNo?: number;

  @property({type: 'string', hidden: true})
  password: string;

  @property({
    type: 'string',
  })
  designation?: string;

  @property({
    type: 'number',
    required: true,
  })
  branch: number;

  @property({
    type: 'string',
  })
  department?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
    index: true
  })
  empcode: string;

  @hasMany(() => Account, {keyTo: 'createdBy'})
  accounts: Account[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
