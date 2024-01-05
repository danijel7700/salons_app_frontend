export interface Service {
  _id: string;
  name: string;
  cost: number;
  time: string;
}

export interface Post {
  _id: string;
  image: string;
  time: string;
}

export interface HairStylists {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface Salon {
  location: {
    street: string;
    number: number;
  };
  workTime: string[];
  markInfo: {
    mark: number;
    numberOfMarks: number;
  };
  _id: string;
  name: string;
  city: string;
  email: string;
  type: string;
  services: Service[];
  posts: Post[];
  hairStylists: HairStylists[];
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  phoneNumber: {
    refferenceNumber: string;
    number: string;
  };
  followedSalons: string[];
}

export interface Appointment {
  time: string;
  date: string;
  salonName: string;
  serviceName: string;
}

export interface Notification {
  content: string;
  time: string;
  salonName: string;
}
