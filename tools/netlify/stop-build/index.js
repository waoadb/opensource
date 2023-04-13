/* Dependencies */
module.exports = {
  onPreBuild: async ({ utils }) => {
    // Check for env's or fail cancel build
    if (
      !process.env.DIFFERENT_BREED_ADMIN_KEY ||
      !process.env.NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY
    ) {
      utils.build.cancelBuild(
        "Build was cancelled because the environment variables are not set."
      );
    }

    // Acknowledge the build is running
    console.log("Build will proceed.");
  },
};
