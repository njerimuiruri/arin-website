"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Facebook, Twitter, Instagram, Users, Building2, CheckCircle } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import { contactService } from '@/services/contactService';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await contactService.submitContact(formData);

            if (result.success) {
                setSubmitSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 5000);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Get in{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Touch
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            We'd love to hear from you. Reach out to discuss collaborations, partnerships, or learn more about ARIN
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                        {/* Left Side - Contact Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Who We Are */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-6 h-6 text-[#021d49]" />
                                    <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    ARIN – Fostering connection and peer-learning amongst Researchers, Policymakers, and Practitioners who work in different fields and state and non-state organisations
                                </p>
                            </div>

                            {/* Our Location */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Building2 className="w-6 h-6 text-[#021d49]" />
                                    <h2 className="text-2xl font-bold text-gray-900">Our Location</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-[#021d49] flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-gray-700 leading-relaxed">
                                                Africa Research & Impact Network, ACK Gardens House, 1st Floor, Bishop Road, 1St Ngong Ave, Upperhill, Nairobi.
                                            </p>
                                            <p className="text-gray-700 mt-2">
                                                P.O Box 53358 – 00200. Nairobi, Kenya
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Details</h2>
                                <div className="space-y-4">
                                    <a href="tel:+254746130873" className="flex items-center gap-3 text-gray-700 hover:text-[#021d49] transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-[#021d49]/10 flex items-center justify-center group-hover:bg-[#021d49]/20 transition-colors">
                                            <Phone className="w-5 h-5 text-[#021d49]" />
                                        </div>
                                        <span className="font-medium">+254746130873</span>
                                    </a>

                                    <a href="mailto:info@arin-africa.org" className="flex items-center gap-3 text-gray-700 hover:text-[#021d49] transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-[#021d49]/10 flex items-center justify-center group-hover:bg-[#021d49]/20 transition-colors">
                                            <Mail className="w-5 h-5 text-[#021d49]" />
                                        </div>
                                        <span className="font-medium">info@arin-africa.org</span>
                                    </a>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h2>
                                <div className="flex gap-4">
                                    <a
                                        href="https://twitter.com/arin_africa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-[#021d49]/10 flex items-center justify-center hover:bg-[#021d49] hover:text-white transition-all duration-300 group"
                                        aria-label="Follow us on X (Twitter)"
                                    >
                                        <Twitter className="w-5 h-5 text-[#021d49] group-hover:text-white" />
                                    </a>
                                    <a
                                        href="https://facebook.com/arin_africa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-[#021d49]/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group"
                                        aria-label="Follow us on Facebook"
                                    >
                                        <Facebook className="w-5 h-5 text-[#021d49] group-hover:text-white" />
                                    </a>
                                    <a
                                        href="https://instagram.com/arin_africa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-[#021d49]/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 group"
                                        aria-label="Follow us on Instagram"
                                    >
                                        <Instagram className="w-5 h-5 text-[#021d49] group-hover:text-white" />
                                    </a>
                                </div>
                                <div className="mt-4 space-y-2 text-sm text-gray-600">
                                    <p><span className="font-semibold">X (Twitter):</span> @arin_africa</p>
                                    <p><span className="font-semibold">Facebook:</span> arin_africa</p>
                                    <p><span className="font-semibold">Instagram:</span> arin_africa</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                                <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible</p>

                                {submitSuccess && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-green-800 font-semibold">Message sent successfully!</p>
                                            <p className="text-green-700 text-sm">We'll get back to you soon.</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#021d49] focus:ring-2 focus:ring-[#021d49]/20 focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email and Phone */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#021d49] focus:ring-2 focus:ring-[#021d49]/20 focus:outline-none transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#021d49] focus:ring-2 focus:ring-[#021d49]/20 focus:outline-none transition-colors"
                                                placeholder="+254 700 000000"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#021d49] focus:ring-2 focus:ring-[#021d49]/20 focus:outline-none transition-colors"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#021d49] focus:ring-2 focus:ring-[#021d49]/20 focus:outline-none transition-colors resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section (Optional) */}
                <section className="max-w-[1600px] mx-auto px-6 pb-16">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819364828129!2d36.8185!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTkuOSJTIDM2wrA0OScwNi42IkU!5e0!3m2!1sen!2ske!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ARIN Office Location"
                        ></iframe>
                    </div>
                </section>
            </div>

        </>
    );
};

export default ContactPage;