'use client';

import { useState, useMemo } from 'react';
import type { Doctor } from '@/lib/types';
import DoctorCard from './DoctorCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoctors } from '@/hooks/use-appointments';
import { Loader2, LocateFixed } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

type UserLocation = {
  latitude: number;
  longitude: number;
};

// Haversine formula to calculate distance between two points on Earth
const getDistance = (loc1: UserLocation, loc2: { latitude: number, longitude: number }): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (loc2.latitude - loc1.latitude) * Math.PI / 180;
  const dLon = (loc2.longitude - loc1.longitude) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.latitude * Math.PI / 180) * Math.cos(loc2.latitude * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function DoctorList({ allSpecializations }: { allSpecializations: string[] }) {
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const { doctors: allDoctors, isLoading } = useDoctors();
  const { toast } = useToast();

  const handleLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocating(false);
        toast({ title: "Location found!", description: "Displaying doctors near you."});
      },
      (error) => {
        setLocationError(error.message);
        setIsLocating(false);
        toast({ title: "Location Error", description: "Could not access your location. Please enable location services.", variant: 'destructive'});
      }
    );
  };
  
  const filteredDoctors = useMemo(() => {
    const doctorsWithDistance = allDoctors.map(doctor => ({
      ...doctor,
      distance: userLocation ? getDistance(userLocation, doctor) : undefined,
    }));
    
    return doctorsWithDistance.filter(doctor => 
      selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization
    );
  }, [allDoctors, selectedSpecialization, userLocation]);

  const nearbyDoctors = useMemo(() => {
    if (!userLocation) return null;

    const near = filteredDoctors.filter(d => d.distance! >= 0 && d.distance! <= 10).sort((a,b) => a.distance! - b.distance!);
    const mid = filteredDoctors.filter(d => d.distance! > 10 && d.distance! <= 30).sort((a,b) => a.distance! - b.distance!);
    const far = filteredDoctors.filter(d => d.distance! > 30 && d.distance! <= 50).sort((a,b) => a.distance! - b.distance!);
    const extended = filteredDoctors.filter(d => d.distance! > 50 && d.distance! <= 100).sort((a,b) => a.distance! - b.distance!);

    return { near, mid, far, extended };
  }, [filteredDoctors, userLocation]);


  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  const renderDoctorList = (doctors: (Doctor & { distance?: number })[]) => (
     doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} distance={doctor.distance} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No doctors found for the selected criteria in this range.</p>
        </div>
      )
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button onClick={handleLocation} disabled={isLocating}>
          {isLocating ? <Loader2 className="animate-spin" /> : <LocateFixed />}
          Find Doctors Near Me
        </Button>
        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder="Filter by specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Specializations</SelectItem>
            {allSpecializations.map(spec => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {nearbyDoctors ? (
        <Accordion type="multiple" defaultValue={['near', 'mid']} className="w-full space-y-4">
           <AccordionItem value="near" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <h3 className="text-lg font-semibold">Within 10 km ({nearbyDoctors.near.length})</h3>
            </AccordionTrigger>
            <AccordionContent>
              {renderDoctorList(nearbyDoctors.near)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="mid" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
               <h3 className="text-lg font-semibold">11 km - 30 km ({nearbyDoctors.mid.length})</h3>
            </AccordionTrigger>
            <AccordionContent>
              {renderDoctorList(nearbyDoctors.mid)}
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="far" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
               <h3 className="text-lg font-semibold">31 km - 50 km ({nearbyDoctors.far.length})</h3>
            </AccordionTrigger>
            <AccordionContent>
              {renderDoctorList(nearbyDoctors.far)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="extended" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
               <h3 className="text-lg font-semibold">51 km - 100 km ({nearbyDoctors.extended.length})</h3>
            </AccordionTrigger>
            <AccordionContent>
              {renderDoctorList(nearbyDoctors.extended)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        renderDoctorList(filteredDoctors)
      )}
    </div>
  );
}
