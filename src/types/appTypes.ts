type USERROFILETYPE = {
  name: string;
  organization: string;
  dob: string;
  address: string;
  gender: string;
  maritalStatus: string;
  children: number;
  residence: string;
  tier: number;
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
  status: string;
  createdAt: string;
};

export type TABLEDATATYPE = {
  id: string;
  username: string;
  organization: string;
  email: string;
  phoneNumber: string;
  status: string;
  dateJoined: string;
};

export type TABLECOLUMNSTYPE = {
  label: string;
  value: string;
  filter: boolean;
};

export type FILTERTYPE = {
  username: string;
  organization: string;
  email: string;
  phoneNumber: string;
  status: string;
  dateJoined: string;
};
