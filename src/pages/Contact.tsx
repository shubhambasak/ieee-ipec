import Layout from "@/components/Layout";
import { Mail, User } from "lucide-react";
import ContactFormEnhanced from "@/components/ContactFormEnhanced";

const Contact = () => {
  const coreMembers = [
    {
      name: "Kunal Sharma",
      designation: "Chairperson",
      email: "chairperson@ieeeipec.org",
    },
    {
      name: "Ansh Sharma",
      designation: "Co-chair",
      email: "cochair@ieeeipec.org",
    },
    {
      name: "Riddhi Jain",
      designation: "Vice Chair",
      email: "vicechair@ieeeipec.org",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect With Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to our team.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Core Team Contacts</h2>
              {coreMembers.map((member, index) => (
                <div
                  key={index}
                  className="glass-strong rounded-2xl p-6 layer-2 border-highlight card-interactive focus-ring"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary text-sm mb-2">{member.designation}</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail size={16} className="mr-2" />
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="glass-strong rounded-2xl p-6 layer-3 border-highlight">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <ContactFormEnhanced />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
