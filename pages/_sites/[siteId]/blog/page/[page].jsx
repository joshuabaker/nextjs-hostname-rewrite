export default function Page(props) {
  return (
    <code>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </code>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}
