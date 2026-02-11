import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Package,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@furniturestore.com",
      subdetails: "We'll respond within 24 hours",
      action: "mailto:support@furniturestore.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subdetails: "Mon-Fri, 9AM-6PM EST",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Design Street, Suite 100",
      subdetails: "New York, NY 10001",
      action: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday: 9AM - 6PM",
      subdetails: "Saturday: 10AM - 4PM",
      action: null,
    },
  ];

  const subjects = [
    "General Inquiry",
    "Product Question",
    "Order Status",
    "Shipping & Delivery",
    "Returns & Exchanges",
    "Technical Support",
    "Partnership Opportunity",
    "Other",
  ];

  const faqs = [
    {
      icon: Package,
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 day delivery.",
    },
    {
      icon: HelpCircle,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on most items. Products must be in original condition with all packaging.",
    },
    {
      icon: MessageSquare,
      question: "Do you offer assembly services?",
      answer:
        "Yes! We partner with professional assembly services. You can add assembly at checkout or contact us after purchase.",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have a question? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
              >
                <info.icon
                  className="w-8 h-8 text-gray-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.action ? (
                  <a
                    href={info.action}
                    className="text-base text-gray-900 hover:underline block mb-1"
                  >
                    {info.details}
                  </a>
                ) : (
                  <p className="text-base text-gray-900 mb-1">{info.details}</p>
                )}
                <p className="text-sm text-gray-500">{info.subdetails}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition-colors appearance-none bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500">
                  * Required fields. We respect your privacy and will never
                  share your information.
                </p>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-100 h-80 border border-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-sm">Interactive Map</p>
                  <p className="text-xs mt-1">123 Design Street, NY 10001</p>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <faq.icon
                          className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-sm text-gray-900 hover:underline">
                  View All FAQs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-600">
              Choose the communication method that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 p-6 text-center hover:border-gray-300 transition-colors">
              <MessageSquare
                className="w-10 h-10 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Live Chat
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Chat with our support team in real-time
              </p>
              <button className="text-sm text-gray-900 hover:underline">
                Start Chat
              </button>
            </div>
            <div className="bg-white border border-gray-200 p-6 text-center hover:border-gray-300 transition-colors">
              <Phone
                className="w-10 h-10 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Schedule a Call
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Book a time that works for you
              </p>
              <button className="text-sm text-gray-900 hover:underline">
                Book Now
              </button>
            </div>
            <div className="bg-white border border-gray-200 p-6 text-center hover:border-gray-300 transition-colors">
              <HelpCircle
                className="w-10 h-10 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Help Center
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Browse our knowledge base
              </p>
              <button className="text-sm text-gray-900 hover:underline">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Follow Us on Social Media
          </h3>
          <div className="flex justify-center gap-6">
            {["Facebook", "Instagram", "Twitter", "Pinterest", "LinkedIn"].map(
              (social) => (
                <button
                  key={social}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {social}
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;