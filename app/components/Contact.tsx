"use client";

import React, { useState } from "react";
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function Contact() {
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [validationErrors, setValidationErrors] = useState<string | null>(null);

  const formId = process.env.NEXT_PUBLIC_FORM_ID;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setValidationErrors(null);
  };

  const validateForm = () => {
    if (!formState.name.trim()) return "Name field is required.";
    if (!formState.email.trim()) return "Email field is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) return "Please enter a valid email address.";
    if (!formState.message.trim()) return "Message field is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setValidationErrors(error);
      return;
    }

    try {
      setStatus("submitting");

      // Default mock submit if Formspree form ID is not configured yet
      if (!formId || formId === "your_formspree_form_id_here") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
        return;
      }

      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Unable to submit email form");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-zinc-100/50 dark:bg-zinc-900/10 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Contact
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Contact Details (Left Column) */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              Let's Connect
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              If you have any opportunities for internship, student programs, or want to discuss a project, feel free to contact me.
            </p>

            <div className="space-y-4 pt-2">
              {/* Location */}
              <Card className="border border-border/80 bg-background/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary text-foreground">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider">Location</span>
                    <span className="text-sm font-semibold text-foreground">Bangalore, Karnataka, India</span>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border border-border/80 bg-background/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary text-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider">Email</span>
                    <a
                      href="mailto:manjunatha.s.reva@gmail.com"
                      className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
                    >
                      manjunatha.s.reva@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Social Channels */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/s-manjunath-691024386/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-secondary">
                    <Linkedin className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    LinkedIn
                  </Button>
                </a>
                <a
                  href="https://github.com/s-manjunatha"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-secondary">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <Card className="md:col-span-7 border border-border bg-background shadow-sm">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-foreground">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full h-10 px-3.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-foreground">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full h-10 px-3.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-foreground">Subject (Optional)</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full h-10 px-3.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-foreground">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Enter your message"
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                    required
                  />
                </div>

                {/* Validation Error Alerts */}
                {validationErrors && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{validationErrors}</span>
                  </div>
                )}

                {/* Success Alert */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Your message has been sent successfully. I will get back to you soon!</span>
                  </div>
                )}

                {/* Error Alert */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Oops! Something went wrong while sending your message. Please try again.</span>
                  </div>
                )}

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 font-semibold"
                >
                  <Send className="h-3.5 w-3.5" />
                  {status === "submitting" ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
