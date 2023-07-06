import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';

@model(
  {
    settings: {
      strict: false
    }
  }
)
export class Account extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  accountNo?: number;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'string',
    required: true,
    default: 'Active',
    jsonSchema: {
      enum: ['Active', 'Inactive'],
    },
  })
  status: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['SA', 'CA'],
    },
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  branchCode: string;

  @property({
    type: 'string',
    required: true,
  })
  branchName: string;


  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
  })
  createdOn: string;



  @property({
    type: 'date',
    default: () => new Date(),
  })
  modifiedOn?: string;

  @belongsTo(() => User, {name: 'createdByUser'})
  createdBy: number;

  @belongsTo(() => User, {name: 'modifiedByUser'})
  modifiedBy: number;

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
