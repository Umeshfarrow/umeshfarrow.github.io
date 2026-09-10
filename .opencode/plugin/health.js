// Project health plugin for the portfolio (Umesh S).
// Auto-discovered by opencode from .opencode/plugin/.
// Logs a one-line health snapshot at session start so the server log shows
// branch, short SHA, and whether node_modules + dist are present.
//
// Deliberately plain JS with no imports, and only the documented callback
// hooks — no custom tools — so it cannot break opencode startup.

let reported = false;

/**
 * @param {{ $: Function }} input
 */
export default async function projectHealth({ $ }) {
  return {
    async event(event) {
      if (reported) return;
      if (event?.type !== "session.initialized") return;
      reported = true;

      const run = async (cmd) => {
        try {
          const res = await $(cmd);
          return String(res?.stdout ?? "").trim();
        } catch {
          return "n/a";
        }
      };

      const [branch, sha, nodeModules, dist] = await Promise.all([
        run("git branch --show-current"),
        run("git rev-parse --short HEAD"),
        run("test -d node_modules && echo yes || echo no"),
        run("test -d dist && echo yes || echo no"),
      ]);

      console.log(
        `[project-health] branch=${branch} sha=${sha} node_modules=${nodeModules} dist=${dist}`
      );
    },
  };
}