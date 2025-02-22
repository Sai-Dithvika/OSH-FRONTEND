// import Nav from "@/app/components/navbar";
import Sidebar from "./navbar";
import features from "../Data/features";
import FAQAccordion from "./acoordion";
// import Footer from "./home";

export default function Tutorial() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "jump-start", title: "Jump Start" },
    { id: "features", title: "Features" },
    { id: "workflow", title: "Workflow of Hub" },
    { id: "faq", title: "FAQ" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const faqItems = [
    {
      question: "What is Open Source Hub?",
      answer:
        "Open Source Hub is a community-driven platform designed to connect open-source enthusiasts from around the world. It allows developers to showcase projects, collaborate on issues, join real-time discussions, and more.",
    },
    {
      question: "How do I get started with Open Source Hub?",
      answer:
        "Getting started is easy! Just sign up using your GitHub account, set up your profile, and start exploring projects in the showcase. You can also contribute to existing projects and join live chat rooms.",
    },
    {
      question: "Can I share my own open-source projects on Open Source Hub?",
      answer:
        "Absolutely! Open Source Hub encourages users to showcase their own projects, allowing them to gain visibility and find contributors from the community.",
    },
    {
      question: "Is Open Source Hub free to use?",
      answer:
        "Yes, Open Source Hub is completely free to use. Our goal is to make open-source contributions accessible to everyone.",
    },
    {
      question: "How does the donation feature work?",
      answer:
        "The donation feature allows contributors and users to support project owners directly. Developers can add donation links to their profiles, and supporters can contribute to their favorite projects.",
    },
    {
      question: "Does Open Source Hub support all tech stacks?",
      answer:
        "Yes, Open Source Hub is tech-stack agnostic and is built to support a wide variety of technologies, making it easy for developers from different backgrounds to participate.",
    },
    {
      question: "Can I find projects relevant to my interests?",
      answer:
        "Yes, Open Source Hub uses AI-powered recommendations to connect you with projects that match your skills and interests, ensuring you find the best fit for your contributions.",
    },
    {
      question: "How are projects prioritized in the Issue Management section?",
      answer:
        "The Issue Management section uses AI-powered tagging and prioritization to highlight the most relevant and impactful issues, making it easier for contributors to get involved.",
    },
    {
      question: "Is there a community chat feature?",
      answer:
        "Yes, Open Source Hub provides real-time chat rooms for various topics. These allow users to discuss project ideas, share tech insights, and connect with like-minded developers.",
    },
    {
      question: "How is Open Source Hub different from other platforms?",
      answer:
        "Open Source Hub stands out by integrating AI and analytics to enhance the user experience. From AI-driven code reviews to personalized project feeds, we’re building an ecosystem that encourages collaboration and growth.",
    },
    {
      question: "Can I customize my profile on Open Source Hub?",
      answer:
        "Yes, you can fully customize your profile to highlight your skills, interests, and contributions, helping you to better connect with the community.",
    },
    {
      question: "Is my data secure on Open Source Hub?",
      answer:
        "We prioritize user data security and ensure that all data is managed with best practices to protect your information and contributions.",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen font-serif bg-gradient-to-r from-gradient-start via-white to-gradient-end/30 font-normal">
        <Sidebar sections={sections} />
        <div className="flex-1 text-left">
          <div id="introduction" className="mt-10 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold">
              Welcome to the Quickie Documentation!
            </h1>
            <h2 className="text-3xl font-bold mt-12">Introduction</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-center">
              Open Source Hub is a community-driven platform that connects
              open-source enthusiasts globally...
            </p>
          </div>

          <div
            id="jump-start"
            className="border-t-2 border-dashed border-gray-400 my-4 mt-6 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mt-8">Jump Start</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Follow these steps to join the Open Source Hub community and get
              involved.
            </p>
            <ol className="list-decimal list-inside mt-4 space-y-3 pl-4 bg-black/80 text-white p-10 rounded-md">
              <li>Sign up or log in using GitHub for easy project linking.</li>
              <li>Customize your profile to highlight skills and interests.</li>
              <li>Navigate to Blogs to explore or share projects.</li>
            </ol>
          </div>

          <div
            id="features"
            className="border-t-2 border-dashed border-gray-400 my-4 mt-6 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mt-8">Features</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-black/80 border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b font-semibold text-left text-white">
                      Feature
                    </th>
                    <th className="px-6 py-3 border-b font-semibold text-left text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="bg-black/80">
                      <td className="px-6 py-4 border-b text-white font-semibold">
                        {feature.feature}
                      </td>
                      <td className="px-6 py-4 border-b text-white leading-relaxed">
                        {feature.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="workflow"
            className="border-t-2 border-dashed border-gray-400 my-4 mt-6 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mt-8">Workflow</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Follow these steps to make the most of the Open Source Hub
              platform and start contributing to open-source projects.
            </p>
            <ol className="list-decimal list-inside mt-4 space-y-3 pl-4 bg-black/80 text-white p-10 rounded-md">
              <li>
                Sign up or log in using GitHub for easy integration with your
                projects.
              </li>
              <li>
                Customize your profile by adding skills and areas of interest to
                help connect with relevant projects and contributors.
              </li>
              <li>
                Explore the Project Showcase to view a variety of open-source
                projects and find ones to follow or contribute to.
              </li>
              <li>
                Navigate to the Issues section to find open tasks and start
                contributing based on your skills.
              </li>
              <li>
                Join Real-Time Chat Rooms to discuss ideas, troubleshoot issues,
                and collaborate with others in the community.
              </li>
              <li>
                Utilize Donation Support to contribute to projects financially
                or set up donations for your projects.
              </li>
              <li>
                Check out Personalized Recommendations to discover projects or
                issues that match your interests and skills.
              </li>
              <li>
                Analyze Community Metrics to track views, likes, contributions,
                and engagement on projects.
              </li>
            </ol>
          </div>

          <div
            id="faq"
            className="border-t-2 border-dashed border-gray-400 my-4 mt-6 max-w-4xl mx-auto"
          >
            <FAQAccordion items={faqItems} />
          </div>

          <div
            id="conclusion"
            className="border-t-2 border-dashed border-gray-400 my-4 mt-6 max-w-4xl mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-900 text-center mt-8">
              Thank You for Joining Us!
            </h2>
            <p className="text-gray-700 mt-6 text-center">
              We're excited to have you on board. Start exploring, creating, and
              collaborating with the community!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
