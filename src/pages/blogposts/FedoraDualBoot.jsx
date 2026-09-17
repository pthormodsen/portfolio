export default function FedoraDualBoot() {
  return (
    <>
      <section>
        <h2>Why I installed Fedora</h2>

        <p>
          My gaming PC has always been running Windows, which makes sense for
          gaming, but I was getting increasingly tired of using Windows for
          programming and general development work. Because of that, I often
          ended up using my Mac whenever I wanted to work on projects.
        </p>

        <p>
          Most of my development already revolves around Linux-based tools,
          Docker, SSH, and servers, and I much prefer the terminal experience
          on macOS and Linux. Eventually, I decided I wanted the same kind of
          environment on my main PC without giving up Windows completely.
        </p>

        <p>
          Instead of replacing Windows, I decided to dual boot Fedora alongside
          it. Windows could stay for gaming, while Fedora would be my
          environment for coding, working on projects, and managing my home
          lab.
        </p>
      </section>

      <section>
        <h2>Setting up the dual boot</h2>

        <p>
          I installed Fedora on a separate SSD so I could keep my existing
          Windows installation intact. When the PC starts, I can simply choose
          which operating system I want to boot into.
        </p>

        <p>
          After installing Fedora, I set up the tools I normally use for
          development, including Git, SSH, VS Code, zsh, Starship, and Kitty.
          Pretty quickly, it felt much closer to the development environment I
          actually wanted on my desktop.
        </p>

        <p>
          Having a Unix shell and using many of the same commands and tools as
          my servers also makes working with my home lab much more convenient.
        </p>
      </section>

      <section>
        <h2>Then my Ethernet broke</h2>

        <p>
          The Fedora installation itself went fairly smoothly, but shortly
          afterwards I noticed something was wrong with my network connection.
        </p>

        <p>
          My PC has a Realtek RTL8125 2.5 Gb Ethernet controller. Instead of
          maintaining a stable gigabit connection, the link would sometimes
          drop to 100 Mbps and eventually even negotiate at 10 Mbps or even fully disconnect.
        </p>

        <p>
          At first, I was not sure whether the problem was Fedora, my Ethernet
          cable, the switch, or the network card itself. I started checking the
          connection with tools like <code>ethtool</code> and looking through
          system logs with <code>journalctl</code>.
        </p>

        <pre>
          <code>{`ethtool <interface>

journalctl -k | grep -i link`}</code>
        </pre>

        <p>
          Fedora was using the <code>r8169</code> kernel driver for the network
          card. I tried changing Ethernet settings and disabling features such
          as Energy Efficient Ethernet, but the connection continued to
          downshift.
        </p>
      </section>

      <section>
        <h2>Trying to find the problem</h2>

        <p>
          Before replacing the driver, I tried a few other things to rule out
          possible causes.
        </p>

        <p>
          One of those was booting Fedora with older kernel versions to see if
          the issue had been introduced by a newer kernel update. The same
          problem still happened, so that did not solve it either.
        </p>

        <p>
          After testing different settings and kernel versions without much
          success, i was pretty close to removing my whole fedora installation.
          Then i decided to try replacing the driver.
        </p>
      </section>

      <section>
        <h2>Replacing the driver</h2>

        <p>
          I eventually installed Realtek's <code>r8125</code> driver instead of
          the default <code>r8169</code> driver Fedora was using.
        </p>

        <p>
          That introduced another issue: Secure Boot prevented the manually
          installed kernel module from loading normally. After disabling Secure
          Boot and installing the new driver, Fedora started using{" "}
          <code>r8125</code> for the Ethernet controller.
        </p>

        <p>
          After that, the connection finally stayed at 1 Gbps instead of
          randomly dropping to 100 or 10 Mbps.
        </p>

        <pre>
          <code>{`driver: r8125
Speed: 1000Mb/s
Duplex: Full
Link detected: yes`}</code>
        </pre>

        <p>
          What started as a simple Fedora installation ended up turning into
          several hours of debugging a network driver.
        </p>
      </section>

      <section>
        <h2>Using Fedora for development</h2>

        <p>
          Once the network problem was fixed, there was not much stopping me
          from using Fedora as my normal development environment.
        </p>

        <p>
          I set up my terminal, Git and SSH keys, editor, and the other tools I
          use regularly. I still tweak things occasionally, but I do not want
          the setup itself to become a project.
        </p>

        <p>
          There were also a few smaller annoyances along the way. For example,
          I initially used the Flatpak version of VS Code, which made
          interaction with some host tools and shells more awkward than I
          wanted, so I later switched to the native version.
        </p>
      </section>

      <section>
        <h2>What I learned</h2>

        <p>
          The Ethernet issue ended up teaching me more about how Linux handles
          hardware than I expected when I started. I had to look into kernel
          drivers, kernel modules, link negotiation, Secure Boot, and the tools
          Linux provides for diagnosing network interfaces.
        </p>

        <p>
          It was also a good reminder that a hardware problem is not always
          actually a hardware problem. The Ethernet controller, cable, and
          switch were all capable of gigabit speeds, but the driver Fedora was
          using was causing the connection to behave incorrectly on my system.
        </p>

        <p>
          Dual booting has also worked well for what I wanted. I can keep
          Windows for games and anything that depends on it, while Fedora gives
          me a Linux environment on the same PC whenever I want to work on
          projects or manage my servers.
        </p>
      </section>

      <section>
        <h2>Whats next?</h2>

        <p>
          For now, Fedora is becoming my main development environment on the
          desktop, while Windows stays primarily for gaming.
        </p>

        <p>
          I still want to clean up some of my configuration and make it easier
          to reproduce the same development environment across Fedora, my
          MacBook, and my Linux servers.
        </p>
      </section>
    </>
  );
}