'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, Mail, Phone, Home, Edit2, Save } from 'lucide-react';
import type { UserProfile as UserProfileType } from '@/lib/types';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string().min(5, 'Please enter a valid address.'),
});

export default function UserProfile() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: user,
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    updateUser(values);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been successfully saved.',
    });
  };

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline">My Profile</CardTitle>
                <CardDescription>View and edit your personal information.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save className="h-5 w-5 text-primary" /> : <Edit2 className="h-5 w-5" />}
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
            </div>
             <div className="flex items-center gap-4">
              <Home className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">{user.address}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
