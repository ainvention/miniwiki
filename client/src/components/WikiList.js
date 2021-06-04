import WikiCard from "./WikiCard";

export default function WikiList({ wikis, loading, URL }) {
  return (
    <div>
      <div className="flex justify-start mb-10 text-2xl font-bold align-middle lg:text-5xl">
        Mini Wiki
      </div>

      {wikis?.length > 0 ? (
        wikis.map((wiki) => {
          return (
            <div className="flex" key={wiki.id}>
              <WikiCard wiki={wiki} URL={URL} />
            </div>
          );
        })
      ) : wikis ? (
        <p>You have no wikis yet</p>
      ) : loading ? (
        <p>Loading..</p>
      ) : null}
    </div>
  );
}
