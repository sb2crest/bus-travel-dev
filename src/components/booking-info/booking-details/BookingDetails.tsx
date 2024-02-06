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
  };
}

interface BookingDetailsProps {
  bookingDetails: IBookingList;
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
      case "Upcoming Bookings":
        return bookedList;
      case "Completed Bookings":
        return completedList;
      case "Enquired Details":
        return enquiryList;
      case "Declined Bookings":
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
    console.log("Selected Booking Details:", selectedBookingDetails);
  };

  const handleClose = () => {
    setEyeopen(false);
  };
  function Row(props: {
    row: ReturnType<typeof createData>;
    onEyeIconClick: (row: any) => void;
  }) {
    const { row, onEyeIconClick } = props;

    return (
      <React.Fragment>
        <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <StyledTableCell
            component="th"
            scope="row"
            align="center"
            sx={{ color: "#0f7bab", cursor: "pointer" }}
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
            sx={{ color: getStatusColor(row.bookingStatus), fontWeight: "600" }}
          >
            {row.bookingStatus}
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
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
  return (
    <div className="booking-details-main">
      <div className="booking_details_container">
        <div className="booking_details_container_header">
          <h1>Booking Details</h1>
          <Grid container spacing={1}>
            <Grid item xs={2.5}>
              <Item>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <nav aria-label="main mailbox folders">
                    <List>
                      <ListItem>
                        <ListItemButton>
                          <AccountCircleIcon sx={{ color: "#255f85" }} />
                          &nbsp;&nbsp;
                          <ListItemText
                            primary={`ID: ${enquiryList[0]?.user?.mobile}`}
                            sx={{ color: "#0f2454", fontSize: "4px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemButton onClick={() => handleTabChange("All")}>
                          {" "}
                          <ListItemIcon>
                            <ChecklistIcon sx={{ color: "#255f85" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="All"
                            sx={{ color: "#0f2454", fontSize: "10px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemButton
                          onClick={() => handleTabChange("Upcoming Bookings")}
                        >
                          <ListItemIcon>
                            <AddAlarmIcon sx={{ color: "#2cccfe" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Upcoming Bookings"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemButton
                          onClick={() => handleTabChange("Completed Bookings")}
                        >
                          <ListItemIcon>
                            <CheckCircleOutlineIcon sx={{ color: "#00e300" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Completed Bookings"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemButton
                          onClick={() => handleTabChange("Enquired Details")}
                        >
                          <ListItemIcon>
                            <DraftsIcon sx={{ color: "#f9d800" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Enquired Details"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemButton
                          onClick={() => handleTabChange("Declined Bookings")}
                        >
                          <ListItemIcon>
                            <BlockIcon sx={{ color: "#ff2904" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Declined Bookings"
                            sx={{ color: "#0f2454", fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={9.5}>
              <TableContainer>
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
            <DialogTitle
              sx={{ m: 0, p: 2, color: "#0f7bab", fontWeight: "600" }}
              id="customized-dialog-title"
            >
              Additional Details
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <div className="more_container">
                <div className="more_left_container">
                  <div className="heading">
                    <p>User Name :</p>
                    <p>Booking ID :</p>
                    <p>Booking Date :</p>
                    <p>From Date :</p>
                    <p>To Date :</p>
                  </div>
                  {selectedBookingDetails && (
                    <div className="values">
                      <p>
                        {" "}
                        {`${selectedBookingDetails?.firstName} ${selectedBookingDetails?.lastName}`}
                      </p>
                      <p> {selectedBookingDetails?.bookingId}</p>
                      <p> &nbsp;{selectedBookingDetails?.bookingDate}</p>
                      <p> {selectedBookingDetails?.fromDate}</p>
                      <p> {selectedBookingDetails?.toDate}</p>
                    </div>
                  )}
                </div>
                <div className="more_right_container">
                  <div className="heading">
                    <p>Vehilcle Type :</p>
                    <p>Status :</p>
                    <p>Advance Paid :</p>
                    <p>Remaining Amount :</p>
                    <p>Total Amount :</p>
                  </div>
                  {selectedBookingDetails && (
                    <div className="values">
                      <p>{`${selectedBookingDetails?.vehicleAC} / ${selectedBookingDetails?.sleeper}`}</p>
                      <p> {selectedBookingDetails?.bookingStatus}</p>
                      <p>{selectedBookingDetails?.advancedPaid || "-"}</p>
                      <p>&nbsp;&nbsp;{selectedBookingDetails?.remainingAmt || "-"}</p>
                      <p>{selectedBookingDetails?.totalAmt || "-"}</p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Done
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
};
export default BookingDetails;
