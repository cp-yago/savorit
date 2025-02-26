type CACHE_TAG = "users" | "recipes";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id:${id}-${tag}` as const;
}

export function getUserTag(tag: CACHE_TAG, userId: string) {
  return `user:${userId}-${tag}` as const;
}

export function getRecipeTag(tag: CACHE_TAG, recipeId: string) {
  return `recipe:${recipeId}-${tag}` as const;
}
