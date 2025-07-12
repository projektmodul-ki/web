// Test script to verify R2 connection
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

async function testR2Connection() {
  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://7c463b13d4111b56b2614b66497535b2.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: "a8fcd8d4d4d2969c1d006e827104994f",
      secretAccessKey:
        "3424d94241e35631f0062601cacb51abec44f38f2fe9f5eea22b8055f4720cea",
    },
  });

  try {
    console.log("Testing R2 connection...");

    const command = new ListObjectsV2Command({
      Bucket: "artworks",
      MaxKeys: 5, // Only get first 5 items for testing
    });

    const response = await s3Client.send(command);

    console.log("Success! Found objects:", response.Contents?.length || 0);

    if (response.Contents) {
      console.log("Sample objects:");
      response.Contents.forEach((obj, index) => {
        console.log(`  ${index + 1}. ${obj.Key} (${obj.Size} bytes)`);
      });
    }

    // Test URL construction
    if (response.Contents && response.Contents.length > 0) {
      const sampleUrl = `https://7c463b13d4111b56b2614b66497535b2.r2.cloudflarestorage.com/${response.Contents[0].Key}`;
      console.log("\nSample URL:", sampleUrl);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testR2Connection();
