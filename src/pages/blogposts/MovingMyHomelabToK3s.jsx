export default function MovingMyHomelabToK3s() {
  return (
    <>
      <section>
        <h2>Why</h2>
        <p>
          Pretty much everything I host, from my portfolio and chess site to a quiz app and a booking system 
          prototype for Velferdstinget, was running as Docker Compose stacks in a single VM on one Proxmox host. 
          If that machine went down, everything went with it. I wanted to spread things across multiple machines 
          and make the setup more resilient without turning my homelab into a second job.
        </p>
      </section>

      <section>
        <h2>Two always on machines isn't High Availability</h2>
        <p>
          I have three Proxmox nodes, Zoro and Sanji which are always on, and Luffy which is my game server PC and way too
          loud to leave running, so I only turn it on when needed. My first plan was three K3s control plane
          nodes, but etcd needs a majority to be up, and with Luffy off most of the time two control plane nodes on
          two machines would actually be worse than one, since losing either of them kills the cluster.
        </p>
        <p>
          So I ended up with one K3s server in a VM on Zoro and one agent in a VM on Sanji. If Sanji dies everything
          just keeps running on Zoro, if Zoro dies the apps on Sanji keep serving but nothing gets rescheduled until I
          restore the server VM, which is why it gets backed up every night to a disk in Sanji.
        </p>
      </section>

      <section>
        <h2>Setting it up</h2>
        <p>
          Most of the time actually went to prep, updating Sanji which was 209 packages behind, wiping the old NTFS
          drive in it and sharing it over NFS so Zoro's backups end up on a different machine, and finding out my
          Pi-hole was only still used by one container. The VMs are clones of an Ubuntu cloud-init template with
          static IPs, and installing K3s itself was two commands:
        </p>
        <pre>
          <code>{`# server
curl -sfL https://get.k3s.io | sudo sh -s - server --cluster-init --node-ip <server-ip>

# agent
curl -sfL https://get.k3s.io | sudo K3S_URL=https://<server-ip>:6443 K3S_TOKEN='<token>' sh -s - agent`}</code>
        </pre>
      </section>

      <section>
        <h2>Cloudflare Tunnel and the first app</h2>
        <p>
          I already use Cloudflare Tunnel for everything public, but I couldn't just reuse the same tunnel in K3s,
          because Cloudflare spreads traffic across all connectors on a tunnel and the Docker one can't reach
          Kubernetes services and the other way around. So K3s got its own tunnel, with cloudflared running on both
          nodes, and I move sites over one hostname at a time.
        </p>
        <p>
          The first app was my chess site since it's already on GHCR and has no data. It runs as two copies, one on
          each node, and each node's cloudflared only sends traffic to the copy on the same node, so if a whole
          machine dies its connector dies with it and Cloudflare just uses the other one. The other apps were only
          ever built on the Docker VM, so I also added the same GitHub Actions workflow to every repo to build and
          push their images to GHCR.
        </p>
      </section>

      <section>
        <h2>Next steps</h2>
        <p>
          Next up is moving the remaining stateless apps, followed by the ones that use PostgreSQL 
          and need proper persistent storage and backups. The booking system will be last since it 
          already has people testing it. I want to use that migration as an opportunity to learn how 
          to move a database-backed application properly, closer to how you'd approach it in a 
          roduction environment.
        </p>
      </section>
    </>
  );
}