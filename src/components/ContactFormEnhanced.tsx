import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";

interface ContactFormEnhancedProps {
  className?: string;
}

const ContactFormEnhanced = ({ className }: ContactFormEnhancedProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // EmailJS configuration
  const SERVICE_ID = "YOUR_SERVICE_ID";
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypotRef.current?.value) {
      // Bot detected, silently fail
      return;
    }

    setIsSubmitting(true);

    try {
      // Try EmailJS first
      if (SERVICE_ID !== "YOUR_SERVICE_ID") {
        emailjs.init(PUBLIC_KEY);
        const templateParams = {
          to_name: "IEEE @ IPEC",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        };
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } else {
        // Fallback: mailto link
        const subject = encodeURIComponent(`Contact from ${formData.name}`);
        const body = encodeURIComponent(`From: ${formData.email}\n\n${formData.message}`);
        window.location.href = `mailto:contact@ieeeipec.org?subject=${subject}&body=${body}`;
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      // Fallback to mailto
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(`From: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:contact@ieeeipec.org?subject=${subject}&body=${body}`;
      
      toast({
        title: "Opening Email Client",
        description: "Please send your message through your email client.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Honeypot field - hidden from users */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="glass-subtle border-border/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="glass-subtle border-border/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Your message here..."
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="glass-subtle border-border/50"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};

export default ContactFormEnhanced;

