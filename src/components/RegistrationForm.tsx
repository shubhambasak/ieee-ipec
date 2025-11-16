import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

const RegistrationForm = ({ isOpen, onClose, eventTitle }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    message: "",
  });

  // EmailJS configuration - Replace with your actual values
  // Get these from https://www.emailjs.com/
  // 1. Create an account and add an email service (Gmail, Outlook, etc.)
  // 2. Create an email template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{student_id}}, {{event_title}}, {{message}}
  // 3. Get your Public Key from Account > API Keys
  const SERVICE_ID = "YOUR_SERVICE_ID"; // From Email Services
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // From Email Templates
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // From Account > API Keys

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init(PUBLIC_KEY);

      const templateParams = {
        to_name: "IEEE @ IPEC",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        student_id: formData.studentId,
        event_title: eventTitle,
        message: formData.message || "No additional message provided",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      toast({
        title: "Registration Successful!",
        description: "We've received your registration. You'll receive a confirmation email shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentId: "",
        message: "",
      });

      onClose();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-highlight max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Register for {eventTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to register for this event. We'll send you a confirmation email.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="glass-subtle border-border/50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="glass-subtle border-border/50"
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="glass-subtle border-border/50"
                placeholder="+91 1234567890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                name="studentId"
                type="text"
                required
                value={formData.studentId}
                onChange={handleChange}
                className="glass-subtle border-border/50"
                placeholder="IPEC-2024-XXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="glass-subtle border-border/50 min-h-[100px]"
              placeholder="Any questions or special requirements..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 glass-subtle"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;

