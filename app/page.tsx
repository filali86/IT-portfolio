"use client"

import type React from "react"

import { useState } from "react"
import {
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  Server,
  Network,
  Package,
  FolderTree,
  Monitor,
  Wifi,
  Shield,
  Briefcase,
  Wrench,
  Settings,
  Target,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectModal } from "@/components/project-modal"
import { ContactForm } from "@/components/contact-form"
import { Toaster } from "@/components/ui/toaster"
import { BackToTop } from "@/components/back-to-top"
import { ScrollReveal } from "@/components/scroll-reveal"

interface Project {
  id: string
  title: string
  icon: React.ReactNode
  type: "support" | "infrastructure"
  challenge: string
  solution: string
  technologies: string[]
  githubUrl: string
  images: Array<{ src: string; caption: string }>
}

const projects: Project[] = [
  {
    id: "active-directory",
    title: "IT Incident Management: A User Login Case",
    icon: <Server className="h-5 w-5" />,
    type: "support",
    challenge:
      "A user reported being unable to log into their workstation, disrupting their workflow. The help desk needed to quickly diagnose the root cause and restore access while maintaining security protocols.",
    solution:
      "Executed a full ITIL-based incident response. The issue was diagnosed in Active Directory as a security-driven account lockout. The account was unlocked, access was verified, and the ticket was resolved with detailed documentation for future reference.",
    technologies: ["Windows Server", "AD DS","ADUC","ITSM","Group Policy","Jira Service Management"],
    githubUrl: "https://github.com/filali86/IT-Incident-Management---AD-Account-Lockout",
    images: [
      {
        src: "Screenshots/Log_In_PC/1.png",
        caption: "The user's perspective: A 'Cannot log on' error message encountered by the end-user, validating the issue reported in the help desk ticket.",
      },
      {
        src: "Screenshots/Log_In_PC/2.png",
        caption: "The user's perspective: A 'Cannot log on' error message encountered by the end-user, validating the issue reported in the help desk ticket.",
      },
      {
        src: "Screenshots/Log_In_PC/3.png",
        caption: "Administrator view inside Active Directory Users and Computers ADUC. Shows the user account properties, highlighting the 'Account is locked out' setting which was the root cause of the login failure.",
      },
      {
        src: "Screenshots/Log_In_PC/4.png",
        caption: "Successful login! The user 'Sasha' is now able to access their desktop after the administrative action was taken, confirming the resolution.",
      },
      {
        src: "Screenshots/Log_In_PC/6.png",
        caption: "The resolved help desk ticket. Documents the entire troubleshooting process, from identifying the locked-out account in AD to resolving it, adding a root cause analysis, and closing the ticket with the customer.",
      },
    ],
  },
  {
    id: "network-troubleshooting",
    title: "File Share Access Management & Permission Resolution",
    icon: <Network className="h-5 w-5" />,
    type: "support",
    challenge:"A user was unable to access a critical company shared folder, preventing them from doing their job. The help desk needed to diagnose the root cause within the complex layers of network share and NTFS permissions and grant the appropriate access without compromising security.",
    solution:
      "Systematically verified the user's account in Active Directory, then inspected the NTFS permissions on the target shared folder. Identified that the user was missing from the necessary security group. Added the user to the group with 'Read & Execute' permissions, successfully restoring their access to the required resources.",
    technologies: ["Windows Server", "NTFS Permissions", "Network File Sharing", "Active Directory","ITSM / Jira Service Management"],
    githubUrl: "https://github.com/filali86/File-Share-Access-Management",
    images: [
      {
        src: "Screenshots/Shared_Drive/1.png",
        caption: "User submits a request stating 'Can't Access Shared Drive, initiating the access management workflow.'",
      },
      {
        src: "Screenshots/Shared_Drive/2.png",
        caption: "Using Active Directory Users and Computers to verify the user's account and group memberships as part of the diagnosis.",
      },
      {
        src: "Screenshots/Shared_Drive/3.png",
        caption: "The user's perspective, showing the 'Windows cannot access... You do not have permission' error, confirming the issue.",
      },
      {
        src: "Screenshots/Shared_Drive/4.png",
        caption: "Added the user to the group with 'Read & Execute' permissions,",
      },
      {
        src: "Screenshots/Shared_Drive/5.png",
        caption: "User can now acces the shared folder,successfully restoring their access to the required resources.",
      },
      {
        src: "Screenshots/Shared_Drive/8.png",
        caption: "The resolved ticket documenting the entire process, from troubleshooting to adding the user to the correct permissions group and confirming access.",
      },
    ],
  },
  {
    id: "software-deployment",
    title: "Network Connectivity Troubleshooting: An End-User Case",
    icon: <Network className="h-5 w-5" />,
    type: "support",
    challenge:"An end-user lost all internet access, halting their work. The help desk needed to systematically diagnose the issue across the network stack—from the local machine to external connectivity—to identify the root cause and restore service.",
    solution:
      "Methodically isolated the problem by pinging external DNS 8.8.8.8, checking the IP configuration, and finally discovering the network adapter was disabled at the OS level. The adapter was re-enabled, a new IP was obtained via ipconfig /renew, and internet access was confirmed. The incident was fully documented in the service desk ticket.",
    technologies: ["Windows 10/11", "TCP/IP", "Command Line", "Network Adapter Management","ITSM / Jira Service Management"],
    githubUrl: "https://github.com/filali86/Network-Troubleshooting---Adapter-Recovery",
    images: [
      {
        src: "Screenshots/No_internet/1.png",
        caption: "The user reports a 'No Internet Access' issue through the IT service portal, initiating the official troubleshooting process.",
      },
      {
        src: "Screenshots/No_internet/2.png",
        caption: "The end-user's view: A 'You're not connected to the internet' error in Windows.",
      },
      {
        src: "Screenshots/No_internet/3.png",
        caption: "Using Command Prompt to perform initial checks ping 8.8.8.8, showing 100% packet loss and confirming a network-level failure.",
      },
      {
        src: "Screenshots/No_internet/5.png",
        caption: "The Network Connections window shows the disabled network adapter, which was the root cause of the internet outage.",
      },
      {
        src: "Screenshots/No_internet/9.png",
        caption: "Successful resolution confirmed by loading Google.com in a web browser, proving internet access was fully restored.",
      },
      {
        src: "Screenshots/No_internet/10.png",
        caption: "The resolved help desk ticket, documenting the cause 'disabled adapter' and fix, closing the loop on the incident.",
      },
    ],
  },
  {
    id: "file-services",
    title: "Enterprise Software Deployment via Group Policy",
    icon: <FolderTree className="h-5 w-5" />,
    type: "support",
    challenge:
      "A user required specific software VLC Media Player to perform their job. Manually installing software on every computer is inefficient. The task was to find an enterprise-grade solution to deploy the software automatically and reliably to users or computers.",
    solution:
      "Implemented an automated software deployment system using Group Policy. This involved sourcing the correct MSI installer, creating a dedicated Group Policy Object (GPO), and configuring it to assign the application to target computers. The installation was verified on a client machine, confirming the solution worked without user intervention.",
    technologies: ["Windows Server","Group Policy Objects GPO", "Active Directory", "Software Deployment .MSI","ITSM / Jira Service Management"],
    githubUrl: "https://github.com/filali86/Enterprise-Software-Deployment-via-Group-Policy",
    images: [
      {
        src: "Screenshots/Software_Deployment/1.png",
        caption: "A user submits a ticket requesting 'VLC Media Player for training videos,'initiating a software deployment process.",
      },
      {
        src: "Screenshots/Software_Deployment/2.png",
        caption: "Downloading the official VLC .MSI Windows Installer package, which is required for silent, automated deployments via GPO.",
      },
      {
        src: "Screenshots/Software_Deployment/5.png",
        caption: "Creating a new Group Policy Object and using the Group Policy Management Editor to assign the software under Computer Configuration -> Policies -> Software Settings.",
      },
      {
        src: "Screenshots/Software_Deployment/8.png",
        caption: "gpupdate /force on a client computer to immediately apply the new Group Policy, which triggers the software installation.",
      },
      {
        src: "Screenshots/Software_Deployment/9.png",
        caption: "The application appeared on the user desktop.",
      },
      {
        src: "Screenshots/Software_Deployment/11.png",
        caption: "The resolved ticket documents the entire process, from GPO creation to verification that the application appears in the Start Menu and functions correctly.",
      },
    ],
  },
  {
    id: "ad-foundation-build",
    title: "Active Directory Foundation Build",
    icon: <Server className="h-5 w-5" />,
    type: "infrastructure",
    challenge:
      "This project involved building the core identity and network services foundation for an enterprise-style environment. The objective was to deploy a Windows Server as a Domain Controller with integrated DNS, establishing a centralized management domain and seamlessly integrating a client computer into this new environment.",
    solution:
      "Promoted a Windows Server 2022 instance to a Domain Controller, creating a new Active Directory forest and domain 'Demo.local' Deployed and configured the integrated DNS Server role to provide essential name resolution services for the domain. Established a structured network foundation by implementing a static IP address scheme on the server.Integrated a client workstation into the domain by configuring its DNS settings and successfully completing the domain join process.",
    technologies: ["Windows Server 2022", "Active Directory Domain Services (AD DS)", "DNS Server", "Windows 10/11 Client", "Oracle VirtualBox"],
    githubUrl: "https://github.com/filali86/-Active-Directory-Infrastructure",
    images: [
      {
        src: "Screenshots/Infrastructure/1.png",
        caption: "The initial Windows Server 2022 dashboard in Server Manager, the starting point for installing core infrastructure roles.",
      },
      {
        src: "Screenshots/Infrastructure/9.png",
        caption: "Configuring a static IPv4 address (192.168.11.106) for the server, ensuring a consistent network identity required for a Domain Controller.",
      },
      {
        src: "Screenshots/Infrastructure/5.png",
        caption: "Installing the essential Active Directory Domain Services and DNS Server roles using the Server Manager 'Add Roles and Features' wizard.",
      },
      {
        src: "Screenshots/Infrastructure/6.png",
        caption: "Launching the Active Directory Domain Services Configuration Wizard to deploy a new forest and domain (Demo.local).",
      },
      {
        src: "Screenshots/Infrastructure/7.png",
        caption: "A successful pre-deployment validation, confirming the server meets all requirements for promotion to a domain controller.",
      },
      {
        src: "Screenshots/Infrastructure/8.png",
        caption: "The final results screen confirming the server was successfully configured as a Domain Controller, with a pending reboot to complete the process.",
      },
      {
        src: "Screenshots/Infrastructure/10.png",
        caption: "Configuring the client computer's DNS settings to point to the new Domain Controller (192.168.11.106), a critical step for domain discovery.",
      },
      {
        src: "Screenshots/Infrastructure/12.png",
        caption: "The System Properties window on the client PC, showing its successful membership in the Demo.local domain instead of a workgroup.",
      },
    ],
  },
  {
    id: "service-account-security",
    title: "Enterprise AD Infrastructure & Group Policy Management",
    icon: <Shield className="h-5 w-5" />,
    type: "infrastructure",
    challenge:
      "Designed and deployed a comprehensive enterprise Active Directory infrastructure from the ground up, implementing both organizational structure and automated policy enforcement. This project demonstrates professional AD management spanning user/computer organization, security hardening, and user environment standardization.",
    solution:
      "Hierarchical AD Design: Created geographic OU structure (USA/Europe/Asia) with functional sub-OUs,Object Lifecycle Management: Deployed user accounts, computer objects, and server roles with professional documentation ,Security Foundation: Implemented enterprise password policies and device control restrictions,User Environment Management: Standardized desktop experience and implemented security lockdowns,Group Policy Architecture: Established GPO hierarchy for targeted policy application and management",
    technologies: ["Windows Server 2022", "Active Directory Domain Services", "Group Policy Objects", "Organizational Units", "Oracle VirtualBox"],
    githubUrl: "https://github.com/filali86/-Enterprise-AD-Infrastructure-Group-Policy-Management",
    images: [
      {
        src: "Screenshots/Management/1.png",
        caption: " AD Overview: Shows the complete organized AD structure with geographic OUs (USA, Europe, Asia) - establishes the big picture",
      },
      {
        src: "Screenshots/Management/6.png",
        caption: "Computer Organization: Demonstrates computers properly organized by geographic OUs with detailed descriptions",
      },
      {
        src: "Screenshots/Management/8.png",
        caption: "Server Management: Shows servers organized by function (DC, File Server, Web Server) with role descriptions",
      },
      {
        src: "Screenshots/Management/3.png",
        caption: "User & Group Structure: Displays user accounts and security/distribution groups in organized OUs",
      },
      {
        src: "Screenshots/Management/5.png",
        caption: "User Details: Close-up of USA users with job titles, showing professional user account management",
      },
      {
        src: "Screenshots/Management/10.png",
        caption: "GPO Creation: Starting the GPO implementation by creating new Password Policy",
      },
      {
        src: "Screenshots/Management/14.png",
        caption: "Password Policy Configuration: Shows the security settings being configured in Group Policy",
      },
      {
        src: "Screenshots/Management/12.png",
        caption: " Password Complexity: Detailed view of password requirements enforcement",
      },
      {
        src: "Screenshots/Management/20.png",
        caption: "USB Restriction Policy: Creating device control policy for security",
      },
      {
        src: "Screenshots/Management/16.png",
        caption: "Desktop Wallpaper Policy: Implementing corporate branding and user environment control",
      },
      {
        src: "Screenshots/Management/18.png",
        caption: "Control Panel Restrictions: Security lockdown by restricting system access",
      },
      {
        src: "Screenshots/Management/21.png",
        caption: "A client computer displaying a Group Policy restriction message, proving that the Control Panel restriction policy is actively enforced and preventing unauthorized access to system settings. This demonstrates successful GPO application and enterprise security compliance.",
      },
    ],
  },
]

