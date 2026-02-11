
 import React from "react";
import {
  Heart,
  Shield,
  Truck,
  Award,
  Users,
  Target,
  Leaf,
  Globe,
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Years of Excellence", value: "15+" },
    { label: "Happy Customers", value: "50K+" },
    { label: "Products Sold", value: "200K+" },
    { label: "Countries Served", value: "25+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer-Centric",
      description:
        "Every decision we make starts with our customers. We're committed to creating experiences that delight and inspire.",
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description:
        "We partner with skilled artisans and manufacturers who share our passion for creating furniture that lasts generations.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We source responsibly and design with the environment in mind, ensuring our beautiful pieces don't cost the earth.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "Honest pricing, clear communication, and reliable service. We believe trust is earned through consistent action.",
    },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "15 years of experience in furniture design and retail",
    },
    {
      name: "David Chen",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bio: "Award-winning designer with a passion for minimalism",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Expert in logistics and customer experience optimization",
    },
    {
      name: "James Wilson",
      role: "Sustainability Lead",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Environmental scientist dedicated to eco-friendly practices",
    },
  ];

  const milestones = [
    {
      year: "2009",
      title: "The Beginning",
      description:
        "Started with a small showroom and a vision to make quality furniture accessible to everyone.",
    },
    {
      year: "2013",
      title: "Going Digital",
      description:
        "Launched our e-commerce platform, bringing our curated collection to customers nationwide.",
    },
    {
      year: "2017",
      title: "Sustainability First",
      description:
        "Committed to 100% sustainable sourcing and launched our eco-friendly product line.",
    },
    {
      year: "2020",
      title: "Global Expansion",
      description:
        "Expanded shipping to 25 countries, making our designs available worldwide.",
    },
    {
      year: "2024",
      title: "50,000 Happy Homes",
      description:
        "Reached a milestone of 50,000+ satisfied customers and counting.",
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders over $500",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "100% secure transactions",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "5-year warranty on all items",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 customer service",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&h=900&fit=crop"
            alt="Our Story"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              Crafting Spaces,
              <br />
              Creating Memories
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              For over 15 years, we've been helping people transform their
              houses into homes with thoughtfully designed, sustainably sourced
              furniture.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  What started as a small furniture workshop in 2009 has grown
                  into a trusted name in home furnishings. Our founder, Sarah
                  Mitchell, had a simple vision: to create beautiful,
                  high-quality furniture that everyone could afford.
                </p>
                <p>
                  We believe that good design shouldn't be a luxury. Every piece
                  in our collection is carefully selected or designed in-house,
                  ensuring it meets our exacting standards for quality,
                  functionality, and aesthetic appeal.
                </p>
                <p>
                  Today, we're proud to serve customers across 25 countries,
                  but our commitment remains the same: to help you create a home
                  you love, filled with pieces that bring you joy every single
                  day.
                </p>
              </div>
            </div>
            <div className="relative h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop"
                alt="Our Workshop"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <value.icon
                  className="w-10 h-10 text-gray-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600">
              Key milestones in our story
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white p-6 border border-gray-200 ml-8 md:ml-0">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-gray-900 border-4 border-white transform md:-translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600">
              The people behind the furniture
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <benefit.icon
                  className="w-10 h-10 text-gray-900 mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Explore our collection and discover pieces that speak to you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
            <button className="px-8 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};



export default About