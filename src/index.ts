import axios from "axios";
import { type, mergeRight } from "ramda";

export function add(a: number, b: number): number {
  return a + b;
}

type ResponseA = {
  status: string,
  data: subA
  message: string,
}

type subA = {
  id: number,
  employee_name: string,
  employee_salary: number,
  employee_age: number,
  profile_image: string
}

function rejectWithParafinError(reject: unknown, res: any) {
  // Parafin error
  if (type(res.data) === "Object") {
    res.data.status_code = res.status;
    console.log(res.data)
    //return reject(new PlaidError(res.data));
  }

  // Unknown body type returned, return a standard API_ERROR
  // return reject(new PlaidError({
  //   error_type: 'API_ERROR',
  //   status_code: res.status,
  //   error_code: 'INTERNAL_SERVER_ERROR',
  //   error_message: String(res.data),
  //   display_message: null,
  //   request_id: null,
  // }));
}

function handleApiResponse(resolve: any, reject: unknown, res: any, isMfa: unknown) {
  const body = res.data;

  if (res != null && type(body) === "Object") {
    body.status_code = res.status;
  }

  // success response (MFA)
  if (isMfa && res.status === 200) {
    console.log(body)
    //return resolve([null, $body]);

  // mfa response (MFA)
  } else if (isMfa && res.status === 210) {
    console.log(body)
    // return resolve([$body, null]);

  // success response (non mfa)
  } else if (res.status === 200) {
    // extract request id from header for binary data,
    // i.e. mime type application/*
    // if (res.headers["plaid-request-id"] != null &&
    //     res.headers["content-type"] != null &&
    //     res.headers["content-type"].indexOf("application") === 0) {
    //   return resolve({
    //     request_id: res.headers["plaid-request-id"],
    //     buffer: body
    //   });
    // }
    // return resolve(body);

  // } else {
  //   return rejectWithPlaidError(reject, res);
  // }
  }
}


export function httpCall<T>(clientRequestOptions?: unknown): void {

  const uri = "http://dummy.restapiexample.com/api/v1/employee/1"
  const method = "GET"
  const headers = {
    "User-Agent": "Parafin Node v0.0.1"
  }
  const DEFAULT_TIMEOUT_IN_MILLIS = 10 * 60 * 1000;


  const requestOptions = mergeRight({
    url: uri,
    method: method,
    headers: headers,
    timeout: DEFAULT_TIMEOUT_IN_MILLIS
  })

  axios
    .get<ResponseA>(uri)
    .then((res) => {
      handleApiResponse(null, null, res, true);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        // return rejectWithPlaidError(reject, error.response);
      } else {
        console.log("ERROR!!!")
        // return reject(error);
      }
    })

  // axios
  // .get<ResponseA>("http://dummy.restapiexample.com/api/v1/employee/1")
  // .then((response: { data: any; }) => {
  //   console.log(response.data);
  // });
}

export function httpCall2<T>(clientRequestOptions?: unknown): void {

  const uri = "https://360-payments.secure.force.com:443/services/apexrest/Parafin?date=07/15/2021"
  const method = "GET"
  const headers = {
    "User-Agent": "Parafin Node v0.0.1"
  }
  const DEFAULT_TIMEOUT_IN_MILLIS = 10 * 60 * 1000;


  const requestOptions = mergeRight({
    url: uri,
    method: method,
    headers: headers,
    timeout: DEFAULT_TIMEOUT_IN_MILLIS
  })

  const options = {
    headers: {"api_token": "f8700ef0914d4939bdfd544b62fbc02c"}
  }

  axios
    .get<T>(uri, options)
    .then((res) => {
      handleApiResponse(null, null, res, true);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        // return rejectWithPlaidError(reject, error.response);
      } else {
        console.log("ERROR!!!")
        // return reject(error);
      }
    })

  // axios
  // .get<ResponseA>("http://dummy.restapiexample.com/api/v1/employee/1")
  // .then((response: { data: any; }) => {
  //   console.log(response.data);
  // });
}

console.log("Result: " + add(3, 4));

httpCall<ResponseA>(null)
httpCall2<any>(null)
