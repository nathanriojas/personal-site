// Shared copy for the concept sites' "demo only" interception.
//
// The four sample sites are deliberately realistic and clickable, but they
// represent businesses and people who do not exist. Any control that would
// perform a real-world action on their behalf (place a call, open Mail, get
// directions, submit a quote) is intercepted and shows one of these notices
// instead of leaving the page or launching a device app.
//
// Real navigation inside the demo — section anchors, the brand/logo, "Back to
// examples", and links to /websites — is NOT intercepted and behaves normally.

export const conceptDemo = {
  /** Default notice for an intercepted fictional action. */
  notice: "Demo only. This action is disabled in the sample site.",
  /** Used where the control is a form submission rather than a link. */
  formNotice: "Demo only. This form isn't connected to a real business.",
  /**
   * Appended to each intercepted control's accessible name so screen-reader
   * users learn it's a demo before activating it, rather than only after.
   */
  ariaSuffix: "(demo only, no action)",
} as const
