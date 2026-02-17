import { Star, MapPin, Phone, Mail, Clock, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Dummy data for Dr. Anil Kapoor
const doctorData = {
  name: 'Dr. Anil Kapoor',
  specialization: 'Neurosurgeon',
  experience: 12,
  hospital: 'Apollo Medical Center',
  phone: '+91 98765 43210',
  email: 'anil.kapoor@apollomed.com',
  location: 'Mumbai, Maharashtra',
  rating: 4.8,
  totalRatings: 156,
  skills: [
    'Brain Surgery',
    'Spinal Surgery',
    'Minimally Invasive Surgery',
    'Neuro-oncology',
    'Pediatric Neurosurgery',
  ],
  availability: 'Available Now',
  workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
  about:
    'Dr. Anil Kapoor is a highly experienced neurosurgeon with over 12 years of expertise in complex brain and spinal surgeries. He specializes in minimally invasive techniques and has successfully performed over 2,000 surgeries with excellent patient outcomes.',
  avatar: '/assets/generated/doctor-anil-kapoor-avatar.dim_512x512.png',
};

export default function PremiumDoctorProfileDashboard() {
  const fullStars = Math.floor(doctorData.rating);
  const hasHalfStar = doctorData.rating % 1 >= 0.5;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/doctor-hero-bg.dim_1920x600.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Glassmorphism Card */}
        <div className="max-w-7xl mx-auto bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="grid lg:grid-cols-12 gap-8 p-8 md:p-12">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <Avatar className="w-40 h-40 ring-4 ring-primary/20 shadow-xl">
                  <AvatarImage src={doctorData.avatar} alt={doctorData.name} className="object-cover" />
                  <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                    {doctorData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{doctorData.hospital}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-muted-foreground">{doctorData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-muted-foreground break-all">{doctorData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-muted-foreground">{doctorData.location}</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 transition-all duration-300 animate-star-pop ${
                        index < fullStars
                          ? 'fill-yellow-400 text-yellow-400'
                          : index === fullStars && hasHalfStar
                            ? 'fill-yellow-400/50 text-yellow-400'
                            : 'fill-gray-300 text-gray-300'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {doctorData.rating} ({doctorData.totalRatings} reviews)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  className="w-full transition-transform hover:scale-105 active:scale-95 duration-200"
                  size="lg"
                >
                  Contact Now
                </Button>
                <Button
                  variant="destructive"
                  className="w-full transition-transform hover:scale-105 active:scale-95 duration-200"
                  size="lg"
                >
                  Hire Doctor
                </Button>
              </div>
            </div>

            {/* Center Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Name & Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {doctorData.name}
                </h1>
                <p className="text-xl md:text-2xl text-primary font-semibold">
                  {doctorData.specialization}
                </p>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="text-lg font-medium text-foreground">
                  {doctorData.experience} Years of Experience
                </span>
              </div>

              {/* Availability Badge */}
              <div>
                <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm font-semibold animate-pulse-soft">
                  {doctorData.availability}
                </Badge>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Working Hours</p>
                  <p className="text-muted-foreground">{doctorData.workingHours}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Specializations & Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {doctorData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{doctorData.about}</p>
              </div>

              {/* Map Preview */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Location</h3>
                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                  <img
                    src="/assets/generated/map-preview-tile.dim_640x360.png"
                    alt="Location Map"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="bg-destructive text-destructive-foreground rounded-full p-3 shadow-xl animate-bounce-soft">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
