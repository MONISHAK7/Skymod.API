'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <div className="flex items-center gap-3">
          <Image src="/skymodb.png" alt="Skymod Logo" width={50} height={50} />
          <h1 className="text-2xl font-extrabold text-blue-700">SKYMOD PTY LTD</h1>
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#projects" className="hover:text-blue-600">Projects</a>
          <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
          <a href="#team" className="hover:text-blue-600">Our Team</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
        <Link
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 shadow-md"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-24 bg-gradient-to-r from-blue-100 to-white" data-aos="fade-up">
        <h2 className="text-5xl font-extrabold mb-6 text-blue-800">Transforming Neglected Spaces into Valuable Investments</h2>
        <p className="max-w-2xl text-xl text-gray-700">We specialize in property refurbishment and real estate flipping with transparency, trust, and top-tier quality.</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-12">Our Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 border-2 border-blue-100 rounded-xl shadow-lg bg-white hover:shadow-xl transition">
            <Image src="/projects/completed.jpg" alt="Completed Projects" width={600} height={300} className="rounded mb-4 mx-auto" />
            <h4 className="font-bold text-xl text-center text-blue-700 mb-2">Completed Projects</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>16A Park Street, VIC</li>
              <li>29 Belmont Ave, NSW</li>
              <li>8 River Lane, QLD</li>
            </ul>
          </div>
          <div className="p-6 border-2 border-blue-100 rounded-xl shadow-lg bg-white hover:shadow-xl transition">
            <Image src="/projects/ongoing.jpg" alt="Ongoing Projects" width={600} height={300} className="rounded mb-4 mx-auto" />
            <h4 className="font-bold text-xl text-center text-blue-700 mb-2">Ongoing Projects</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>92 Hunter Rd, SA</li>
              <li>45 Lily Blvd, VIC</li>
            </ul>
          </div>
          <div className="p-6 border-2 border-blue-100 rounded-xl shadow-lg bg-white hover:shadow-xl transition">
            <Image src="/projects/upcoming.jpg" alt="Upcoming Projects" width={600} height={300} className="rounded mb-4 mx-auto" />
            <h4 className="font-bold text-xl text-center text-blue-700 mb-2">Upcoming Projects</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>33 Oak Hill Dr, TAS</li>
              <li>5 Pineview Ct, ACT</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-white" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-12">What Our Clients Say</h3>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg">"SkyMod turned my old property into a modern gem. Exceptional work and great ROI!"</p>
            <p className="mt-4 font-semibold text-blue-700">— Sarah T., Melbourne</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg">"Professional team and stunning results. Highly recommend them for any flip project."</p>
            <p className="mt-4 font-semibold text-blue-700">— Raj K., Sydney</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg">"Fast turnaround and amazing quality. Skymod is my go-to team for all renovations."</p>
            <p className="mt-4 font-semibold text-blue-700">— Linda M., Brisbane</p>
          </div>
        </Carousel>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-20 px-6 bg-white" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-12">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="text-center">
            <Image src="/female.png" alt="CEO" width={120} height={120} className="rounded-full mx-auto mb-3 shadow" />
            <p className="font-bold text-blue-800">Monisha K</p>
            <p className="text-gray-600">CEO & Project Strategist</p>
          </div>
          <div className="text-center">
            <Image src="/male.png" alt="Engineer" width={120} height={120} className="rounded-full mx-auto mb-3 shadow" />
            <p className="font-bold text-blue-800">Jake Lee</p>
            <p className="text-gray-600">Lead Engineer</p>
          </div>
          <div className="text-center">
            <Image src="/female.png" alt="Designer" width={120} height={120} className="rounded-full mx-auto mb-3 shadow" />
            <p className="font-bold text-blue-800">Rina Thomas</p>
            <p className="text-gray-600">Interior Designer</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-blue-50" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-center text-blue-700 mb-12">Contact Us</h3>
        <form className="max-w-xl mx-auto grid gap-5">
          <input className="p-3 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" />
          <input className="p-3 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" placeholder="Email" />
          <textarea className="p-3 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your message..." rows={4} />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 shadow">Send Message</button>
        </form>
        <div className="text-center mt-8 text-gray-700">
          <p>123 Main Street, Melbourne, VIC</p>
          <p>Email: info@skymod.com.au</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-5 text-sm bg-white border-t text-gray-500">
        &copy; {new Date().getFullYear()} SKYMOD PTY LTD. All rights reserved.
      </footer>
    </div>
  );
}
``