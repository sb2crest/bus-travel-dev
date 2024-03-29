import React, { useState } from "react";
import "./BookingDetails.scss";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import {
  Block as BlockIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  AddAlarm as AddAlarmIcon,
  Checklist as ChecklistIcon,
  Drafts as DraftsIcon,
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon,
  Note as NoteIcon,
  DirectionsBus as DirectionsBusIcon,
} from "@mui/icons-material";
import { IBookingList } from "../../../types/BookingInfo/response.type";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Create rows dynamically based on the data
function createData(booking: any) {
  const {
    bookingId,
    user,
    slots,
    bookingStatus,
    bookingDate,
    vehicle,
    remainingAmt,
    totalAmt,
    advancedPaid,
  } = booking;

  return {
    bookingId,
    firstName: user.firstName,
    lastName: user.lastName,
    fromDate: slots.fromDate,
    toDate: slots.toDate,
    bookingStatus,
    bookingDate,
    vehicleAC: vehicle.vehicleAC,
    sleeper: vehicle.sleeper,
    totalAmt,
    advancedPaid,
    remainingAmt,
    mobile: user.mobile,
    email: user.email,
    seatCapacity: vehicle.seatCapacity,
    driverNumber: vehicle.driverNumber,
  };
}

interface BookingDetailsProps {
  bookingDetails: IBookingList;
}

function getStatusColor(bookingStatus: string) {
  switch (bookingStatus) {
    case "Booked":
      return "#2cccfe";
    case "Completed":
      return "#00e300";
    case "Enquiry":
      return "#f9d800";
    case "Declined":
      return "#ff2904";
    default:
      return "#000000";
  }
}

