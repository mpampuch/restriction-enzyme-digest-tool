import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="mt-auto">
      <Box>
        <CustomTabPanel value={value} index={0}>
          <h1>DNA input</h1>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Input DNA to digest"
          />

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Input DNA that you don't want to digest"
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <h1>Enzyme Selection</h1>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <h1>Extra parameters</h1>
          <Button variant="contained">Default</Button>
        </CustomTabPanel>
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
      </Box>
    </Box>
  );
}
