"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IconUpload, IconCircleCheck, IconFile } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { easeOut } from "@/lib/motion-variants";
import { submitRfq } from "./actions";

const steps = ["Contact Info", "Product Details", "Files & Timeline", "Review"];

export function RequestQuoteForm() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") ?? "";

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: prefillProduct,
    material: "",
    notes: "",
    quantity: "",
    timeline: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      files.forEach((file) => fd.append("files", file));
      await submitRfq(fd);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <Card className="mx-auto max-w-lg text-center">
          <IconCircleCheck size={48} stroke={1.5} className="mx-auto text-primary" />
          <h2 className="mt-4 text-text">Quote Request Received</h2>
          <p className="mt-2 text-text-secondary">
            Thanks, {form.name || "there"}. We&apos;ve sent a confirmation to{" "}
            {form.email || "your email"} and our team will follow up within two
            business days.
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <Reveal className="mb-10 flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors duration-300 ${
                  i <= step
                    ? "bg-primary text-white"
                    : "bg-bg-alt text-text-secondary"
                }`}
              >
                {i + 1}
              </div>
              <span className="hidden text-center text-xs text-text-secondary md:block">
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-[1px] flex-1 transition-colors duration-300 ${
                  i < step ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </Reveal>

      <Card>
        <form onSubmit={handleSubmit}>
        <AnimatePresence mode="popLayout" initial={false}>
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-4"
            >
              <h2 className="text-text">Contact Info</h2>
              <div>
                <label className="text-sm text-text-secondary" htmlFor="name">
                  Full Name *
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm text-text-secondary" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="company">
                    Company
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-4"
            >
              <h2 className="text-text">Product Details</h2>
              <div>
                <label className="text-sm text-text-secondary" htmlFor="product">
                  Product Name / Part Number
                </label>
                <input
                  id="product"
                  value={form.product}
                  onChange={(e) => update("product", e.target.value)}
                  className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm text-text-secondary" htmlFor="material">
                  Preferred Material
                </label>
                <input
                  id="material"
                  value={form.material}
                  onChange={(e) => update("material", e.target.value)}
                  placeholder="e.g. ABS, HDPE, PC"
                  className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm text-text-secondary" htmlFor="notes">
                  Notes / Requirements
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-4"
            >
              <h2 className="text-text">Files & Timeline</h2>

              <label
                htmlFor="file-upload"
                className="flex cursor-pointer flex-col items-center gap-2 rounded-card border-[0.5px] border-dashed border-border bg-bg-alt px-6 py-10 text-center transition-colors duration-200 hover:border-primary"
              >
                <IconUpload size={28} stroke={1.5} className="text-primary" />
                <span className="text-sm text-text">
                  Click to upload drawings, CAD, or images
                </span>
                <span className="text-xs text-text-secondary">
                  PDF, DWG, STEP, PNG, JPG — up to 25MB each
                </span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.dwg,.step,.stp,.png,.jpg,.jpeg"
                  onChange={(e) =>
                    setFiles(Array.from(e.target.files ?? []))
                  }
                />
              </label>

              {files.length > 0 && (
                <ul className="space-y-2">
                  {files.map((f) => (
                    <li
                      key={f.name}
                      className="flex items-center gap-2 rounded-input border-[0.5px] border-border px-3 py-2 text-sm text-text-secondary"
                    >
                      <IconFile size={16} stroke={1.75} />
                      {f.name}
                    </li>
                  ))}
                </ul>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                    placeholder="e.g. 5,000 units"
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="timeline">
                    Target Timeline
                  </label>
                  <input
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    placeholder="e.g. 6 weeks"
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-4"
            >
              <h2 className="text-text">Review Your Request</h2>
              <dl className="divide-y-[0.5px] divide-border text-sm">
                {[
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Company", form.company],
                  ["Phone", form.phone],
                  ["Product", form.product],
                  ["Material", form.material],
                  ["Quantity", form.quantity],
                  ["Timeline", form.timeline],
                  ["Files", files.map((f) => f.name).join(", ") || "None"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2">
                    <dt className="text-text-secondary">{label}</dt>
                    <dd className="text-text">{value || "—"}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>

          {submitError && (
            <p className="mt-4 text-sm text-error">{submitError}</p>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                disabled={step === 0 && (!form.name || !form.email)}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Request"}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
