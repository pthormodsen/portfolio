// Copy this file and register the new component in ../BlogPost.jsx.
// Add matching metadata in ../../data/blogPosts.js using the same id.
export default function PostTemplate() {
  return (
    <>
      <section>
        <h2>Introduction</h2>
        <p>What are you building or exploring, and why?</p>
      </section>
      <section>
        <h2>What I tried</h2>
        <p>Explain the approach and the parts worth remembering.</p>
        {/* Optional image: import it at the top, then use <img src={image} alt="Describe the image" />. */}
        {/* Optional code: <pre><code>{`Your code here`}</code></pre> */}
      </section>
      <section>
        <h2>What I learned</h2>
        <p>What worked, what did not, and what would you change?</p>
      </section>
      <section>
        <h2>Next steps</h2>
        <p>Where does this go next?</p>
      </section>
    </>
  );
}
