type Params = { id: string };

export default async function RecipePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id: recipeId } = await params;

  return (
    <div>
      <h1>Recipe Page</h1>
      <p>Recipe ID: {recipeId}</p>
    </div>
  );
}
