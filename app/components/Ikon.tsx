import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Menu,
  Search,
  Ticket,
  X,
} from "lucide-react";

const icons = {
  "arrow-right": ArrowRight,
  calendar: CalendarDays,
  heart: Heart,
  "map-pin": MapPin,
  menu: Menu,
  search: Search,
  ticket: Ticket,
  x: X,
};

type NamaIkon = keyof typeof icons;

export default function Ikon({
  nama,
  className,
}: {
  nama: NamaIkon;
  className?: string;
}) {
  const Icon = icons[nama];

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.8}
      className={className}
    />
  );
}
