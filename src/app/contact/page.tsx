"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!executeRecaptcha) {
    setError("Captcha not ready");
    return;
  }
    setError(null);
    const captchaToken = await executeRecaptcha("contact_form");

    if (formData.message.trim().length < 10) {
      setError("Message must be at least 10 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
          ...formData,
          captchaToken, 
        }),
        }
      );

      // const data = await response.json();

      if (!response.ok) {
        setError("Something went wrong.");
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Banner */}
        <div className="bg-[#0266AB] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              How Can We Help You?
            </h1>
            <p className="text-xl text-center text-blue-100 max-w-2xl mx-auto">
              Our team is here to support you on your learning journey
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Contact Us
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <a
                        href="mailto:support@scholora.ma"
                        className="text-blue-600"
                      >
                        support@scholora.ma
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Phone</p>
                      <a href="tel:+212500000000" className="text-green-600">
                        +212 644-663792
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Address</p>
                      <p className="text-gray-600 text-sm">
                        Casablanca, Morocco
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Response Time</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Our team is committed to responding within 24 business hours
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-sm text-blue-100 mt-1">
                    Mon - Fri: 9am - 6pm
                  </p>
                  <p className="text-sm text-blue-100">Sat: 9am - 1pm</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h2>

                {success && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4">
                    <p className="font-medium">✓ Message sent successfully!</p>
                    <p className="text-sm mt-1">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe your request in detail..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Minimum 10 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || formData.message.trim().length < 10}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* FAQ Section */}
              <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3">
                  <details className="bg-white rounded-lg p-4 cursor-pointer group">
                    <summary className="font-medium text-gray-800 flex items-center justify-between">
                      How does Scholora ensure tutor quality?
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="text-gray-600 text-sm mt-3">
                      All tutors on Scholora are carefully reviewed for their
                      qualifications, experience, and subject expertise before
                      being listed on the platform.
                    </p>
                  </details>

                  <details className="bg-white rounded-lg p-4 cursor-pointer group">
                    <summary className="font-medium text-gray-800 flex items-center justify-between">
                      Can parents track student progress?
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="text-gray-600 text-sm mt-3">
                      Yes. Parents can monitor learning progress, session
                      history, and engagement to stay informed and support their
                      child’s learning journey.
                    </p>
                  </details>

                  <details className="bg-white rounded-lg p-4 cursor-pointer group">
                    <summary className="font-medium text-gray-800 flex items-center justify-between">
                      Can students try Scholora before committing?
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="text-gray-600 text-sm mt-3">
                      Yes. Students can preview a tutor’s teaching style and
                      approach before booking, ensuring they find the right fit
                      for their learning needs.
                    </p>
                  </details>

                  <details className="bg-white rounded-lg p-4 cursor-pointer group">
                    <summary className="font-medium text-gray-800 flex items-center justify-between">
                      Can I learn multiple subjects at once?
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="text-gray-600 text-sm mt-3">
                      Yes. Students can book sessions in different subjects and
                      organize their learning schedule all in one platform.
                    </p>
                  </details>

                  <details className="bg-white rounded-lg p-4 cursor-pointer group">
                    <summary className="font-medium text-gray-800 flex items-center justify-between">
                      How does Scholora help my child succeed with technology?
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="text-gray-600 text-sm mt-3">
                      Scholora uses smart tools to personalize learning, track
                      progress, and provide guidance. This helps students study
                      efficiently and achieve better results.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