//Getting booking details from props
const BookingDetails: React.FC<BookingDetailsProps> = ({ bookingDetails }) => {
  const bookedList = Array.isArray(bookingDetails.bookedList)
    ? bookingDetails.bookedList
    : [];
  const enquiryList = Array.isArray(bookingDetails.enquiryList)
    ? bookingDetails.enquiryList
    : [];
  const completedList = Array.isArray(bookingDetails.completedList)
    ? bookingDetails.completedList
    : [];
  const declineList = Array.isArray(bookingDetails.declineList)
    ? bookingDetails.declineList
    : [];

  const [eyeopen, setEyeopen] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedBookingDetails, setSelectedBookingDetails] =
    useState<any>(null);

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  function getListToShow() {
    switch (selectedTab) {
      case "Upcoming":
        return bookedList;
      case "Completed":
        return completedList;
      case "Enquired":
        return enquiryList;
      case "Declined":
        return declineList;
      default:
        return [
          ...bookedList,
          ...completedList,
          ...enquiryList,
          ...declineList,
        ];
    }
  }

  const handleClickOpen = (booking: any) => {
    setSelectedBookingDetails(booking);
    setEyeopen(true);
  };

  const handleClose = () => {
    setEyeopen(false);
  };
  function Row(props: {
    row: ReturnType<typeof createData>;
    onEyeIconClick: (row: any) => void;
  }) {
    const { row, onEyeIconClick } = props;
    const statusColor = getStatusColor(row.bookingStatus);

    return (
      <React.Fragment>
        <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <StyledTableCell
            component="th"
            scope="row"
            align="center"
            sx={{ color: statusColor, cursor: "pointer" }}
          >
            <Button
              onClick={() => onEyeIconClick(row)}
              sx={{ textDecoration: "underline" }}
            >
              {row.bookingId}
            </Button>
          </StyledTableCell>
          <StyledTableCell align="center">{row.firstName}</StyledTableCell>
          <StyledTableCell align="center">{row.fromDate}</StyledTableCell>
          <StyledTableCell align="center">{row.toDate}</StyledTableCell>
          <StyledTableCell
            align="center"
            sx={{ color: statusColor, fontWeight: "600" }}
          >
            {row.bookingStatus}
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }

  return (
    <div className="booking-details-main">
      <div className="booking_details_container">
        <div className="booking_details_container_header">
          <h1>Booking Details</h1>
          <Grid container spacing={1} className="grid_container">
            <Grid item xs={2.5} className="grid_left">
              <Item>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                  className="box-container"
                >
                  <nav aria-label="main mailbox folders">
                    <List className="nav_items">
                      <ListItem className="first-row item1">
                        <ListItemButton className="list-item">
                          <AccountCircleIcon sx={{ color: "#255f85" }} className="icon"/>
                          &nbsp;&nbsp;
                          <ListItemText
                            primary={`ID: ${enquiryList[0]?.user?.mobile}`}
                            sx={{ color: "#0f2454", fontSize: "4px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem className="second-row">
                        <ListItemButton
                          onClick={() => handleTabChange("All")}
                          className="list-item-button"
                        >
                          {" "}
                          <ListItemIcon className="iconContainer">
                            <ChecklistIcon
                              sx={{ color: "#255f85" }}
                              className="icon"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="All"
                            sx={{ color: "#0f2454", fontSize: "10px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem className="second-row">
                        <ListItemButton
                          onClick={() => handleTabChange("Upcoming")}
                          className="list-item-button"
                        >
                          <ListItemIcon className="iconContainer">
                            <AddAlarmIcon
                              sx={{ color: "#2cccfe" }}
                              className="icon"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Upcoming"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem className="second-row">
                        <ListItemButton
                          onClick={() => handleTabChange("Completed")}
                          className="list-item-button"
                        >
                          <ListItemIcon className="iconContainer">
                            <CheckCircleOutlineIcon
                              sx={{ color: "#00e300" }}
                              className="icon"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Completed"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem className="second-row">
                        <ListItemButton
                          onClick={() => handleTabChange("Enquired")}
                          className="list-item-button"
                        >
                          <ListItemIcon className="iconContainer">
                            <DraftsIcon
                              sx={{ color: "#f9d800" }}
                              className="icon"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Enquired"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem className="second-row">
                        <ListItemButton
                          onClick={() => handleTabChange("Declined")}
                          className="list-item-button"
                        >
                          <ListItemIcon className="iconContainer">
                            <BlockIcon
                              sx={{ color: "#ff2904" }}
                              className="icon"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Declined"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={9.5} className="grid-right">
              <TableContainer >
                <Table aria-label="collapsible table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell
                        className="thead"
                        align="center"
                        sx={{ padding: "5rem" }}
                      >
                        Booking ID
                      </StyledTableCell>
                      <StyledTableCell className="thead" align="center">
                        User Name
                      </StyledTableCell>
                      <StyledTableCell className="thead" align="center">
                        From Date
                      </StyledTableCell>
                      <StyledTableCell className="thead" align="center">
                        To Date
                      </StyledTableCell>
                      <StyledTableCell className="thead" align="center">
                        Status
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {getListToShow().map((booking: any, index: number) => (
                      <Row
                        key={index}
                        row={createData(booking)}
                        onEyeIconClick={handleClickOpen}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={eyeopen}
          >
            <div className="bookingDetails_popup">
              {" "}
              <div className="bookingDetails_popup_container">
                <div className="bookingDetails_popup_container_section">
                  <div className="bookingDetails_popup_container_section_heading">
                    <div className="bookingDetails_popup_container_section_heading_items">
                      <div className="heading_items">
                        <p>Booking ID : </p>
                        <span style={{ color: "#0f7bab" }}>
                          {selectedBookingDetails?.bookingId}
                        </span>
                      </div>
                      <div className="heading_items">
                        <p>Status : </p>
                        <span
                          style={{
                            color: getStatusColor(
                              selectedBookingDetails?.bookingStatus
                            ),
                          }}
                        >
                          {selectedBookingDetails?.bookingStatus}
                        </span>
                      </div>

                      <CloseIcon
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          color: "gray",
                          fontSize: "18px",
                        }}
                        className="closeIcon"
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className="bookingDetails_popup_container_section_content">
                    <div className="bookingDetails_popup_container_section_content_items">
                      <div className="bookingDetails_popup_container_section_content_items_both">
                        {" "}
                        <div className="bookingDetails_popup_container_section_content_items_both_user">
                          <div className="icon">
                            <AccountCircleIcon />
                            <p>User Details</p>
                          </div>
                          <div className="details">
                            <p>
                              User name 
                              <span style={{display:"block"}}>
                                
                                {`${selectedBookingDetails?.firstName} ${selectedBookingDetails?.lastName}`}
                              </span>
                            </p>
                            <p>
                              Mobile {" "}
                              <span style={{display:"block"}}>
                               {selectedBookingDetails?.mobile}
                              </span>
                            </p>
                            <p>
                              Email {" "}
                              <span style={{display:"block"}}>
                                {selectedBookingDetails?.email || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="bookingDetails_popup_container_section_content_items_both_vehicle">
                          <div className="icon">
                            <DirectionsBusIcon />
                            <p>Vehicle Details</p>
                          </div>
                          <div className="details">
                            <p>
                              Vehicle Type {" "}
                              <span style={{display:"block"}}>
                                
                                {`${selectedBookingDetails?.vehicleAC} / ${selectedBookingDetails?.sleeper}`}
                              </span>
                            </p>
                            <p>
                              Seat Capacity {" "}
                              <span style={{display:"block"}}>
                                {selectedBookingDetails?.seatCapacity}
                              </span>
                            </p>
                            <p>
                              Driver Number {" "}
                              <span style={{display:"block"}}>
                               
                                {selectedBookingDetails?.driverNumber || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bookingDetails_popup_container_section_content_items_booking">
                        <div className="icon">
                          <NoteIcon />
                          <p>Booking Details</p>
                        </div>
                        <div className="details">
                          <div className="bookingDetails1">
                            <p>
                              Booking Date 
                              <span style={{display:"block"}}>
                               {selectedBookingDetails?.bookingDate}
                              </span>
                            </p>
                            <p>
                              From Date 
                              <span style={{display:"block"}}>
                               {selectedBookingDetails?.fromDate}
                              </span>
                            </p>
                            <p>
                              To Date 
                              <span style={{display:"block"}}>
                                {selectedBookingDetails?.toDate}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p>
                              Advance Paid 
                              <span style={{display:"block"}}>
                               
                                {selectedBookingDetails?.advancedPaid || "-"}
                              </span>
                            </p>
                            <p>
                              Remaining Amount 
                              <span style={{display:"block"}}>
                                
                                {selectedBookingDetails?.remainingAmt || "-"}
                              </span>
                            </p>
                            <p>
                              Total Amount 
                              <span style={{display:"block"}}>
                               {selectedBookingDetails?.totalAmt || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
};
export default BookingDetails;
