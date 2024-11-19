import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Briefcase, Calendar, Edit } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Mock user data (replace with actual data fetching in a real application)


const UserDetails = (customer) => {

    console.log(customer)
  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 md:w-1/3 flex flex-col items-center justify-center text-white">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={customer.customer.imageUrl} alt={customer.customer.firstName + " " + customer.customer.lastName} />
            <AvatarFallback>
              {(customer.customer.firstName + " " + customer.customer.lastName)
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold text-center">
            {customer.customer.firstName + " " + customer.customer.lastName}
          </h2>
          <Badge variant="secondary" className="mt-2">
            {"active"}
          </Badge>
        </div>
        <CardContent className="p-6 md:w-2/3 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Mes Informations</h3>
          </div>
          <div className="space-y-4">
            <InfoItem
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={customer.customer.email}
            />
            <InfoItem
              icon={<Phone className="w-5 h-5" />}
              label="Téléphone"
              value={customer.customer.phoneNumber}
            />
    
            <InfoItem
              icon={<Calendar className="w-5 h-5" />}
              label="Membre depuis"
              value={formatDate(customer.customer.createdAt.isoString)}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start space-x-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);

export default UserDetails;
