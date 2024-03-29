import "./Filter.scss";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../booking-calendar/BookingCalendar.scss";
import TuneIcon from "@mui/icons-material/Tune";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

interface FilterProps {
  onFilterChange: (filterData: string) => void;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };
type Anchor = "top" | "left" | "bottom" | "right";

const Filter: React.FC<FilterProps> = ({ onFilterChange }: FilterProps) => {
  // State variables for AC checkboxes
  const [isACAllChecked, setIsACAllChecked] = useState(false);
  const [isACChecked, setIsACChecked] = useState(false);
  const [isNonACChecked, setIsNonACChecked] = useState(false);

  // State variables for Sleeper checkboxes
  const [isSleeperAllChecked, setIsSleeperAllChecked] = useState(false);
  const [isSleeperChecked, setIsSleeperChecked] = useState(false);
  const [isSemiSleeperChecked, setIsSemiSleeperChecked] = useState(false);
  const [isNonSleeperChecked, setIsNonSleeperChecked] = useState(false);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // Function to handle AC "All" checkbox change
  const handleACAllChange = () => {
    setIsACAllChecked(!isACAllChecked);
    setIsACChecked(!isACAllChecked);
    setIsNonACChecked(!isACAllChecked);
  };

  // Function to handle Sleeper "All" checkbox change
  const handleSleeperAllChange = () => {
    setIsSleeperAllChecked(!isSleeperAllChecked);
    // setIsSleeperChecked(!isSleeperAllChecked);
    setIsSemiSleeperChecked(!isSleeperAllChecked);
    setIsNonSleeperChecked(!isSleeperAllChecked);
  };
  // Function to handle AC checkbox change
  const handleACChange = () => {
    setIsACChecked((prev) => !prev);
    if (isNonACChecked && !isACChecked) {
      setIsACAllChecked(true);
    } else {
      setIsACAllChecked(false);
    }
  };

  // Function to handle Non-AC checkbox change
  const handleNonACChange = () => {
    setIsNonACChecked((prev) => !prev);
    if (isACChecked && !isNonACChecked) {
      setIsACAllChecked(true);
    } else {
      setIsACAllChecked(false);
    }
  };

  // Function to handle Sleeper checkbox change
  const handleSleeperChange = () => {
    setIsSleeperChecked((prev) => !prev);
    // Check if all individual checkboxes are selected
    if (!isSleeperChecked && isSemiSleeperChecked && isNonSleeperChecked) {
      setIsSleeperAllChecked(true);
    } else {
      setIsSleeperAllChecked(false);
    }
  };

  // Function to handle Semi-Sleeper checkbox change
  const handleSemiSleeperChange = () => {
    setIsSemiSleeperChecked((prev) => !prev);
    // Check if all individual checkboxes are selected
    if (isSleeperChecked && !isSemiSleeperChecked && isNonSleeperChecked) {
      setIsSleeperAllChecked(true);
    } else {
      setIsSleeperAllChecked(false);
    }
  };

  // Function to handle Non-Sleeper checkbox change
  const handleNonSleeperChange = () => {
    setIsNonSleeperChecked((prev) => !prev);
    // Check if all individual checkboxes are selected
    if (isSleeperChecked && isSemiSleeperChecked && !isNonSleeperChecked) {
      setIsSleeperAllChecked(true);
    } else {
      setIsSleeperAllChecked(false);
    }
  };

  const updateFilter = async () => {
    // Collect selected options for AC
    const acOptions = [];
    if (isACChecked) {
      acOptions.push("AC");
    }
    if (isNonACChecked) {
      acOptions.push("NA");
    }
    if (!isACChecked && !isNonACChecked) {
      acOptions.push("ALL");
    }

    // Collect selected options for Sleeper
    const sleeperOptions = [];
    if (isSleeperChecked) {
      sleeperOptions.push("FS");
    }
    if (isSemiSleeperChecked) {
      sleeperOptions.push("SS");
    }
    if (isNonSleeperChecked) {
      sleeperOptions.push("NS");
    }
    if (!isSleeperChecked && !isSemiSleeperChecked && !isNonSleeperChecked) {
      sleeperOptions.push("ALL");
    }

    // Create a string with '/' between AC and Sleeper options
    const filter =
      acOptions.join(",") +
      (acOptions.length > 0 && sleeperOptions.length > 0 ? "/" : "") +
      sleeperOptions.join(",");
    console.log("filter:", filter);
    onFilterChange(filter);
  };
  useEffect(() => {
    updateFilter();
    if (isFilterVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [
    isACChecked,
    isNonACChecked,
    isSleeperChecked,
    isSemiSleeperChecked,
    isNonSleeperChecked,
    isFilterVisible,
  ]);

  // Function to Clear Filter
  const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNonACChecked(false);
    setIsACChecked(false);
    setIsACAllChecked(false);
    setIsSleeperAllChecked(false);
    setIsSleeperChecked(false);
    setIsSemiSleeperChecked(false);
    setIsNonSleeperChecked(false);
  };
  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleSelectedOptionClick = (option: string) => {
    // Deselect the corresponding checkbox
    if (option === "ALL_AC") {
      setIsACAllChecked(false);
      setIsACChecked(false);
      setIsNonACChecked(false);
    } else if (option === "AC") {
      setIsACChecked(false);
      setIsACAllChecked(false);
    } else if (option === "NA") {
      setIsNonACChecked(false);
      setIsACAllChecked(false);
    } else if (option === "ALL_Sleeper") {
      setIsSleeperAllChecked(false);
      setIsSleeperChecked(false);
      setIsSemiSleeperChecked(false);
      setIsNonSleeperChecked(false);
    } else if (option === "FS") {
      setIsSleeperChecked(false);
      setIsSleeperAllChecked(false);
    } else if (option === "SS") {
      setIsSemiSleeperChecked(false);
      setIsSleeperAllChecked(false);
    } else if (option === "NS") {
      setIsNonSleeperChecked(false);
      setIsSleeperAllChecked(false);
    }

    if (
      (isACChecked || isNonACChecked || isACAllChecked) &&
      (isSleeperChecked ||
        isSemiSleeperChecked ||
        isNonSleeperChecked ||
        isSleeperAllChecked)
    ) {
      setIsFilterVisible(true);
    } else {
      setIsFilterVisible(false);
    }
  };
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 220 }}
      role="presentation"
    >
      <List>
        <div className="filter_container_section">
          <div className="filter_container_section_heading">
            <span>
              FILTERS&nbsp;&nbsp;
              <TuneIcon sx={{ fontSize: 18 }} />
            </span>
            <span onClick={toggleDrawer(anchor, false)}>
              <i className="fa-solid fa-xmark" style={{ color: "#0f7bab" }}></i>
            </span>
          </div>
          <form>
            <div className="form_content">
              {/* AC Filter */}
              <div className="form_content_ac_section">
                <p>AC Type</p>
                <>
                  <div className="form_content_ac_section_checkbox">
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="allCheckbox"
                        className="input-all"
                        checked={isACAllChecked}
                        onChange={handleACAllChange}
                      />
                      <label className="label-all" htmlFor="allCheckbox">
                        &nbsp;&nbsp;All
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="acCheckbox"
                        className="input-ac"
                        checked={isACChecked}
                        onChange={handleACChange}
                      />
                      <label className="label-ac" htmlFor="acCheckbox">
                        &nbsp;&nbsp;AC
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="nonACCheckbox"
                        className="input-non-ac"
                        checked={isNonACChecked}
                        onChange={handleNonACChange}
                      />
                      <label className="label-non-ac" htmlFor="nonACCheckbox">
                        &nbsp;&nbsp;Non-AC
                      </label>
                    </div>
                  </div>
                </>
              </div>
              {/* Sleeper Filter */}
              <div className="form_content_sleeper_section">
                <p>Sleeper Type</p>
                <>
                  <div className="form_content_sleeper_section_checkbox">
                    <div className="checkbox">
                      {" "}
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="allCheckboxsleeper"
                        className="input-all"
                        checked={isSleeperAllChecked}
                        onChange={handleSleeperAllChange}
                      />
                      <label className="label-all" htmlFor="allCheckboxsleeper">
                        &nbsp;&nbsp;All
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        className="input-sleeper"
                        id="sleeperCheckbox"
                        checked={isSleeperChecked}
                        onChange={handleSleeperChange}
                        disabled
                      />
                      <label
                        className="label-sleeper"
                        htmlFor="sleeperCheckbox"
                        style={{ color: "gray" }}
                      >
                        &nbsp;&nbsp;Sleeper{" "}
                        <span style={{ fontSize: "12px" }}>(Coming soon)</span>
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        className="input-semi-sleeper"
                        id="semiSleeperCheckbox"
                        checked={isSemiSleeperChecked}
                        onChange={handleSemiSleeperChange}
                      />
                      <label
                        className="label-semi-sleeper"
                        htmlFor="semiSleeperCheckbox"
                      >
                        &nbsp;&nbsp;Semi-Sleeper
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        className="input-non-sleeper"
                        id="nonSleeperCheckbox"
                        checked={isNonSleeperChecked}
                        onChange={handleNonSleeperChange}
                      />
                      <label
                        className="label-non-sleeper"
                        htmlFor="nonSleeperCheckbox"
                      >
                        &nbsp;&nbsp;Seater{" "}
                      </label>
                    </div>
                  </div>
                </>
              </div>
              <div className="selected-options">
                {isACAllChecked && (
                  <div className="selected-option">
                    AC:ALL &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("ALL_AC")}
                    ></i>
                  </div>
                )}
                {!isACAllChecked && isACChecked && (
                  <div className="selected-option">
                    AC &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("AC")}
                    ></i>
                  </div>
                )}
                {!isACAllChecked && isNonACChecked && (
                  <div className="selected-option">
                    Non-AC &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("NA")}
                    ></i>
                  </div>
                )}
                {isSleeperAllChecked && (
                  <div className="selected-option">
                    Sleeper:ALL &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("ALL_Sleeper")}
                    ></i>
                  </div>
                )}
                {!isSleeperAllChecked && isSleeperChecked && (
                  <div className="selected-option">
                    Sleeper &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("FS")}
                    ></i>
                  </div>
                )}
                {!isSleeperAllChecked && isSemiSleeperChecked && (
                  <div className="selected-option">
                    Semi-Sleeper &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("SS")}
                    ></i>
                  </div>
                )}
                {!isSleeperAllChecked && isNonSleeperChecked && (
                  <div className="selected-option">
                    Seater &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("NS")}
                    ></i>
                  </div>
                )}
              </div>
              {/* Close Button */}
              <div className="clear_button_section">
                <button className="button-clear" onClick={handleClearFilters}>
                  CLEAR ALL
                </button>
              </div>
            </div>
          </form>
        </div>
      </List>
    </Box>
  );
  return (
    <>
      <div className="toggle_filter_button">
        <div>
          {(["right"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                Filter &nbsp;
                <TuneIcon sx={{ fontSize: 18 }} />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        className="filter_container"
        id="FilterModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
      >
        <div className="filter_container_section">
          <div className="filter_container_section_heading">
            <span>
              FILTERS&nbsp;&nbsp;
              <TuneIcon sx={{ fontSize: 18 }} />
            </span>
            <span onClick={handleToggleFilter}>
              <i className="fa-solid fa-xmark" style={{ color: "#0f7bab" }}></i>
            </span>
          </div>
          <form>
            <div className="form_content">
              {/* AC Filter */}
              <div className="form_content_ac_section">
                <p>AC Type</p>
                <>
                  <div className="form_content_ac_section_checkbox">
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="allCheckbox"
                        className="input-all"
                        checked={isACAllChecked}
                        onChange={handleACAllChange}
                      />
                      <label className="label-all" htmlFor="allCheckbox">
                        &nbsp;&nbsp;All
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="acCheckbox"
                        className="input-ac"
                        checked={isACChecked}
                        onChange={handleACChange}
                      />
                      <label className="label-ac" htmlFor="acCheckbox">
                        &nbsp;&nbsp;AC
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="nonACCheckbox"
                        className="input-non-ac"
                        checked={isNonACChecked}
                        onChange={handleNonACChange}
                      />
                      <label className="label-non-ac" htmlFor="nonACCheckbox">
                        &nbsp;&nbsp;Non-AC
                      </label>
                    </div>
                  </div>
                </>
              </div>
              {/* Sleeper Filter */}
              <div className="form_content_sleeper_section">
                <p>Sleeper Type</p>
                <>
                  <div className="form_content_sleeper_section_checkbox">
                    <div className="checkbox">
                      {" "}
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        id="allCheckboxsleeper"
                        className="input-all"
                        checked={isSleeperAllChecked}
                        onChange={handleSleeperAllChange}
                      />
                      <label className="label-all" htmlFor="allCheckboxsleeper">
                        &nbsp;&nbsp;All
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        className="input-sleeper"
                        id="sleeperCheckbox"
                        checked={isSleeperChecked}
                        onChange={handleSleeperChange}
                        disabled
                      />
                      <label
                        className="label-sleeper"
                        htmlFor="sleeperCheckbox"
                        style={{ color: "gray" }}
                      >
                        &nbsp;&nbsp;Sleeper{" "}
                        <span style={{ fontSize: "12px" }}>(Coming soon)</span>
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        className="input-semi-sleeper"
                        id="semiSleeperCheckbox"
                        checked={isSemiSleeperChecked}
                        onChange={handleSemiSleeperChange}
                      />
                      <label
                        className="label-semi-sleeper"
                        htmlFor="semiSleeperCheckbox"
                      >
                        &nbsp;&nbsp;Semi-Sleeper
                      </label>
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        {...label}
                        sx={{
                          color: "#0f2454",
                          "&.Mui-checked": {
                            color: "#0f7bab",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                          },
                        }}
                        className="input-non-sleeper"
                        id="nonSleeperCheckbox"
                        checked={isNonSleeperChecked}
                        onChange={handleNonSleeperChange}
                      />
                      <label
                        className="label-non-sleeper"
                        htmlFor="nonSleeperCheckbox"
                      >
                        &nbsp;&nbsp;Seater{" "}
                      </label>
                    </div>
                  </div>
                </>
              </div>
              <div className="selected-options">
                {isACAllChecked && (
                  <div className="selected-option">
                    AC:ALL &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("ALL_AC")}
                    ></i>
                  </div>
                )}
                {!isACAllChecked && isACChecked && (
                  <div className="selected-option">
                    AC &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("AC")}
                    ></i>
                  </div>
                )}
                {!isACAllChecked && isNonACChecked && (
                  <div className="selected-option">
                    Non-AC &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("NA")}
                    ></i>
                  </div>
                )}
                {isSleeperAllChecked && (
                  <div className="selected-option">
                    Sleeper:ALL &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("ALL_Sleeper")}
                    ></i>
                  </div>
                )}
                {!isSleeperAllChecked && isSleeperChecked && (
                  <div className="selected-option">
                    Sleeper &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("FS")}
                    ></i>
                  </div>
                )}
                {!isSleeperAllChecked && isSemiSleeperChecked && (
                  <div className="selected-option">
                    Semi-Sleeper &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("SS")}
                    ></i>
                  </div>
                )}
                {!isSleeperAllChecked && isNonSleeperChecked && (
                  <div className="selected-option">
                    Seater &nbsp;
                    <i
                      className="fa-solid fa-xmark fa-sm"
                      onClick={() => handleSelectedOptionClick("NS")}
                    ></i>
                  </div>
                )}
              </div>
              {/* Close Button */}
              <div className="clear_button_section">
                <button className="button-clear" onClick={handleClearFilters}>
                  CLEAR ALL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Filter;
