import {
  FaHome,
  FaFileAlt,
  FaUsers,
  FaClipboardList,
  FaBoxOpen,
  FaChartBar,
  FaUserShield,
  FaCalculator,
  FaFileUpload,
  FaUserCog,
  FaDropbox,
} from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { GiBoxUnpacking } from "react-icons/gi";
import { PiHeadsetFill } from "react-icons/pi";
import { RiShieldUserFill } from "react-icons/ri";

export const iconMapper = {
  Home: <FaHome />,
  Settings: <IoMdSettings />,
  "Sales Rep": <FaUserShield />,
  Proposal: <FaClipboardList />,
  Application: <GiBookshelf />,
  Inventory: <FaBoxOpen />,
  BTS: <FaClipboardList />,
};

export const subIconMapper = {
  "Account Consolidation": <FaChartBar />,
  "BI Customers": <FaChartBar />,
  "Create/Edit Sales Rep": <FaUsers />,
  "Estimated Arrival Report": <FaChartBar />,
  "Fiscal Year": <FaChartBar />,
  "Margin Calculator": <FaCalculator />,
  "Sales File Upload": <FaFileUpload />,
  "Unique Customer Report": <FaChartBar />,
  "Upload ETA File": <FaFileUpload />,
  "Manage User Profile": <FaUserCog />,
  Customers: <FaUsers />,
  "Product Group": <AiFillProduct />,
  "Terms And Conditions": <IoDocumentAttachOutline />,
  Product: <FaDropbox />,
  Offers: <BiSolidOffer />,
  Service: <PiHeadsetFill />,
  "Alternate Product": <GiBoxUnpacking />,
  "Access and Privilege": <RiShieldUserFill />,
  "Create Proposal": <FaFileAlt />,
  "Restore Proposal": <FaFileAlt />,
  "View/Edit Proposal": <FaFileAlt />,
  "Payment Reminder": <FaFileAlt />,
  "Min Max Maintenance Report": <FaFileAlt />,
  "Min Max Settings": <FaFileAlt />,
  "Create BTS Proposal": <FaFileAlt />,
  "Upload BTS Price File": <FaFileUpload />,
};
