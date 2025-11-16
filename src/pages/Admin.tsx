import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Download, Upload } from "lucide-react";
import { events } from "@/lib/events";

const Admin = () => {
  const { toast } = useToast();
  const [jsonData, setJsonData] = useState(JSON.stringify(events, null, 2));
  const [isValid, setIsValid] = useState(true);

  const handleJsonChange = (value: string) => {
    setJsonData(value);
    try {
      JSON.parse(value);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  };

  const handleSave = () => {
    if (!isValid) {
      toast({
        title: "Invalid JSON",
        description: "Please fix JSON syntax errors before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonData);
      // In production, this would save to a backend/API
      localStorage.setItem("ieee-events-backup", jsonData);
      toast({
        title: "Saved!",
        description: "Events data has been saved (localStorage).",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save events data.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ieee-events.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleJsonChange(content);
      toast({
        title: "File Loaded",
        description: "JSON file has been loaded.",
      });
    };
    reader.readAsText(file);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-8 layer-3 border-highlight">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Admin - Events JSON Editor</h1>
              <p className="text-muted-foreground">
                Edit events data in JSON format. Changes are saved to localStorage.
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <Button onClick={handleSave} className="glass-subtle" disabled={!isValid}>
                <Save size={16} className="mr-2" />
                Save
              </Button>
              <Button onClick={handleDownload} variant="outline" className="glass-subtle">
                <Download size={16} className="mr-2" />
                Download
              </Button>
              <label className="inline-flex">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUpload}
                  className="hidden"
                />
                <Button variant="outline" className="glass-subtle" asChild>
                  <span>
                    <Upload size={16} className="mr-2" />
                    Upload
                  </span>
                </Button>
              </label>
            </div>

            {!isValid && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                Invalid JSON syntax. Please check your formatting.
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="json-editor">Events JSON</Label>
              <Textarea
                id="json-editor"
                value={jsonData}
                onChange={(e) => handleJsonChange(e.target.value)}
                className={`font-mono text-sm min-h-[500px] glass-subtle border-border/50 ${
                  !isValid ? "border-destructive" : ""
                }`}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

