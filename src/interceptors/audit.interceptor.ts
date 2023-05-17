import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {ValidationError} from '../utils/validation.error';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'Audit'}})
export class AuditInterceptor implements Provider<Interceptor> {

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }


  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      let model: any | undefined;
      let change = false;
      if (invocationCtx.methodName === 'create') {
        model = invocationCtx.args[0];
        change = true;
      }
      else if (invocationCtx.methodName === 'updateById') {
        model = invocationCtx.args[1];
        change = true;
      }
      //Validate User only in models where fields are defined
      if (model && model.createdBy !== undefined && change) {

        try {
          const createdByUser: User = await this.userRepository.findById(
            model.createdBy
          );
          if (model.modifiedBy === undefined) {
            model.modifiedBy = createdByUser.getId();
          }
          if (!model.createdOn) {
            model.createdOn = new Date();
          }
          model.modifiedOn = new Date();

        } catch (error) {

          const err: ValidationError = new ValidationError(
            'UnprocessableEntityError',
          );
          err.statusCode = 422;
          err.code = "VALIDATION_FAILED";
          err.name = "UnprocessableEntityError";
          err.message = "The request body is invalid. See error object `details` property for more info.";
          err.details = [
            {
              "path": "/createdBy",
              "code": "reference",
              "message": "must be equal to one of the users"
            }
          ];
          throw err;

        }

      }

      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
