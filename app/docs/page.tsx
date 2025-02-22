"use client";
import React, { useState } from "react";
// import Nav from "@/components/navbar";
import NavigationMenuDemo from "../components/auth";
import Footer from "./home";
import HomePage from "./index";
export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("developers");

  const tabs = [
    { id: "developers", label: "For Developers" },
    { id: "security", label: "For Security Teams" },
    { id: "leaders", label: "For Engineering Leaders" },
  ];

  const features = {
    developers: [
      {
        title: "Simplify Project Setup",
        description:
          "Quickie helps you streamline the initial project setup process, allowing you to focus on coding instead of configuration.",
        icon: "🚀",
      },
      {
        title: "Automatic Dependency Management",
        description:
          "Ensures your project dependencies are up-to-date and compatible, reducing errors and improving security.",
        icon: "🔗",
      },
      {
        title: "Real-time Collaboration",
        description:
          "Collaborate seamlessly with team members, seeing updates in real-time for a smoother development experience.",
        icon: "🤝",
      },
      {
        title: "Enhanced Code Review",
        description:
          "Get suggestions for improving code quality and security before merging, speeding up the review process.",
        icon: "✅",
      },
    ],
    security: [
      {
        title: "Comprehensive Vulnerability Scanning",
        description:
          "Automated scanning for vulnerabilities in dependencies, helping you mitigate risks proactively.",
        icon: "🔒",
      },
      {
        title: "Security Audits",
        description:
          "Regular audits to ensure that your project complies with security best practices.",
        icon: "🛡️",
      },
      {
        title: "Issue Tracking and Alerts",
        description:
          "Receive instant alerts on potential security threats, allowing your team to address issues promptly.",
        icon: "🚨",
      },
      {
        title: "Access Control Management",
        description:
          "Ensure only authorized users have access to sensitive parts of the codebase.",
        icon: "🔑",
      },
    ],
    leaders: [
      {
        title: "Productivity Analytics",
        description:
          "Track development progress and productivity metrics to make informed decisions.",
        icon: "📊",
      },
      {
        title: "Code Quality Insights",
        description:
          "Gain insights into code quality and maintainability to help prioritize improvements.",
        icon: "🔍",
      },
      {
        title: "Resource Optimization",
        description:
          "Analyze resource allocation and optimize team workload for maximum efficiency.",
        icon: "⚙️",
      },
      {
        title: "Compliance and Reporting",
        description:
          "Ensure that your projects are compliant with industry standards and generate reports for stakeholders.",
        icon: "📄",
      },
    ],
  };

  return (
    <>
      {/* <NavigationMenuDemo /> */}
      {/* <Footer /> */}
      <div className="min-h-screen bg-gradient-to-r from-gradient-start via-white to-gradient-end font-normalw">
        <HomePage />
        <div className="flex flex-col justify-center items-center text-center mt-10 space-y-20">
          {/* <div className="flex flex-col items-center h-[500px] w-full bg-[#F0F8FF] justify-center">
                        <div className="text-4xl font-bold">QUICKIE</div>
                        <div className="text-3xl font-semibold mt-6">"Welcome to Quickie!!"</div>
                        <div className="text-2xl mt-6">– where ideas come to life, and contributions make a difference.</div>
                        <button className="bg-pink-300 m-8 p-4 w-[200px] rounded-md cursor-pointer hover:bg-pink-400 transition-all duration-200">
                            Get Started
                        </button>
                    </div> */}

          <div className="flex flex-col items-center h-[500px] w-full justify-center bg-white">
            <div className="text-4xl font-bold">WHY QUICKIE?</div>
            <div className="text-3xl font-semibold mt-8">
              Your Fast Track to Open Source Contributions
            </div>
            <div className="text-2xl mt-8 w-[800px]">
              "Quickie is built to make open-source contributions accessible,
              efficient, and impactful. We’re redefining the developer
              experience with tools that help you focus on what you do best."
            </div>
          </div>
        </div>
        <div className="w-full bg-[#F0F8FF] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-black p-6 space-y-20">
            <h1 className="text-4xl font-bold text-center">
              Deliver High-Quality Code, Rapidly
            </h1>
            {/* <p className="text-xl text-center mt-4">
                        Maintainable and secure code helps you ship better products, faster. With Quickie, developers, security teams, and engineering leaders can take action proactively at every stage.
                    </p> */}

            {/* Tabs */}
            <div className="flex justify-center mt-8 space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-lg font-medium rounded-md ${
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {features[activeTab].map((feature, index) => (
                <div
                  key={index}
                  className="w-[100%] h-[100%] p-6 bg-white rounded-lg shadow-md text-black"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{feature.icon}</span>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="py-16">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Ready to dive in? Discover the power of Quickie!
                        </h2>
                        <p className="mt-8 text-xl text-gray-700">
                            Take your open-source contributions to the next level. Start building with Quickie today!
                        </p>
                        <button className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition">
                            Explore
                        </button>
                    </div>
                </div> */}
        <Footer />
      </div>
    </>
  );
}
