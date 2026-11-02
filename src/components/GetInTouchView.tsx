import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { CopyrightNotice } from './CopyrightNotice';
import { Logo } from './Logo';

export const GetInTouchView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Screen Time Habit Inquiry',
    message: ''
  });
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp'>('email');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const buildMessageBody = () => {
    return `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Inquiry: ${formData.subject}

Message:
${formData.message}

--
Sent from Beyond the Screen Web App`;
  };

  const getEmailSubject = () => {
    return `[Beyond the Screen] ${formData.subject} - from ${formData.name}`;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const openGmailWeb = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(buildMessageBody());
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=rkp060404@gmail.com&su=${subject}&body=${body}`, '_blank');
  };

  const openMailto = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(buildMessageBody());
    window.location.href = `mailto:rkp060404@gmail.com?subject=${subject}&body=${body}`;
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`*Beyond the Screen Inquiry*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'N/A'}
*Topic:* ${formData.subject}

*Message:*
${formData.message}`);
    window.open(`https://wa.me/919702511408?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (sendMethod === 'whatsapp') {
      openWhatsApp();
    } else {
      // First try opening default mailto or open Gmail directly
      openMailto();
    }

    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-[#084442] border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>We'd Love to Hear From You</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#084442] tracking-tight">
            Get in Touch
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Interested in exploring <strong>Beyond the Screen</strong>?<br className="hidden sm:inline" /> Get in touch with us today to learn more about reducing screen time!
          </p>
        </div>
      </div>

      {/* Main Grid: Direct Contact Details & Interactive Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contact Information Cards (1 Column) */}
        <div className="space-y-4 lg:col-span-1">
          
          {/* Location Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#084442] border border-emerald-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Location
                </span>
                <h4 className="font-bold text-base text-stone-900 mt-0.5">
                  Mumbai , Goregaon
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Maharashtra, India
                </p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#084442] border border-emerald-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Phone & WhatsApp
                  </span>
                  <h4 className="font-num font-bold text-base text-stone-900 mt-0.5">
                    9702511408
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Mon - Sat (9:00 AM - 7:00 PM IST)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy('9702511408', 'phone')}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100">
              <a
                href="tel:9702511408"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919702511408"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100 text-[#084442] text-xs font-semibold transition-all"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#084442] border border-emerald-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Email Address
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 mt-0.5 break-all">
                    rkp060404@gmail.com
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    We usually respond within 24 hours
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('rkp060404@gmail.com', 'email')}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                title="Copy Email Address"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <a
                href="mailto:rkp060404@gmail.com"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#084442] hover:bg-[#063332] text-white text-xs font-semibold transition-all shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-300" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>

          {/* Quick Mission Badge */}
          <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-100 text-xs text-stone-600 space-y-2">
            <div className="font-bold text-[#084442] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Beyond the Screen Movement</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-600">
              Dedicated to helping individuals, schools, and families reclaim life from algorithmic feeds and rediscover hands-on offline passions.
            </p>
          </div>

        </div>

        {/* Message / Inquiry Form (2 Columns) */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-stone-900">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Fill out the form below and we will get back to you promptly.
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-600">
                <MessageSquare className="w-5 h-5 text-emerald-800" />
              </div>
            </div>

            {submitted ? (
              <div className="my-6 p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-base">
                      Message Draft Dispatched!
                    </h4>
                    <p className="text-xs text-stone-600">
                      Your message to <strong className="text-stone-900">rkp060404@gmail.com</strong> has been generated.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs space-y-1.5 font-mono text-stone-700">
                  <div className="flex justify-between border-b border-stone-100 pb-1 font-sans font-semibold text-stone-500 text-[11px]">
                    <span>Message Preview:</span>
                    <button
                      onClick={() => handleCopy(buildMessageBody(), 'msg-body')}
                      className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
                    >
                      {copiedField === 'msg-body' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'msg-body' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] whitespace-pre-wrap leading-relaxed text-stone-800 font-sans">
                    <strong>To:</strong> rkp060404@gmail.com<br />
                    <strong>From:</strong> {formData.name} ({formData.email})<br />
                    <strong>Subject:</strong> {formData.subject}<br />
                    <strong>Message:</strong> {formData.message}
                  </div>
                </div>

                <div className="text-xs font-semibold text-stone-700 pt-1">
                  Click your preferred app to deliver the message immediately:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={openGmailWeb}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Gmail Web</span>
                  </button>

                  <button
                    type="button"
                    onClick={openMailto}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#084442] hover:bg-[#063332] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Default Mail App</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Screen Time Habit Inquiry', message: '' });
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors"
                  >
                    Write another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#084442]/20 focus:border-[#084442] bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#084442]/20 focus:border-[#084442] bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9702511408"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#084442]/20 focus:border-[#084442] bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#084442]/20 focus:border-[#084442] bg-stone-50/50"
                    >
                      <option value="Screen Time Habit Inquiry">Screen Time Habit Inquiry</option>
                      <option value="Offline Activity Suggestions">Offline Activity Suggestions</option>
                      <option value="Feature Feedback">App Feature Feedback</option>
                      <option value="Corporate / School Wellness">Corporate / School Wellness</option>
                      <option value="General Conversation">General Conversation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your screen-free journey, questions, or how we can help..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#084442]/20 focus:border-[#084442] bg-stone-50/50"
                  />
                </div>

                {/* Delivery Channel Option */}
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-xs font-semibold text-stone-700">Delivery Method:</span>
                  <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="email"
                      checked={sendMethod === 'email'}
                      onChange={() => setSendMethod('email')}
                      className="accent-[#084442]"
                    />
                    <span>Email (rkp060404@gmail.com)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="whatsapp"
                      checked={sendMethod === 'whatsapp'}
                      onChange={() => setSendMethod('whatsapp')}
                      className="accent-[#084442]"
                    />
                    <span>WhatsApp (9702511408)</span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-stone-400">
                    Sends directly to <strong className="text-stone-600">rkp060404@gmail.com</strong>
                  </span>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#084442] hover:bg-[#063332] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Send Direct Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Copyright Notice for Tab 7 (Get In Touch) */}
      <CopyrightNotice />
    </div>
  );
};
