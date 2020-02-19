interface RegistrationBaseModel {
  subscriptionTypeId: string;
  token: string;
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  culture: string;
}

export class Registration implements RegistrationBaseModel {
  subscriptionTypeId: string;
  token: string;
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  culture: string;
  timeZoneId: string;
}
