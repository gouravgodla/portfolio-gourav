import React, { useState, useRef } from "react";
import { SendIcon, MailIcon } from "./Icons";
import { PERSONAL_INFO } from "../../constants";

type FormStatus = "idle" | "submitting" | "success" | "error";
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  // Refs for focus management
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full Name is required.";
        break;
      case "email":
        if (!value.trim()) return "Your Email Address is required.";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Please enter a valid email address.";
        break;
      case "message":
        if (!value.trim()) return "Message is required.";
        break;
      default:
        return undefined;
    }
    return undefined;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field as the user is typing in it
    if (errors[name as keyof FormErrors]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrorSummary(false); // Reset on new submission

    const newErrors: FormErrors = {};
    const formFields = ["name", "email", "message"] as const;

    formFields.forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowErrorSummary(true);
      // Focus on the first field with an error for better accessibility
      const firstErrorField = formFields.find((field) => newErrors[field]);
      switch (firstErrorField) {
        case "name":
          nameRef.current?.focus();
          break;
        case "email":
          emailRef.current?.focus();
          break;
        case "message":
          messageRef.current?.focus();
          break;
      }
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    // --- REAL FORM SUBMISSION ENABLED ---
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwprkozl";

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you for your message! I'll get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" });
        form.reset();
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setStatusMessage(
          "Something went wrong. Please try again or use the email link above."
        );
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Please try again or use the email link above."
      );
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    }
  };

  const subject = encodeURIComponent(
    `Portfolio Inquiry - ${PERSONAL_INFO.name}`
  );
  const body = encodeURIComponent(
    `Sent on ${new Date().toLocaleString()}:\n\n`
  );
  const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="py-20" aria-labelledby="contact-heading">
      <h2
        id="contact-heading"
        className="text-3xl font-bold text-center text-white mb-4"
      >
        Get In Touch
      </h2>
      <div className="text-center text-slate-400 mb-8">
        <p className="mb-2">
          Have a question or want to work together? Fill out the form below or
          send an email.
        </p>
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center gap-2 font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <MailIcon className="w-5 h-5" />
          <span className="group-hover:underline">{PERSONAL_INFO.email}</span>
        </a>
      </div>
      <div className="max-w-2xl mx-auto bg-slate-800/50 p-8 rounded-lg shadow-none">
        <form onSubmit={handleSubmit} noValidate>
          {showErrorSummary && (
            <div
              role="alert"
              className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-md"
            >
              <p className="font-bold">Please fix the errors below:</p>
              <ul className="list-disc list-inside mt-2">
                {Object.values(errors).map(
                  (error, index) => error && <li key={index}>{error}</li>
                )}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="block text-slate-300 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full bg-slate-700 border text-slate-100 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all ${
                  errors.name ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-slate-300 font-medium mb-2"
              >
                Your Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full bg-slate-700 border text-slate-100 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all ${
                  errors.email ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="message"
              className="block text-slate-300 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full bg-slate-700 border text-slate-100 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none ${
                errors.message ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p id="message-error" className="text-red-400 text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-500 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              {status !== "submitting" && <SendIcon className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-4 text-center h-6">
            {status === "success" && (
              <p role="status" className="text-green-400">
                {statusMessage}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-red-400">
                {statusMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
