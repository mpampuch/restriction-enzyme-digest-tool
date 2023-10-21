import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DnaInputTabLayout from "./DnaInputTabLayout";
import EnzymeSelectionTabLayout from "./EnzymeSelectionTabLayout";
import ExtraParametersTabLayout from "./ExtraParametersTabLayout";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="">
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          className="flex justify-between"
        >
          <Tab label="DNA Input" {...a11yProps(0)} />
          <Tab label="Enzyme Selection" {...a11yProps(1)} />
          <Tab label="Extra Parmeters" {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <DnaInputTabLayout />
          {/* // TODO, MOVE THE DNA INPUT CODE TO ./DnaInputTabLayout.jsx */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <EnzymeSelectionTabLayout />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ExtraParametersTabLayout />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
