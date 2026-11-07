import proxmox from "../../assets/blog/k3s/proxmox.png";
import k9s from "../../assets/blog/k3s/k9s.png";
import nodeDown from "../../assets/blog/k3s/node-down.png";

export default function MovingMyHomelabToK3s() {
  return (
    <>
      <section>
        <h2>Why</h2>
        <p>
          Pretty much everything I host, from my portfolio and chess site to a quiz app and a booking system for
          Velferdstinget, was running as Docker Compose stacks in a single VM on one Proxmox host. If that machine
          went down, everything went with it, so I spent a weekend moving it all to K3s.
        </p>
      </section>

      <section>
        <h2>Two always-on machines isn't high availability</h2>
        <p>
          I have three Proxmox nodes, but only Zoro and Sanji are always on, Luffy is my game server PC and way too
          loud to leave running. etcd needs a majority to work, so two control plane nodes on two machines would
          actually be worse than one. I went with one K3s server on Zoro and one agent on Sanji, and each machine's
          VMs get backed up every night to a disk in the other one.
        </p>
        <img
          src={proxmox}
          alt="Proxmox cluster with zoro, sanji and luffy"
          className="my-6 w-full rounded-lg border border-white/10"
        />
        <pre>
          <code>{`# server
curl -sfL https://get.k3s.io | sudo sh -s - server --cluster-init --node-ip <server-ip>

# agent
curl -sfL https://get.k3s.io | sudo K3S_URL=https://<server-ip>:6443 K3S_TOKEN='<token>' sh -s - agent`}</code>
        </pre>
      </section>

      <section>
        <h2>Moving the apps</h2>
        <p>
          K3s got its own Cloudflare Tunnel, since the old one on the Docker VM can't reach Kubernetes services, and I
          moved sites over one hostname at a time. Every app runs as two replicas, one on each node, and each node's
          cloudflared only sends traffic to its own replica, so if a machine dies its connector dies with it and
          Cloudflare just uses the other one. The apps with Postgres each got their own namespace, a Secret for the
          passwords and a database on Zoro, and the data came over with <code>pg_dump</code>.
        </p>
        <img
          src={k9s}
          alt="k9s showing every app running as two replicas across both nodes"
          className="my-6 w-full rounded-lg border border-white/10"
        />
        <p>
          A few things broke along the way. Proxmox's default CPU type hides instructions the newest NumPy needs, so
          my phishing detector crashed until I switched the VMs to <code>x86-64-v3</code>. AppArmor blocked Postgres
          from starting, one nginx config pointed at Docker's built-in DNS, and my router kept caching the few
          seconds where a hostname didn't exist while I moved it.
        </p>
      </section>

      <section>
        <h2>Pulling the plug</h2>
        <p>
          To see if it actually held up, I curled every site every five seconds and hard-stopped the VMs one at a
          time. With Sanji's node gone every site stayed up. With Zoro's node gone the stateless sites stayed up too,
          but the apps with databases went down, since the databases live there. Both times everything healed on its
          own when the VM came back.
        </p>
        <img
          src={nodeDown}
          alt="k3s-03 marked NotReady in k9s while every site still returns 200"
          className="my-6 w-full rounded-lg border border-white/10"
        />
      </section>

      <section>
        <h2>What's next</h2>
        <p>
          Everything except the booking system runs on K3s now, that one stays on Docker a bit longer since it has
          real users. Two always-on machines can only keep stateless apps alive, so the next step is a small third
          node and replicated Postgres, and getting a copy of the backups out of the house.
        </p>
      </section>
    </>
  );
}
