"use server"

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

const formatPost = (post: any) => {
  return {
    caption: post.caption,
    displayUrl: post.displayUrl,
    videoUrl: post.videoUrl,
  }
}

export async function getInstagramPost(url: string) {
  // Prepare Actor input
  const input = prepareActorInput(url); // Provide an example URL

  // Run the Actor and wait for it to finish
  const run = await client.actor(process.env.APIFY_ACTOR_ID).call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  const post = formatPost(items[0]);
  return post;
}
