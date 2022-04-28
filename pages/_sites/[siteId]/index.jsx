export default function Home(props) {
  return (
    <code>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </code>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["/_sites/0", "/_sites/1", "/_sites/2"],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: params,
  };
}
