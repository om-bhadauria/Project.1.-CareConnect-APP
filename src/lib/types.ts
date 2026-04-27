export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  subSpecialization: string;
  contact: string;
  imageUrl: string;
  imageHint: string;
  videoUrl?: string;
  latitude: number;
  longitude: number;
  city: string;
};

export type Appointment = {
  id: string;
  doctor: Doctor;
  patientName: string;
  date: string; // Stored as ISO string
  time: string;
  reminderShown?: boolean;
};


export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
};
