export interface ProjectData {
  projectTitle: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
  content: string;
  accountName: string;
  postedDate: string;
}
export const projectData: ProjectData = {
  projectTitle: "Quickie",
  quote:
    "Transform your development experience; Quickie turns setup time into creation time.",
  imageSrc: "/image-1.jpeg",
  imageAlt: "Project Thumbnail",
  content: `
      <p><strong>Quickie</strong> is an exceptional open-source project designed for developers seeking an effortless setup for their development environments.</p>
  
      <p>With its <strong>Effortless Setup</strong>, Quickie enables users to get their projects running in minutes, not hours, eliminating the struggles of complicated installations. This streamlined approach allows you to focus on <strong>building your application</strong> instead of wrestling with configurations.</p>
  
      <p>As part of the <strong>Open Source Freedom</strong> initiative, Quickie invites global collaboration, giving developers access to a vibrant community that enhances the platform. One standout feature is <strong>Customization Made Easy</strong>, allowing developers to tailor Quickie to meet unique project requirements, whether for personal or large-scale applications.</p>
  
      <p>Quickie also offers <strong>Time-Saving Templates</strong>, kickstarting projects with pre-configured settings for various tech stacks, reducing initial setup time and enabling immediate coding. Moreover, the <strong>Community Support</strong> fosters engagement among developers, providing resources like tutorials and troubleshooting tips that empower users to overcome challenges collaboratively.</p>
  
      <p>In summary, Quickie is not just a tool; it’s a community-focused platform prioritizing ease of use and flexibility. With its commitment to effortless setup, customization, templates, and strong support, Quickie is the ideal choice for developers aiming to streamline their processes and efficiently achieve their project goals.</p>
    `,
  accountName: "Account Name",
  postedDate: "Posted Date",
};
