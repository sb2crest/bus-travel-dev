import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Nav";
import { Navitems } from "./Navitems";

describe("Navbar component", () => {
  test("renders correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    // Ensure menu items are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Booking")).toBeInTheDocument();
    expect(screen.getByText("Booking Info")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    // Ensure "Contact Us" link is rendered
    const contactUsLinks = screen.getAllByText("Contact Us");
    expect(contactUsLinks.length).toBeGreaterThan(0);
    const contactUsButtons = screen.getAllByText("Contact Us");
    expect(contactUsButtons.length).toBeGreaterThan(0);
  });

  test("renders hidecontact when button is clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const hideContactElement = screen.queryByTestId("hidecontact");
    const isHideContactInitiallyVisible = hideContactElement !== null;
    fireEvent.click(screen.getByTestId("menu-icon"));
    expect(screen.getByTestId("hidecontact")).toBeInTheDocument();
    expect(isHideContactInitiallyVisible).toBe(true);
  });

  test("handles click event properly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const menuList = screen.getByTestId("menu-list");
    expect(menuList).toHaveClass("close");
    const menuIcon = screen.getByTestId("menu-icon");
    fireEvent.click(menuIcon);
    expect(menuList).not.toHaveClass("close");
  });
  test("handleClick toggles the menu icon", () => {
    const { getByTestId } = render(
      <Router>
        <Navbar />
      </Router>
    );

    const menuIcon = getByTestId("menu-icon");
    expect(menuIcon).toBeInTheDocument();
    const iconElement = menuIcon.querySelector("i");
    expect(iconElement).toHaveClass("fa-bars");
    fireEvent.click(menuIcon);
    expect(iconElement).toHaveClass("fa-times");
    fireEvent.click(menuIcon);
    expect(iconElement).toHaveClass("fa-bars");
  });
  describe("NavLink rendering", () => {
    it("renders NavLink for defined URL", () => {
      const { container } = render(
        <Router>
          <Navbar />
        </Router>
      );
      const menuListItems = container.querySelectorAll(".menu-list li");
  
      Navitems.forEach((item, index) => {
        const menuItem = menuListItems[index];
        const navLink = menuItem.querySelector("a");
        const imgElement = menuItem.querySelector("img");
        const spanElement = menuItem.querySelector("span");
  
        if (item.url) {
          // If the URL is defined, expect NavLink to be rendered
          expect(navLink).toBeTruthy();
          expect(navLink?.getAttribute("href")).toBe(item.url);
          // Expect no span
          expect(spanElement).toBeFalsy();
          // If imgSrc is defined, expect img to be rendered
          if (item.imgSrc) {
            expect(imgElement).toBeTruthy();
            expect(imgElement?.getAttribute("src")).toBe(item.imgSrc);
          } else {
            // If imgSrc is undefined, expect no img
            expect(imgElement).toBeFalsy();
          }
        } else {
          // If the URL is undefined, expect a span to be rendered
          expect(spanElement).toBeTruthy();
          // Expect no NavLink and no img
          expect(navLink).toBeFalsy();
          expect(imgElement).toBeTruthy();
        }
      });
    });
    it("renders NavLink for defined URL", () => {
      const { container } = render(
        <Router>
          <Navbar />
        </Router>
      );
      const menuListItems = container.querySelectorAll(".menu-list li");
  
      Navitems.forEach((item, index) => {
        const menuItem = menuListItems[index];
        const navLink = menuItem.querySelector("a");
        const imgElement = menuItem.querySelector("img");
        const spanElement = menuItem.querySelector("span");
  
        if (item.url) {
          // If the URL is defined, expect NavLink to be rendered
          expect(navLink).toBeTruthy();
          expect(navLink?.getAttribute("href")).toBe(item.url);
          // Expect no span
          expect(spanElement).toBeFalsy();
          // If imgSrc is defined, expect img to be rendered
          if (item.imgSrc) {
            expect(imgElement).toBeTruthy();
            expect(imgElement?.getAttribute("src")).toBe(item.imgSrc);
          } else {
            // If imgSrc is undefined, expect no img
            expect(imgElement).toBeFalsy();
          }
        } else {
          // If the URL is undefined, expect no span
          expect(spanElement).toBeTruthy();
          // Expect no NavLink and no img
          expect(navLink).toBeFalsy();
          expect(imgElement).toBeTruthy();
        }
      });
    

  describe("Navitems array", () => {
    it("renders NavLink for defined URL", () => {
      const { container } = render(
        <Router>
          <Navbar />
        </Router>
      );
      const menuListItems = container.querySelectorAll(".menu-list li");

      Navitems.forEach((item, index) => {
        const menuItem = menuListItems[index];
        const navLink = menuItem.querySelector("a");

        if (item.url) {
          expect(navLink).toBeTruthy();
          expect(navLink?.getAttribute("href")).toBe(item.url);
        } else {
          expect(menuItem.querySelector("span")).toBeTruthy();
        }

        expect(menuItem.querySelector("img")).toBeFalsy();
      });
    });

    it("renders span for undefined URL", () => {
      const { container } = render(
        <Router>
          <Navbar />
        </Router>
      );
      const menuListItems = container.querySelectorAll(".menu-list li");

      Navitems.forEach((item, index) => {
        const menuItem = menuListItems[index];
        const spanElement = menuItem.querySelector("span");

        if (!item.url) {
          expect(spanElement).toBeTruthy();
          expect(menuItem.querySelector("a")).toBeFalsy();
          expect(menuItem.querySelector("img")).toBeTruthy();
        } else {
          expect(spanElement).toBeFalsy();
        }
      });
    });
  });
});
});
});
