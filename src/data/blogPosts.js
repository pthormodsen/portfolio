export const blogPosts = [
    {
    id: "moving-my-homelab-to-k3s",
    title: "Moving My Homelab from One Docker VM to K3s",
    date: "2026-11-06",
    status: "Published",
    tags: ["Homelab", "Kubernetes", "K3s", "Proxmox"],
    excerpt:
      "Everything I host ran in one Docker VM on one machine. Here is how I moved it to a small K3s cluster across two Proxmox hosts, what broke along the way, and what happened when I pulled the plug.",
  },
  {
    id: "building-my-first-proxmox-homelab",
    title: "Building My First Proxmox Home Lab",
    date: "2026-09-17",
    status: "Published",
    tags: ["Homelab", "Proxmox", "Linux"],
    excerpt:
      "How I turned a used office PC into a Proxmox server for running virtual machines, Docker containers, and my own services.",
  },
  {
    id: "fedora-ethernet-driver-fix",
    title: "Dual Booting Fedora and Fixing My Ethernet Connection",
    date: "2026-09-17",
    status: "Published",
    tags: ["Fedora", "Linux", "Networking"],
    excerpt:
      "My Ethernet connection kept dropping to 100 or even 10 Mbps. Here is what I tried and how replacing the driver finally fixed it.",
  },
];