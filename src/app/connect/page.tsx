"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { MaxWidthWrapper } from "@/components/common/MaxWidthWrapper";
import { SpotlightGrid } from "@/components/common/SpotlightGrid";
import { Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ConnectPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      return { success: true };
    },
    onSuccess: () => {
      reset();
      alert("Message sent successfully!");
    },
    onError: () => {
      alert("Failed to send message. Please try again.");
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-black text-white relative pt-[10rem] pb-12">
      <SpotlightGrid />

      <MaxWidthWrapper>
        <motion.div
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Contact Info */}
          <motion.div className="space-y-8 w-fit" variants={item}>
            <h1 className="text-[6rem] leading-[0.8] font-bold uppercase tracking-tighter">
              Let&apos;s <br /> Connect
            </h1>
            <p className="text-xl text-white/60 max-w-md">
              Have a project in mind or just want to say hi? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-4 pt-8">
              <div>
                <h3 className="text-lg font-semibold text-white/80">Email</h3>
                <p className="text-white/60">hello@rohanthapa.com.np</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white/80">Socials</h3>
                <div className="flex gap-4 text-white/60">
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div className="backdrop-blur-sm p-8 rounded-2xl" variants={item}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                <input
                  {...register("name")}
                  id="name"
                  className="w-full border-b border-white/10 px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors bg-transparent"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full border-b border-white/10 px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors bg-transparent"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-white/80">Subject</label>
                <input
                  {...register("subject")}
                  id="subject"
                  className="w-full border-b border-white/10 px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors bg-transparent"
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  className="w-full border-b border-white/10 px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors resize-none bg-transparent"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}