export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openModal = (project: Project, imageIndex: number) => {
    setSelectedProject(project)
    setSelectedImageIndex(imageIndex)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-8">
          <div className="font-semibold text-lg">Marwan Filali</div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 md:py-24 lg:py-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-[3fr_2fr] md:items-center md:gap-12">
            {/* Image - appears first on mobile, second on desktop */}
            <div className="order-1 md:order-2 flex justify-center w-full">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                <img
                  src="/v1.jpg"
                  alt="Professional headshot"
                  className="relative rounded-2xl shadow-2xl w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover"
                />
              </div>
            </div>

            {/* Text content - appears second on mobile, first on desktop */}
            <div className="order-2 md:order-1 space-y-6 md:space-y-8 text-center md:text-left md:ml-8 w-full">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-balance">
                  Marwan Filali <br />
                  IT Support Specialist & <span className="whitespace-nowrap">Systems Administrator</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
                  IT professional with comprehensive hands-on experience in computer hardware,
                  Windows and Linux systems administration, and network troubleshooting. 
                  Combines technical expertise across hardware and software platforms
                  to deliver effective technical support and problem-solving solutions.
                </p>
              </div>
             <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <a href="/Marwan-Filali-Resume.pdf" download className="block w-full sm:w-auto">
                  <Button size="lg" className="gap-2 cursor-pointer w-full">
                  <Download className="h-5 w-5" />
                  Download Resume
                  </Button>
                </a>
                  <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                    <a href="#contact">Get in Touch</a>
                  </Button>
              </div>
              <div className="flex gap-4 pt-4 md:pt-6 justify-center md:justify-start">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/filali-marwan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/filali86" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:filali.marouane.tech@gmail.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <ScrollReveal>
        <section className="container mx-auto py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow border-2">
                <CardContent className="pt-8 pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">6</div>
                  <div className="text-sm text-muted-foreground font-medium">Projects Completed</div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border-2">
                <CardContent className="pt-8 pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">3</div>
                  <div className="text-sm text-muted-foreground font-medium">Professional Certifications</div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border-2">
                <CardContent className="pt-8 pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-sm text-muted-foreground font-medium">Technologies Mastered</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Skills & Technologies Section */}
      <ScrollReveal>
        <section id="skills" className="container mx-auto py-24 md:py-40 bg-muted/30">
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technical expertise across various IT domains and enterprise technologies
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Monitor className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Operating Systems & Virtualization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Windows Server 2019/2022</li>
                  <li>• Windows 10/11 Client OS</li>
                  <li>• Linux/Ubuntu Server</li>
                  <li>• VMware Workstation</li>
                  <li>• Oracle VirtualBox</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wifi className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Networking & Infrastructure</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• TCP/IP Networking</li>
                  <li>• DNS Configuration</li>
                  <li>• DHCP Management</li>
                  <li>• Network Troubleshooting</li>
                  <li>• Remote Desktop Services</li>
                  <li>• Firewall Basics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Active Directory & Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Active Directory Domain Services (AD DS)</li>
                  <li>• Group Policy Management (GPO)</li>
                  <li>• User & Group Management</li>
                  <li>• Organizational Units (OU)</li>
                  <li>• NTFS/Share Permissions</li>
                  <li>• Account Security Policies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">System Administration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Software Deployment (GPO/MSI)</li>
                  <li>• Service Management</li>
                  <li>• Performance Monitoring</li>
                  <li>• Backup & Recovery Basics</li>
                  <li>• Patch Management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">IT Service Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Jira Service Management</li>
                  <li>• Zendesk</li>
                  <li>• Ticketing Systems</li>
                  <li>• SLA Management</li>
                  <li>• ITIL Foundations</li>
                  <li>• Documentation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Productivity & Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• PowerShell Scripting</li>
                  <li>• Git & GitHub</li>
                  <li>• Visual Studio Code</li>
                  <li>• Command Line/Terminal</li>
                  <li>• Knowledge Base Creation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollReveal>

      {/* Support & Troubleshooting Projects Section */}
      <ScrollReveal>
        <section id="support-projects" className="container mx-auto py-24 md:py-40">
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Support & Troubleshooting Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-world IT support scenarios demonstrating problem-solving and technical troubleshooting skills
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {projects
              .filter((p) => p.type === "support")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer bg-muted h-48"
                    onClick={() => openModal(project, 0)}
                  >
                    <img
                      src={project.images[0].src || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{project.icon}</div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1 text-foreground">Challenge:</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 text-foreground">Solution:</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="default" className="w-full gap-2 mt-4" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View Full Documentation
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Infrastructure & Lab Projects Section */}
      <ScrollReveal>
        <section id="infrastructure-projects" className="container mx-auto py-24 md:py-40 bg-muted/30">
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Infrastructure & Lab Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hands-on infrastructure builds demonstrating enterprise system design and implementation capabilities
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {projects
              .filter((p) => p.type === "infrastructure")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer bg-muted h-48"
                    onClick={() => openModal(project, 0)}
                  >
                    <img
                      src={project.images[0].src || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{project.icon}</div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1 text-foreground">Overview:</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 text-foreground">Key Implementations:</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="default" className="w-full gap-2 mt-4" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View Full Documentation
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Certifications Section */}
      <ScrollReveal>
        <section id="certifications" className="container mx-auto py-24 md:py-40 bg-muted/30">
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications demonstrating expertise in IT support and systems administration.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Google IT Support Professional Certificate</CardTitle>
                    <CardDescription className="mt-2">Google</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Issued: Sep 27, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>5-Course Professional Program | IT Infrastructure & Support Specialization</span>
                </div>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href="https://www.coursera.org/account/accomplishments/professional-cert/4T2U2657V52E" target="_blank" rel="noopener noreferrer">
                    View Credential →
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">ALX Professional Foundation Certificate</CardTitle>
                    <CardDescription className="mt-2">ALX</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Issued: Aug 5, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Professional Development for Digital Age | 3-Month Intensive Program</span>
                </div>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href="https://savanna.alxafrica.com/certificates/Jn3rh7xmZN" target="_blank" rel="noopener noreferrer">
                    View Credential →
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-primary/50 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">In Progress</Badge>
              </div>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">ALX Cyber Security Specialization</CardTitle>
                    <CardDescription className="mt-2">ALX</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Expected Completion: February 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>8-Month Program (5 months main course)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Comprehensive cyber security training covering threat detection, incident response, security
                  frameworks, and enterprise security best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Section */}
      <ScrollReveal>
        <section id="contact" className="container mx-auto py-24 md:py-40">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4 mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Interested in working together? Feel free to reach out for opportunities or just to connect.
              </p>
            </div>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Quick Contact</CardTitle>
                <CardDescription>Send me a message and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <div className="mt-12 text-center space-y-4">
              <p className="text-sm text-muted-foreground">Or reach me directly at:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="mailto:filali.marouane.tech@gmail.com" className="text-primary hover:underline flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@example.com
                </a>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <a
                  href="https://www.linkedin.com/in/filali-marwan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto py-12 px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="text-sm text-muted-foreground">© 2025 Marwan Filali. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="#support-projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Support Projects
              </a>
              <a
                href="#infrastructure-projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Infrastructure Projects
              </a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </a>
              <a
                href="#certifications"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Certifications
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          images={selectedProject.images}
          initialIndex={selectedImageIndex}
          projectTitle={selectedProject.title}
        />
      )}

      {/* Back to Top Button */}
      <BackToTop />

      <Toaster />
    </div>
  )
}
