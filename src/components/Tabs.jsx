import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import LabelledSwitch from "./LabelledSwitch";
import Switch from "@mui/material/Switch";

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
  const [showRestrictedInput, setShowRestrictedInput] = React.useState(false);

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
          <h1>DNA input</h1>
          <p>
            Inpt the DNA sequence(s) that you would like to digest. The input
            has to be in FASTA format and be less than 1Mb.
          </p>
          {/* TODO, FIX THE OVERFLOW AND ADD A SCROLL WHEN THIS GETS TOO BIG */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[250px] overflow-auto">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Input DNA to digest"
              className="text-gray-800"
            />
          </div>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
          <LabelledSwitch />
          {/* TODO, ADD THIS LOGIC TO THE LABELLED DNA INPUT THING BUT DO IT USING A GLOBAL STATE MANAGEMENT SYSTEM LIKE REDUX TO ENSURE PARENT CAN GET THE STATE */}
          <Switch
            onChange={() =>
              setShowRestrictedInput(
                (showRestrictedInput) => !showRestrictedInput,
              )
            }
          />
          <div
            className={`overflow-auto transition-all duration-500 ease-in-out ${
              showRestrictedInput ? "max-h-[450px]" : "max-h-0"
            }`}
          >
            {/* {showRestrictedInput && (
              <> */}
            <p>
              Inpt the DNA sequence(s) that you would not like to digest. If
              this is filled out, then any enzyme that performs one or more
              digestions in this DNA will be exluded from the analysis on the
              desired DNA. The input has to be in FASTA format and be less than
              1Mb.
            </p>
            <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-10 max-h-[300px] overflow-auto">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Input DNA that you don't want to digest"
                className="max-h-[250px] text-gray-800"
              />
            </div>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
            {/* </>
            )} */}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <h1>Enzyme Selection</h1>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <h1>Extra parameters</h1>
          <Button variant="contained">Default</Button>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
