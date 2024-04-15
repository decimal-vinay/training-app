import {inject} from '@loopback/context';
import {get, Response, RestBindings} from '@loopback/rest';

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface Branch {
  branchCode: string;
  branchName: string;
  address: Address;
}

interface ResponseGetAllBranches {
  branches: Branch[]
}

export class BranchController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) { }

  @get('/branches')
  getAllBranches(): ResponseGetAllBranches {
    // Retrieve branches from the database or any data source
    const addresses: Address[] = [
      {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
      {
        street: '456 Downtown Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
      {
        street: '789 East Side Road',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700001',
      },
      {
        street: '101 New City Plaza',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
      },
      {
        street: '345 Lakeview Lane',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
      },
      {
        street: '678 Hilltop Street',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500001',
      },
      {
        street: '910 River Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
      },
      {
        street: '111 Park Avenue',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380001',
      },
      {
        street: '222 Sunset Boulevard',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
      },
      {
        street: '333 Ocean View Drive',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        pincode: '226001',
      },
      {
        street: '444 Forest Lane',
        city: 'Kanpur',
        state: 'Uttar Pradesh',
        pincode: '208001',
      },
      {
        street: '555 Mountain Road',
        city: 'Nagpur',
        state: 'Maharashtra',
        pincode: '440001',
      },
      {
        street: '666 Valley Street',
        city: 'Indore',
        state: 'Madhya Pradesh',
        pincode: '452001',
      },
      {
        street: '777 Hillside Avenue',
        city: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        pincode: '530001',
      },
      {
        street: '888 Riverfront Road',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695001',
      },
      {
        street: '999 Lake Shore Drive',
        city: 'Guwahati',
        state: 'Assam',
        pincode: '781001',
      },
      {
        street: '1212 Meadow Lane',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        pincode: '462001',
      },
      {
        street: '1313 Elm Street',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800001',
      },
      {
        street: '1414 Maple Avenue',
        city: 'Ranchi',
        state: 'Jharkhand',
        pincode: '834001',
      },
      {
        street: '1515 Cherry Lane',
        city: 'Dehradun',
        state: 'Uttarakhand',
        pincode: '248001',
      },
    ];

    // Generate sample branches using the addresses
    const branches: Branch[] = addresses.map((address, index) => {
      return {
        branchCode: (index + 1).toString().padStart(3, '0'),
        branchName: `Branch ${index + 1}`,
        address,
      };
    });


    // Return all branches
    return {branches};
  }
}
