import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { requireAuth, logout } from "@/lib/auth";
import { events, Event, formatEventDate } from "@/lib/events";
import { Save, LogOut, Plus, Trash2, Download, Upload, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  // Events state
  const [eventsData, setEventsData] = useState<Event[]>(events);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: "",
    description: "",
    imageUrl: "",
    category: "workshop",
    status: "upcoming",
    location: "",
    tags: [],
    galleryImages: [],
  });

  // Team state
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "Kunal Sharma",
      designation: "Chairperson",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      linkedinUrl: "https://linkedin.com/in/kunal-sharma",
      email: "chairperson@ieeeipec.org",
      bio: "Leading IEEE @ IPEC with passion for technology and innovation.",
    },
  ]);

  // Announcement state
  const [announcement, setAnnouncement] = useState({
    message: "🎉 IEEE Tech Fest 2025 registration is now open! Join us for an amazing experience.",
    type: "info",
    actionText: "Register Now",
    isActive: true,
  });

  useEffect(() => {
    if (!requireAuth()) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);

    // Load saved data from localStorage
    const savedEvents = localStorage.getItem("ieee-events");
    if (savedEvents) {
      try {
        setEventsData(JSON.parse(savedEvents));
      } catch (e) {
        console.error("Failed to load events:", e);
      }
    }

    const savedTeam = localStorage.getItem("ieee-team");
    if (savedTeam) {
      try {
        setTeamMembers(JSON.parse(savedTeam));
      } catch (e) {
        console.error("Failed to load team:", e);
      }
    }

    const savedAnnouncement = localStorage.getItem("ieee-announcement");
    if (savedAnnouncement) {
      try {
        setAnnouncement(JSON.parse(savedAnnouncement));
      } catch (e) {
        console.error("Failed to load announcement:", e);
      }
    }
  }, []);

  const handleSaveEvents = () => {
    localStorage.setItem("ieee-events", JSON.stringify(eventsData));
    toast({
      title: "Events Saved",
      description: "All events have been saved successfully.",
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      date: newEvent.date!,
      description: newEvent.description!,
      imageUrl: newEvent.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: newEvent.category || "workshop",
      status: newEvent.status || "upcoming",
      location: newEvent.location,
      tags: newEvent.tags || [],
      galleryImages: newEvent.galleryImages || [],
    };

    setEventsData([...eventsData, event]);
    setNewEvent({
      title: "",
      date: "",
      description: "",
      imageUrl: "",
      category: "workshop",
      status: "upcoming",
      location: "",
      tags: [],
      galleryImages: [],
    });

    toast({
      title: "Event Added",
      description: "New event has been added successfully.",
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEventsData(eventsData.filter((e) => e.id !== id));
    toast({
      title: "Event Deleted",
      description: "Event has been removed.",
    });
  };

  const handleExportJSON = () => {
    const data = {
      events: eventsData,
      team: teamMembers,
      announcement,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ieee-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: "All data has been exported to JSON file.",
    });
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.events) setEventsData(data.events);
        if (data.team) setTeamMembers(data.team);
        if (data.announcement) setAnnouncement(data.announcement);

        toast({
          title: "Data Imported",
          description: "Data has been imported successfully.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid JSON file. Please check the format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleSaveAnnouncement = () => {
    localStorage.setItem("ieee-announcement", JSON.stringify(announcement));
    toast({
      title: "Announcement Saved",
      description: "Announcement has been updated.",
    });
  };

  const handleSaveTeam = () => {
    localStorage.setItem("ieee-team", JSON.stringify(teamMembers));
    toast({
      title: "Team Saved",
      description: "Team members have been updated.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage events, team, and announcements</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="glass-subtle">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={handleExportJSON} variant="outline" className="glass-subtle">
            <Download size={16} className="mr-2" />
            Export JSON
          </Button>
          <label className="inline-flex">
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
            <Button variant="outline" className="glass-subtle" asChild>
              <span>
                <Upload size={16} className="mr-2" />
                Import JSON
              </span>
            </Button>
          </label>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-subtle">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="announcement">Announcement</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="glass-strong border-highlight">
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new event for the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Event title"
                      className="glass-subtle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="glass-subtle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event description"
                    rows={4}
                    className="glass-subtle"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newEvent.category}
                      onValueChange={(value) => setNewEvent({ ...newEvent, category: value as Event["category"] })}
                    >
                      <SelectTrigger className="glass-subtle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="talk">Talk</SelectItem>
                        <SelectItem value="competition">Competition</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="exhibition">Exhibition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={newEvent.status}
                      onValueChange={(value) => setNewEvent({ ...newEvent, status: value as Event["status"] })}
                    >
                      <SelectTrigger className="glass-subtle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="past">Past</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={newEvent.imageUrl}
                      onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="glass-subtle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images (comma-separated URLs)</Label>
                  <Input
                    value={newEvent.galleryImages?.join(", ") || ""}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        galleryImages: e.target.value.split(",").map((url) => url.trim()).filter(Boolean),
                      })
                    }
                    placeholder="https://..., https://..."
                    className="glass-subtle"
                  />
                </div>

                <Button onClick={handleAddEvent} className="w-full bg-primary">
                  <Plus size={16} className="mr-2" />
                  Add Event
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-strong border-highlight">
              <CardHeader>
                <CardTitle>Existing Events ({eventsData.length})</CardTitle>
                <CardDescription>Manage all events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {eventsData.map((event) => (
                    <div
                      key={event.id}
                      className="glass-subtle rounded-lg p-4 border border-border/50 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{formatEventDate(event.date)}</p>
                        <p className="text-sm text-muted-foreground mt-1">{event.category} • {event.status}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button onClick={handleSaveEvents} className="mt-4 w-full glass-subtle">
                  <Save size={16} className="mr-2" />
                  Save All Events
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="glass-strong border-highlight">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage team member information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="glass-subtle rounded-lg p-4 border border-border/50 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].name = e.target.value;
                            setTeamMembers(updated);
                          }}
                          className="glass-subtle"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Designation</Label>
                        <Input
                          value={member.designation}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].designation = e.target.value;
                            setTeamMembers(updated);
                          }}
                          className="glass-subtle"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Photo URL</Label>
                      <Input
                        value={member.photoUrl}
                        onChange={(e) => {
                          const updated = [...teamMembers];
                          updated[index].photoUrl = e.target.value;
                          setTeamMembers(updated);
                        }}
                        className="glass-subtle"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          value={member.email}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].email = e.target.value;
                            setTeamMembers(updated);
                          }}
                          className="glass-subtle"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn URL</Label>
                        <Input
                          value={member.linkedinUrl}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].linkedinUrl = e.target.value;
                            setTeamMembers(updated);
                          }}
                          className="glass-subtle"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={member.bio}
                        onChange={(e) => {
                          const updated = [...teamMembers];
                          updated[index].bio = e.target.value;
                          setTeamMembers(updated);
                        }}
                        rows={2}
                        className="glass-subtle"
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={() => {
                  setTeamMembers([...teamMembers, {
                    name: "",
                    designation: "",
                    photoUrl: "",
                    linkedinUrl: "",
                    email: "",
                    bio: "",
                  }]);
                }} variant="outline" className="w-full glass-subtle">
                  <Plus size={16} className="mr-2" />
                  Add Team Member
                </Button>
                {teamMembers.length > 1 && (
                  <Button
                    onClick={() => {
                      if (teamMembers.length > 1) {
                        setTeamMembers(teamMembers.slice(0, -1));
                      }
                    }}
                    variant="outline"
                    className="w-full glass-subtle text-destructive"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Remove Last Member
                  </Button>
                )}
                <Button onClick={handleSaveTeam} className="w-full bg-primary">
                  <Save size={16} className="mr-2" />
                  Save Team
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcement Tab */}
          <TabsContent value="announcement" className="space-y-6">
            <Card className="glass-strong border-highlight">
              <CardHeader>
                <CardTitle>Announcement Banner</CardTitle>
                <CardDescription>Manage the announcement banner displayed on the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={announcement.message}
                    onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                    placeholder="Announcement message"
                    rows={3}
                    className="glass-subtle"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={announcement.type}
                    onValueChange={(value) => setAnnouncement({ ...announcement, type: value as "info" | "warning" | "success" })}
                  >
                    <SelectTrigger className="glass-subtle">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Action Button Text</Label>
                  <Input
                    value={announcement.actionText}
                    onChange={(e) => setAnnouncement({ ...announcement, actionText: e.target.value })}
                    placeholder="Register Now"
                    className="glass-subtle"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={announcement.isActive}
                    onCheckedChange={(checked) => setAnnouncement({ ...announcement, isActive: checked })}
                  />
                  <Label>Show Announcement</Label>
                </div>
                <Button onClick={handleSaveAnnouncement} className="w-full bg-primary">
                  <Save size={16} className="mr-2" />
                  Save Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="glass-strong border-highlight">
              <CardHeader>
                <CardTitle>Event Gallery Management</CardTitle>
                <CardDescription>Upload and manage gallery images for events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Event</Label>
                  <Select
                    value={editingEvent?.id || ""}
                    onValueChange={(value) => {
                      const event = eventsData.find((e) => e.id === value);
                      setEditingEvent(event || null);
                    }}
                  >
                    <SelectTrigger className="glass-subtle">
                      <SelectValue placeholder="Choose an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventsData.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {editingEvent && (
                  <>
                    <div className="space-y-2">
                      <Label>Gallery Image URLs (one per line)</Label>
                      <Textarea
                        value={editingEvent.galleryImages?.join("\n") || ""}
                        onChange={(e) => {
                          const galleryImages = e.target.value
                            .split("\n")
                            .map((url) => url.trim())
                            .filter(Boolean);
                          setEditingEvent({ ...editingEvent, galleryImages });
                        }}
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                        rows={6}
                        className="glass-subtle font-mono text-sm"
                      />
                    </div>
                    <div className="p-4 glass-subtle rounded-lg border border-border/50">
                      <p className="text-sm text-muted-foreground mb-2">
                        <ImageIcon size={16} className="inline mr-2" />
                        Image Upload Instructions:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Upload images to a hosting service (Imgur, Cloudinary, etc.)</li>
                        <li>Copy the direct image URLs</li>
                        <li>Paste one URL per line in the textarea above</li>
                        <li>Click "Update Gallery" to save</li>
                      </ul>
                    </div>
                    <Button
                      onClick={() => {
                        if (editingEvent) {
                          const updated = eventsData.map((e) =>
                            e.id === editingEvent.id ? editingEvent : e
                          );
                          setEventsData(updated);
                          localStorage.setItem("ieee-events", JSON.stringify(updated));
                          setEditingEvent(null);
                          toast({
                            title: "Gallery Updated",
                            description: "Gallery images have been updated for this event.",
                          });
                        }
                      }}
                      className="w-full glass-subtle"
                    >
                      <ImageIcon size={16} className="mr-2" />
                      Update Gallery
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

