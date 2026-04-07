"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ConfigItem {
  id: string;
  key: string;
  value: string;
  label: string | null;
  group: string;
}

export default function SettingsPage() {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const fetchConfigs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Failed to load settings");
      const data = await res.json();
      setConfigs(data.configs);
      setEditedValues({});
    } catch (err) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  function handleChange(key: string, value: string) {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  }

  function getValue(config: ConfigItem) {
    return editedValues[config.key] ?? config.value;
  }

  const hasChanges = Object.keys(editedValues).length > 0;

  // Group configs
  const groups = configs.reduce(
    (acc, config) => {
      const group = config.group || "general";
      if (!acc[group]) acc[group] = [];
      acc[group].push(config);
      return acc;
    },
    {} as Record<string, ConfigItem[]>
  );

  const groupLabels: Record<string, string> = {
    general: "General",
    pricing: "Pricing",
    social: "Social Media",
    email: "Email",
    payment: "Payment",
  };

  async function handleSave() {
    setSaving(true);
    try {
      const updates = Object.entries(editedValues).map(([key, value]) => ({
        key,
        value,
      }));

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      toast.success("Settings saved successfully");
      setEditedValues({});
      await fetchConfigs();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage site configuration values
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchConfigs} disabled={loading}>
            <RefreshCw className="mr-2 size-4" />
            Refresh
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            {saving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {Object.keys(groups).length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No configuration values found. Add them through the database.
          </CardContent>
        </Card>
      ) : (
        Object.entries(groups)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([group, items]) => (
            <Card key={group}>
              <CardHeader>
                <CardTitle className="capitalize">
                  {groupLabels[group] || group}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((config) => (
                  <div
                    key={config.id}
                    className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center"
                  >
                    <Label
                      htmlFor={config.key}
                      className="text-sm font-medium"
                    >
                      {config.label || config.key}
                    </Label>
                    <Input
                      id={config.key}
                      value={getValue(config)}
                      onChange={(e) => handleChange(config.key, e.target.value)}
                      className={
                        editedValues[config.key] !== undefined
                          ? "border-aba-gold ring-1 ring-aba-gold/30"
                          : ""
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
      )}
    </div>
  );
}
