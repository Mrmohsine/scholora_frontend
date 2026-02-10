import React, { useState, useEffect } from "react";

interface RenewPopupProps {
  open: boolean;
  onClose: () => void;
  userEmail?: string;
  message?: string;
}

export default function RenewPopup({
  open,
  onClose,
  userEmail = "",
  message = "",
}: RenewPopupProps) {
  const SUPPORT_EMAIL =
    process.env.NEXT_PUBLIC_CONTACT_SALES_EMAIL || "sales@scholora.com";

  // local editable state
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("Renew subscription");
  const [messageBody, setMessageBody] = useState("");
  const [sending, setSending] = useState(false);

  // notification state
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // sync parent props → local state when popup opens
  useEffect(() => {
    if (open) {
      setFrom(userEmail || "");
      setMessageBody(message || "");
      setSubject("Renew subscription");
      setNotice(null);
    }
  }, [open, userEmail, message]);

  if (!open) return null;

  const handleSend = async () => {
    if (!from || !subject || !messageBody.trim()) {
      setNotice({
        type: "error",
        message: "Please fill all fields.",
      });
      return;
    }

    try {
      setSending(true);
      setNotice(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/renew-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: from,
            subject,
            message: messageBody,
          }),
        }
      );

      if (!res.ok) throw new Error("Send failed");

      setNotice({
        type: "success",
        message: "Renew request sent successfully ✅",
      });

      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      console.error(err);

      setNotice({
        type: "error",
        message: "Failed to send email ❌",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Renew Subscription
          </h2>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Notification */}
          {notice && (
            <div
              className={`rounded-lg px-4 py-3 text-sm border ${
                notice.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {notice.message}
            </div>
          )}

          {/* From */}
          <Field label="From">
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input"
            />
          </Field>

          {/* To */}
          <Field label="To">
            <input
              value={SUPPORT_EMAIL}
              disabled
              className="input bg-gray-100"
            />
          </Field>

          {/* Subject */}
          <Field label="Subject">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input"
            />
          </Field>

          {/* Message */}
          <Field label="Message">
            <textarea
              rows={8}
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              className="input resize-none"
            />
          </Field>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-gray-900"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={sending}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Request"}
          </button>

        </div>
      </div>

      {/* shared styles */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
          color: #111;
          outline: none;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
      `}</style>
    </div>
  );
}

/* ---------- UI helper ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
