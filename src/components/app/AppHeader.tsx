'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu, UserPlus, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/doctors', label: 'Doctors' },
  { href: '/symptom-checker', label: 'Symptom Checker' },
  { href: '/health-feed', label: 'Health Feed' },
  { href: '/schedule', label: 'My Schedule' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function AppHeader() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon?: React.ElementType, onClick?: () => void }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
      onClick={() => {
        setIsMobileMenuOpen(false);
        onClick?.();
      }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href={isAuthenticated ? "/doctors" : "/"} className="mr-6 flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">CareConnect</span>
        </Link>
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          <nav className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NavLink href="/add-doctor" label="Add Profile" icon={UserPlus} />
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4"/> Logout
                </Button>
              </>
            ) : (
              <>
                 <NavLink href="/signup" label="Sign Up" icon={UserPlus} />
                 <NavLink href="/" label="Login" icon={LogIn} />
              </>
            )}
          </nav>
          <div className="flex items-center justify-end md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 p-4">
                  <Link href={isAuthenticated ? "/doctors" : "/"} className="mr-6 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <HeartPulse className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">CareConnect</span>
                  </Link>
                  
                  {isAuthenticated ? (
                    <>
                      {navLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                      ))}
                      <NavLink href="/add-doctor" label="Add Profile" icon={UserPlus} />
                       <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4"/> Logout
                        </Button>
                    </>
                  ) : (
                     <>
                        <NavLink href="/signup" label="Sign Up" icon={UserPlus} />
                        <NavLink href="/" label="Login" icon={LogIn} />
                     </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
