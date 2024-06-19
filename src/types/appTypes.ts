type USERROFILETYPE = {
  name: string;
  organization: string;
  dob: string;
  address: string;
  location: {
    lat: number;
    long: number;
  };
};

export type USERTYPE = {
  id: string;
  email: string;
  phoneNumber: string;
  profile: USERROFILETYPE;
  education: {
    level: string;
    employment: boolean;
    employmentSector: string;
    duration: number;
    minIncome: string;
    maxIncome: string;
    loanRepayment: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
};
