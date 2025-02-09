export type messageType = {
  request: string;
  response: string;
  timestem?: string;
};

export type conversationType = {
  _id: string;
  title: string;
  userid?: string;
  messages?: messageType[];
};
