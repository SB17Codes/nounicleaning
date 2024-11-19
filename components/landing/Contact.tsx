'use client';

import { Mail, Phone, MapPin } from "lucide-react";
import { useActionState } from "react";



const ContactForm = () => {

  

  const sendEmailAction = async (previousState: any, formData: FormData) => {
    const emailData = {
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      message: formData.get('message')?.toString(),
    };

    console.log(emailData);
  
    if (!emailData.name || !emailData.email || !emailData.message) {
      throw new Error("All fields are required");
    }
  
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to send email");
    }
  
    return await response.json();
  };

  const [state, action, isPending] = useActionState(sendEmailAction, null);


  return (
    <section className="bg-[#37B7C0] py-12 md:py-24" id="contact">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Contactez-nous</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Form Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <form action={action} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#191C1D] mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#56CA00]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#191C1D] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#56CA00]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-[#191C1D] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#56CA00]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full bg-[#56CA00] text-white font-bold py-2 px-4 rounded hover:bg-[#37B7C0] transition duration-300 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPending}
              >
                {isPending ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="md:w-1/3 text-white">
            <div className="flex items-center mb-4">
              <Mail className="mr-2" />
              <span>nounicleaning@gmail.com</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="mr-2" />
              <span>+33 6 64 44 40 63 </span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>Guéliz, Quartier Al Hassania, Rue Dimachq, Marrakech</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
