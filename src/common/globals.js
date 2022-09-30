// ----------------------------------------------------------------------------
/*
                                Global Variables
*/
// ----------------------------------------------------------------------------

// Logos for the app cards
import default_logo from "../assets/default.png";
import uqx_logo from "../assets/uqx_logo.png";
import blackboard_logo from "../assets/blackboard_logo.png";

// Homepage URL
// At the moment we add this to the relative path for the app routing extensions.
export const HOMEPAGE_URL = "https://reports.itali.uq.edu.au";

export const logos = {
  default: default_logo,
  uqx: uqx_logo,
  blackboard: blackboard_logo,
};

// Dummy app list for local development.
export const dummyAppList = {
  username: "uq-username",
  fullAppList: [
    {
      id: "4",
      title: "Digital Teaching Standards",
      description:
        "Collaborative review process for achieving digital teaching best practices in your course. ",
      routing_extension: "/dts",
      logo: "default",
    },
    {
      id: "2",
      title: "UQx Dashboard",
      description:
        "Analytics for UQx courses hosted on edX. Enrollment data from the edX Data Package and financial data from querterly statements.",
      routing_extension: "/uqx-dashboard",
      logo: "uqx",
    },
    {
      id: "3",
      title: "Early Intervention and Support Initiative",
      description:
        "Find students in your faculty who have disengaged from their course work and could benefit from an intervention.",
      routing_extension: "/eisi",
      logo: "default",
    },
    {
      id: "6",
      title: "Assessment Item Analysis",
      description:
        "Applies Item Response Theory to aide in the calibration of assessment items whithin a course. Data from Blackboard Grade Center. Initial prototype for HaBS.",
      routing_extension: "/item-analysis",
      logo: "default",
    },
    {
      id: "5",
      title: "Blackboard Participation Report",
      description:
        "Summary of Blackboard activity for a particular student in a given course. Data from Blackboard clickstream.",
      routing_extension: "/reports/participationreport",
      logo: "blackboard",
    },
  ],
  userAppList: [
    {
      id: "2",
      title: "UQx Dashboard",
      description:
        "Analytics for UQx courses hosted on edX. Enrollment data from the edX Data Package and financial data from querterly statements.",
      routing_extension: "/uqx-dashboard",
      logo: "uqx",
    },
    {
      id: "3",
      title: "Early Intervention and Support Initiative",
      description:
        "Find students in your faculty who have disengaged from their course work and could benefit from an intervention.",
      routing_extension: "/eisi",
      logo: "default",
    },
  ],
  remainingAppList: [
    {
      id: "4",
      title: "Digital Teaching Standards",
      description:
        "Collaborative review process for achieving digital teaching best practices in your course. ",
      routing_extension: "/dts",
      logo: "default",
    },
    {
      id: "6",
      title: "Assessment Item Analysis",
      description:
        "Applies Item Response Theory to aide in the calibration of assessment items whithin a course. Data from Blackboard Grade Center. Initial prototype for HaBS.",
      routing_extension: "/item-analysis",
      logo: "default",
    },
    {
      id: "5",
      title: "Blackboard Participation Report",
      description:
        "Summary of Blackboard activity for a particular student in a given course. Data from Blackboard clickstream.",
      routing_extension: "/reports/participationreport",
      logo: "blackboard",
    },
  ],
};
