"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { MaxWidthWrapper } from "@/components/common/MaxWidthWrapper";
import { SpotlightGrid } from "@/components/common/SpotlightGrid";
import { Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import SnowfallWrapper from "@/components/ui/SnowfallWrapper";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/website-contact`, data);
      return response.data;
    },
    onSuccess: () => {
      reset();
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: "Please try again later or contact me directly via email.",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-black text-white relative pt-[10rem] pb-12" data-scroll-section>
      <SnowfallWrapper color="#64748b" snowflakeCount={50} />
      <div className="hidden md:block">
        <SpotlightGrid />
      </div>

      <MaxWidthWrapper>
        <motion.div
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Contact Info */}
          <motion.div className="space-y-8 w-fit" variants={item}>
            <h1 className="text-7xl md:text-[6rem] leading-[0.8] font-bold uppercase tracking-tighter">
              Let&apos;s <br /> Connect
            </h1>
            <p className="text-xl text-white/60 max-w-md">
              Have a project in mind or just want to say hi? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-4 pt-8">
              <div>
                <h3 className="text-lg font-semibold text-white/80">Email</h3>
                <Link href="mailto:hello@rohanthapa.com.np" className="text-white/60 hover:text-white transition-colors">hello@rohanthapa.com.np</Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white/80">Socials</h3>
                <div className="flex gap-4 text-white/60">
                  <a href="https://linkedin.com/in/rohanthapa" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://facebook.com/rohanthapa69" className="hover:text-white transition-colors">Facebook</a>
                  <a href="https://github.com/rohanthapa123" className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div className="backdrop-blur-sm md:p-8 rounded-2xl" variants={item}>
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