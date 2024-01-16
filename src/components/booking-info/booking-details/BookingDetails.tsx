import React from "react";
import "./BookingDetails.scss";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton/IconButton";
import { Link } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// Create rows dynamically based on the data
function createData(
  bookingId: string,
  userName: string,
  fromDate: string,
  toDate: string,
  amount: number,
  bookingStatus: string,
  bookingDate: string,
  driverName: string,
  driverNumber: number,
  vehicleNumber: string,
  seatCapacity: number
) {
  return {
    bookingId,
    userName,
    fromDate,
    toDate,
    amount,
    bookingStatus,
    bookingDate,
    driverName,
    driverNumber,
    vehicleNumber,
    seatCapacity,
  };
}
interface BookingDetailsProps {
  bookingDetails: any;
  //   bookingDetails: {
  //     bookingDate: string; 
  //     bookingID: string;
  //     vehicleNumber: string;
  //     fromDate: string;
  //     toDate: string;
  //     driverName: string;
  //     driverNumber: string;
  //     alternateNumber: string;
  //   };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.bookingId}
        </StyledTableCell>
        <StyledTableCell align="center">{row.userName}</StyledTableCell>
        <StyledTableCell align="center">{row.fromDate}</StyledTableCell>
        <StyledTableCell align="center">{row.toDate}</StyledTableCell>
        <StyledTableCell align="center">{row.amount}</StyledTableCell>
        <StyledTableCell align="center">{row.bookingStatus}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                fontWeight="600"
              >
                Additional Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell className="thead">
                      Booking Date
                    </StyledTableCell>
                    <StyledTableCell className="thead">
                      Driver Name
                    </StyledTableCell>
                    <StyledTableCell align="center" className="thead">
                      Driver Number
                    </StyledTableCell>
                    <StyledTableCell align="center" className="thead">
                      Vehicle Number
                    </StyledTableCell>
                    <StyledTableCell align="center" className="thead">
                      SeatCapacity
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow key={row.bookingStatus}>
                    <StyledTableCell component="th" scope="row">
                      {row.bookingDate}
                    </StyledTableCell>
                    <StyledTableCell>{row.driverName}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.driverNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.vehicleNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.seatCapacity}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#0F7BAB" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

//Getting booking details from props
const BookingDetails: React.FC<BookingDetailsProps> = ({ bookingDetails }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  const upcoming = Array.isArray(bookingDetails.upcoming)
  ? bookingDetails.upcoming
  : [];

const history = Array.isArray(bookingDetails.history)
  ? bookingDetails.history
  : [];
  return (
    <div className="booking-details-main">
      <div className="booking-details-container">
        <div className="booking_container_banner">
          <h1>Booking Info</h1>
          <h3>Check Your Booking Details here...</h3>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>&#10095;</li>
            <li>Booking Info</li>
          </ul>
        </div>
        <div className="header">
          <h1>Booking Details</h1>
          {/* <ul className="list-group">
            {bookingDetails.enquiryAndBookedList.map((booking: any, index: number) => (
              <li
                key={index}
              >
                {booking.bookingId}
              </li>
            ))}
          </ul> */}
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography className="upcoming" fontWeight="600">
                  Upcoming Booking Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell className="thead" />
                        <StyledTableCell className="thead">
                          Booking ID
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          UserName
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          FromDate
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          ToDate
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          Amount
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          Booking Status
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {upcoming.map((booking: any, index: number) => (
                        <Row
                          key={index}
                          row={createData(
                            booking.bookingId,
                            booking.userName,
                            booking.fromDate,
                            booking.toDate,
                            booking.amount,
                            booking.bookingStatus,
                            booking.bookingDate,
                            booking.driverName,
                            booking.driverNumber,
                            booking.vehicleNumber,
                            booking.seatCapacity
                          )}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography className="past" fontWeight="600">
                  Past Booking Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell className="thead" />
                        <StyledTableCell className="thead">
                          Booking ID
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          UserName
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          FromDate
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          ToDate
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          Amount
                        </StyledTableCell>
                        <StyledTableCell className="thead" align="center">
                          Booking Status
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {history.map((booking: any, index: number) => (
                        <Row
                          key={index}
                          row={createData(
                            booking.bookingId,
                            booking.userName,
                            booking.fromDate,
                            booking.toDate,
                            booking.amount,
                            booking.bookingStatus,
                            booking.bookingDate,
                            booking.driverName,
                            booking.driverNumber,
                            booking.vehicleNumber,
                            booking.seatCapacity
                          )}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails; 