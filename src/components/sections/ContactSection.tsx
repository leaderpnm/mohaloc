import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "../../hooks/useTranslation";

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais."
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-semibold">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="animate-slide-in-left">
            <CardContent className="p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                {t('contact.sendMessage2')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.firstName')}
                    </label>
                    <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.lastName')}
                    </label>
                    <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email')}
                  </label>
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')}
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    className="w-full" 
                    placeholder={t('contact.messagePlaceholder')} 
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
                  {t('contact.sendMessage')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="animate-slide-in-right space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                {t('contact.ourContact')}
              </h3>
              <p className="text-gray-600 mb-8">
                {t('contact.contactDescription')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t('contact.phone')}</h4>
                  <a 
                    href="tel:+213555123456" 
                    className="text-gray-600 hover:text-primary underline transition-colors duration-200"
                  >
                    +213 555 123 456
                  </a>
                  <p className="text-sm text-gray-500">{t('contact.available24h')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Email</h4>
                  <a 
                    href="mailto:contact@mohalocation.dz" 
                    className="text-gray-600 hover:text-primary underline transition-colors duration-200"
                  >
                    contact@mohalocation.dz
                  </a>
                  <p className="text-sm text-gray-500">{t('contact.responseIn24h')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t('contact.address')}</h4>
                  <p className="text-gray-600">
                    {t('contact.addressText')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t('contact.hours')}</h4>
                  <p className="text-gray-600">
                    {t('contact.hoursText')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('contact.urgentHelp')}</h4>
              <p className="text-gray-600 mb-4">
                {t('contact.urgentHelpText')}
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                {t('contact.emergencyAssistance')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;