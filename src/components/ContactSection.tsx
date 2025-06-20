"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for email validation
const contactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [thankYouMessage, setThankYouMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setThankYouMessage(
          `Thank you! I've received your email (${data.email}) and will get back to you soon. 🚀`
        );
        reset();

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setThankYouMessage("");
        }, 5000);
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setThankYouMessage(
        "Oops! Something went wrong. Please try again or reach out via WhatsApp."
      );

      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setThankYouMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-8">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-2 text-black dark:text-white">
          Want to hire me as a freelancer? Let's discuss.
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-base">
          Drop your message and let's discuss about your project.
        </p>

        <div className="flex flex-col space-y-6">
          <div className="flex justify-start">
            <Link
              href="https://wa.me/7286885570?text=I want to work on a project with you"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200">
                Chat on WhatsApp
              </Button>
            </Link>
          </div>

          {/* Horizontal separator line */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 my-6"></div>

          <div className="max-w-md">
            <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-base">
              Drop in your email ID and I will get back to you.
            </p>

            {/* Success/Error Message */}
            {submitStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-3 rounded-lg text-sm ${
                  submitStatus === "success"
                    ? "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                    : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
                }`}
              >
                {thankYouMessage}
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="saivamshig404@gmail.com"
                    className={`rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700 ${
                      errors.email ? "border-red-500 dark:border-red-500" : ""
                    }`}
                    {...register("email")}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="rounded-lg min-w-[80px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Spotify Status */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center px-4 gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Not Playing</span>
          <span className="font-medium">Spotify</span>
        </div>
      </div>
    </section>
  );
}
