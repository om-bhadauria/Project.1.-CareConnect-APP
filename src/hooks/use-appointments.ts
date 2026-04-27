'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Appointment, type Doctor } from '@/lib/types';
import { doctors as initialDoctors } from '@/lib/doctors';


const APPOINTMENTS_STORAGE_KEY = 'careconnectAppointments';
const DOCTORS_STORAGE_KEY = 'careconnectDoctors';

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const storedDoctors = localStorage.getItem(DOCTORS_STORAGE_KEY);
      if (storedDoctors) {
        const parsedDoctors = JSON.parse(storedDoctors) as Doctor[];
        const mergedDoctors = Array.from(
          new Map([...initialDoctors, ...parsedDoctors].map((doctor) => [doctor.id, doctor])).values()
        );
        setDoctors(mergedDoctors);
        localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(mergedDoctors));
      } else {
        localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(initialDoctors));
      }
    } catch (error) {
      console.error('Failed to parse doctors from localStorage', error);
      setDoctors(initialDoctors);
    }
  }, []);

  const saveDoctors = useCallback((updatedDoctors: Doctor[]) => {
    try {
      setDoctors(updatedDoctors);
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(updatedDoctors));
    } catch (error) {
      console.error('Failed to save doctors to localStorage', error);
    }
  }, []);
  
  const addDoctor = useCallback((newDoctorData: Omit<Doctor, 'id'>) => {
    const newDoctor: Doctor = {
      ...newDoctorData,
      id: new Date().getTime().toString(), 
    };
    const updatedDoctors = [...doctors, newDoctor];
    saveDoctors(updatedDoctors);
    return newDoctor;

  }, [doctors, saveDoctors]);

  return { doctors, addDoctor, isLoading };
}


export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAppointments = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error('Failed to parse appointments from localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveAppointments = useCallback((updatedAppointments: Appointment[]) => {
    try {
      setAppointments(updatedAppointments);
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));
    } catch (error) {
      console.error('Failed to save appointments to localStorage', error);
    }
  }, []);

  const addAppointment = useCallback(
    (newAppointment: Omit<Appointment, 'id'>) => {
      const appointmentWithId: Appointment = {
        ...newAppointment,
        id: new Date().toISOString(),
      };
      saveAppointments([...appointments, appointmentWithId]);
      return appointmentWithId;
    },
    [appointments, saveAppointments]
  );

  const removeAppointment = useCallback(
    (appointmentId: string) => {
      const updatedAppointments = appointments.filter((appt) => appt.id !== appointmentId);
      saveAppointments(updatedAppointments);
    },
    [appointments, saveAppointments]
  );

  return { appointments, addAppointment, removeAppointment, isLoading };
}
