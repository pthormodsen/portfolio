export default function ProxmoxHomeLab() {
  return (
    <>
      <section>
        <h2>Why I wanted a home lab</h2>

        <p>
          I had already been self-hosting a few of my projects on an old PC
          running Ubuntu. At first, I was running the applications directly on
          the machine without Docker.
        </p>

        <p>
          Over time, I wanted a setup where I could experiment more freely with
          virtual machines, Docker, networking, and different services without
          everything depending on one operating system.
        </p>

        <p>
          I ended up buying a used HP EliteDesk 800 G5 with an Intel i7-8700
          and decided to turn it into my first proper Proxmox server.
        </p>
      </section>

      <section>
        <h2>Setting up Proxmox</h2>

        <p>
          I installed Proxmox directly on the machine and gave the server the
          hostname <code>luffy</code>. Yes, I decided to name my server nodes
          after One Piece characters.
        </p>

        <p>
          The idea was to keep Proxmox itself fairly clean and use it mainly as
          the hypervisor, while running the services I actually use inside
          virtual machines and containers.
        </p>

        <p>
          My first VM was an Ubuntu Server machine called{" "}
          <code>docker01</code>. Instead of installing Docker directly on the
          Proxmox host, I keep my applications inside this VM.
        </p>

        <pre>
          <code>{`Proxmox (luffy)
└── Ubuntu VM (docker01)
    ├── Portfolio
    ├── Todo app
    ├── Chess
    ├── WPM typing app
    └── Cloudflare Tunnel`}</code>
        </pre>
      </section>

      <section>
        <h2>Moving my applications</h2>

        <p>
          Before moving to Proxmox, my old Ubuntu server had gradually changed
          as well. I originally ran my applications directly on the machine,
          but later moved most of them into Docker containers.
        </p>

        <p>
          That made the move to the new server much easier. Once{" "}
          <code>docker01</code> was running, I could clone my repositories from
          GitHub and start the applications using the Dockerfiles and Docker
          Compose configurations I already had.
        </p>

        <p>
          I also used the move as an opportunity to simplify how the services
          are exposed publicly. I run Cloudflare Tunnel as a Docker container,
          and the tunnel communicates with my applications over a shared Docker
          network.
        </p>

        <p>
          Instead of pointing the tunnel at a specific server IP and exposed
          port, I can route traffic directly to container names such as{" "}
          <code>portfolio:80</code>. This means the configuration is less tied
          to one specific machine.
        </p>

        <p>
          The goal is to make future moves easier. If I eventually move the
          applications to another VM or another physical server, I should only
          need to recreate the Docker setup and connect the Cloudflare Tunnel
          again instead of reconfiguring every domain from scratch.
        </p>
      </section>

      <section>
        <h2>What I learned</h2>

        <p>
          One of the biggest things I learned was how the different layers fit
          together. Proxmox runs the virtual machines, the Ubuntu VM runs
          Docker, and Docker runs the applications themselves.
        </p>

        <p>
          Before using Proxmox, I mostly thought of my server as one Linux
          machine running everything. Now I can separate services into
          different environments, take snapshots before making changes, and
          experiment without being as worried about breaking the entire server.
        </p>

        <p>
          Setting everything up also forced me to learn more about Linux
          bridges, virtual network interfaces, Docker networks, SSH, DNS, and
          how traffic actually reaches an application running several layers
          below the physical machine.
        </p>

        <p>
          I also learned that making things portable early on saves a lot of
          work later. Moving the applications was much easier because they were
          already containerized and stored in Git repositories instead of being
          manually configured on one server.
        </p>
      </section>

      <section>
        <h2>Whats next?</h2>

        <p>
          The setup is still fairly small, but that is also the point. I want
          the home lab to be somewhere I can experiment and learn without
          making the infrastructure unnecessarily complicated.
        </p>

        <p>
          Next, I want to improve storage and backups, experiment more with LXC
          containers, such as running Pi-hole for network-wide ad blocking, and
          continue moving new projects onto the server as I build them.
        </p>
      </section>
    </>
  );
}