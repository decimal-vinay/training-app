import {inject} from '@loopback/context';
import {HttpErrors, Response, RestBindings, post, requestBody} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';

export class OTPController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) { }

  @post('/generateOTP')
  async generateOTP(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              mobileNumber: {type: 'string', pattern: '^\\+91[1-9][0-9]{9}$'}, // Indian mobile number format
            },
            required: ['mobileNumber'],
          },
        },
      },
    })
    requestBody: {mobileNumber: string},
  ): Promise<object> {
    if (!requestBody.mobileNumber) {
      throw new HttpErrors.BadRequest('Mobile number is required');
    }

    if (!/^(\+91)[1-9][0-9]{9}$/.test(requestBody.mobileNumber)) {
      throw new HttpErrors.BadRequest('Invalid mobile number format. It should be in the format +91xxxxxxxxxx');
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // Generate unique request ID
    const requestId = uuidv4();

    // Here you would typically send the OTP code via SMS to the provided mobile number

    // For demonstration, let's just return the OTP code and request ID
    return {
      requestId,
      otpCode,
    };
  }

  @post('/validateOTP')
  async validateOTP(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              requestId: {type: 'string'},
              otpCode: {type: 'number'},
            },
            required: ['requestId', 'otpCode'],
          },
        },
      },
    })
    requestBody: {requestId: string, otpCode: number},
  ): Promise<object> {
    // In a real application, you would typically store the OTP codes and validate them against the provided requestId.
    // For demonstration purposes, let's just compare the provided OTP code with a hardcoded value.
    const validOTP = 123456; // Hardcoded OTP code (replace this with your actual validation logic)

    if (requestBody.otpCode !== validOTP) {
      throw new HttpErrors.Unauthorized('Invalid OTP code');
    }

    return {
      message: 'OTP is valid',
    };
  }
}
