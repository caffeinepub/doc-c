import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const specializations = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Psychiatry',
  'Radiology',
  'Anesthesiology',
  'Emergency Medicine',
  'General Surgery',
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SpecializationSelectWithHeart({ value, onChange }: Props) {
  const [showHeart, setShowHeart] = useState(false);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <div className="space-y-2 relative">
      <Label htmlFor="specialization">Specialization *</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id="specialization">
          <SelectValue placeholder="Select your specialization" />
        </SelectTrigger>
        <SelectContent>
          {specializations.map((spec) => (
            <SelectItem key={spec} value={spec}>
              {spec}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showHeart && (
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 animate-ping">
          <img src="/assets/generated/doc-c-heart-icon.dim_256x256.png" alt="Heart" className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
