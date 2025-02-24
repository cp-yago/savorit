"use server";

import { ApifyClient } from "apify-client";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

const prepareActorInput = (url: string) => ({
  addParentData: false,
  directUrls: [url],
  enhanceUserSearchWithFacebookPage: false,
  isUserReelFeedURL: false,
  isUserTaggedFeedURL: false,
  resultsLimit: 1,
  resultsType: "posts",
  searchLimit: 1,
  searchType: "hashtag",
});

type Post = {
  caption: string;
  displayUrl: string;
  videoUrl: string;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const formatPost = (post: any): Post => {
  return {
    caption: post.caption,
    displayUrl: post.displayUrl,
    videoUrl: post.videoUrl,
  };
};

export async function getInstagramPost(url: string) {
  // Prepare Actor input
  const input = prepareActorInput(url); // Provide an example URL

  // Run the Actor and wait for it to finish
  const actorId = process.env.APIFY_ACTOR_ID;
  if (!actorId) {
    throw new Error("APIFY_ACTOR_ID is not set in the environment variables");
  }
  const run = await client.actor(actorId).call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  const post = formatPost(items[0]);
  return post;
}
