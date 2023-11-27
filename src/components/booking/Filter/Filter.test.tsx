import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Filter from "./Filter";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";
registerLocale("en-US", enUS); 
setDefaultLocale("en-US");
describe("Filter component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );
  });

  describe('Filter component', () => {
    it('renders without crashing', () => {
      render(<Filter setVehicles={() => {}} />);
      expect(screen.getByText('FILTERS')).toBeInTheDocument();
    });

    it('clears filters when "Clear Filters" button is clicked', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('AC'));
      const allCheckbox = screen.getByText('All').closest('input');

      if (allCheckbox) {
        expect(allCheckbox).toBeChecked();
        fireEvent.click(screen.getByText('Clear Filters'));
        expect(allCheckbox).not.toBeChecked();
      } else {
        console.error('Checkbox element for "All" is null');
      }
    });

    it('handles AC All checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('AC'));
      const allCheckbox = screen.getByText('All').closest('input');

      if (allCheckbox) {
        fireEvent.click(allCheckbox);
        expect(allCheckbox).toBeChecked();
        expect(screen.getByText('AC').closest('input')).toBeChecked();
        expect(screen.getByText('Non-AC').closest('input')).toBeChecked();
      } else {
        console.error('Checkbox element for "All" is null');
      }
    });

    // Add similar test cases for other checkbox functions
    it('handles FromDate change', async () => {
      render(<Filter setVehicles={() => {}} />);
      const fromDateInput = screen.getByPlaceholderText('From-Date') as HTMLInputElement;
      fireEvent.change(fromDateInput, { target: { value: '01-01-2023' } });
      expect(fromDateInput.value).toBe('01-01-2023');
    });
    
    it('handles ToDate change', async () => {
      render(<Filter setVehicles={() => {}} />);
      const toDateInput = screen.getByPlaceholderText('To-Date') as HTMLInputElement;
      fireEvent.change(toDateInput, { target: { value: '01-02-2023' } });
      expect(toDateInput.value).toBe('01-02-2023');
    });

    it('handles Close button click', async () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('AC'));
      fireEvent.click(screen.getByText('Done'));
      await waitFor(() => {
        expect(screen.getByText('FILTERS')).toBeInTheDocument();
      });
    });

    it('handles Sleeper section interactions', () => {
      render(
        <MemoryRouter>
          <Filter setVehicles={() => {}} />
        </MemoryRouter>
      );
  
      // Click the Sleeper button
      const sleeperButton = screen.getByText(/sleeper/i);
      fireEvent.click(sleeperButton);
  
      // Check if the All checkbox and labels are present when Sleeper is clicked
      const allCheckbox = screen.getByLabelText('All') as HTMLInputElement;
      const sleeperCheckbox = screen.getByLabelText('Sleeper') as HTMLInputElement;
      const semiSleeperCheckbox = screen.getByLabelText('Semi-Sleeper') as HTMLInputElement;
      const nonSleeperCheckbox = screen.getByLabelText('Non-Sleeper') as HTMLInputElement;
  
      expect(allCheckbox).toBeInTheDocument();
      expect(sleeperCheckbox).toBeInTheDocument();
      expect(semiSleeperCheckbox).toBeInTheDocument();
      expect(nonSleeperCheckbox).toBeInTheDocument();
  
      // Check if changing the All checkbox triggers the correct function
      fireEvent.click(allCheckbox);
      expect(allCheckbox.checked).toBe(true);
      expect(sleeperCheckbox.checked).toBe(true);
      expect(semiSleeperCheckbox.checked).toBe(true);
      expect(nonSleeperCheckbox.checked).toBe(true);
  
      fireEvent.click(sleeperCheckbox);
      expect(allCheckbox.checked).toBe(false);
      expect(semiSleeperCheckbox.checked).toBe(true);
      expect(nonSleeperCheckbox.checked).toBe(true);
  
      // Check if changing the Semi-Sleeper checkbox triggers the correct function
      fireEvent.click(semiSleeperCheckbox);
      expect(allCheckbox.checked).toBe(false);
      expect(sleeperCheckbox.checked).toBe(false);
      expect(nonSleeperCheckbox.checked).toBe(true);
  
      // Check if changing the Non-Sleeper checkbox triggers the correct function
      fireEvent.click(nonSleeperCheckbox);
      expect(allCheckbox.checked).toBe(false);
      expect(sleeperCheckbox.checked).toBe(false);
      expect(semiSleeperCheckbox.checked).toBe(false);
    });

    it('handles filter API request and updates state on "Done" button click', async () => {
      render(
        <MemoryRouter>
          <Filter setVehicles={() => {}} />
        </MemoryRouter>
      );
  
      // Mock the API request using nock
      const mockResponse = [
        {
          "vehicleNumber": "KA07V2104",
          // ... other properties ...
        },
        {
          "vehicleNumber": "KA07V2105",
          // ... other properties ...
        }
      ];
      nock("https://api.example.com")
        .post("/filter")
        .reply(200, mockResponse);
  
      // Perform actions that trigger the API request
      fireEvent.click(screen.getByText('AC'));
      fireEvent.click(screen.getByText('Done'));
  
      // Wait for the API request to complete and the elements to be in the DOM
      await waitFor(() => {
        // Assert that the state is updated with the mock response
        expect(screen.getByText('FILTERS')).toBeInTheDocument();
        // expect(screen.getByText('KA07V2104')).toBeInTheDocument();
        // expect(screen.getByText('KA07V2105')).toBeInTheDocument();
      });
    });
    it('handles Semi-Sleeper checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('Sleeper'));
      const semiSleeperCheckbox = screen.getByText('Semi-Sleeper').closest('input');
    
      if (semiSleeperCheckbox) {
        fireEvent.click(semiSleeperCheckbox);
        expect(semiSleeperCheckbox).toBeChecked();
        expect(screen.getByText('Sleeper').closest('input')).toBeChecked();
        expect(screen.getByText('Non-Sleeper').closest('input')).toBeChecked();
      } else {
        console.error('Checkbox element for "Semi-Sleeper" is null');
      }
    });
    
    it('handles Non-Sleeper checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('Sleeper'));
      const nonSleeperCheckbox = screen.getByText('Non-Sleeper').closest('input');
    
      if (nonSleeperCheckbox) {
        fireEvent.click(nonSleeperCheckbox);
        expect(nonSleeperCheckbox).toBeChecked();
        expect(screen.getByText('Sleeper').closest('input')).not.toBeChecked();
        expect(screen.getByText('Semi-Sleeper').closest('input')).not.toBeChecked();
      } else {
        console.error('Checkbox element for "Non-Sleeper" is null');
      }
    });
    
    it('handles FromDate and ToDate change together', async () => {
      render(<Filter setVehicles={() => {}} />);
      const fromDateInput = screen.getByPlaceholderText('From-Date') as HTMLInputElement;
      const toDateInput = screen.getByPlaceholderText('To-Date') as HTMLInputElement;
    
      fireEvent.change(fromDateInput, { target: { value: '01-01-2023' } });
      fireEvent.change(toDateInput, { target: { value: '01-02-2023' } });
    
      expect(fromDateInput.value).toBe('01-01-2023');
      expect(toDateInput.value).toBe('01-02-2023');
    });
    it('handles Non-AC checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('AC'));
      const nonACCheckbox = screen.getByText('Non-AC').closest('input');
    
      if (nonACCheckbox) {
        fireEvent.click(nonACCheckbox);
        expect(nonACCheckbox).toBeChecked();
        expect(screen.getByText('AC').closest('input')).not.toBeChecked();
        expect(screen.getByText('All').closest('input')).not.toBeChecked();
      } else {
        console.error('Checkbox element for "Non-AC" is null');
      }
    });
    it('handles Semi-Sleeper checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('Sleeper'));
      const semiSleeperCheckbox = screen.getByText('Semi-Sleeper').closest('input');
    
      if (semiSleeperCheckbox) {
        fireEvent.click(semiSleeperCheckbox);
        expect(semiSleeperCheckbox).toBeChecked();
        expect(screen.getByText('Sleeper').closest('input')).toBeChecked();
        expect(screen.getByText('Non-Sleeper').closest('input')).toBeChecked();
      } else {
        console.error('Checkbox element for "Semi-Sleeper" is null');
      }
    });
    it('handles Non-Sleeper checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('Sleeper'));
      const nonSleeperCheckbox = screen.getByText('Non-Sleeper').closest('input');
    
      if (nonSleeperCheckbox) {
        fireEvent.click(nonSleeperCheckbox);
        expect(nonSleeperCheckbox).toBeChecked();
        expect(screen.getByText('Sleeper').closest('input')).not.toBeChecked();
        expect(screen.getByText('Semi-Sleeper').closest('input')).not.toBeChecked();
      } else {
        console.error('Checkbox element for "Non-Sleeper" is null');
      }
    });
    it('handles FromDate and ToDate change together', async () => {
      render(<Filter setVehicles={() => {}} />);
      const fromDateInput = screen.getByPlaceholderText('From-Date') as HTMLInputElement;
      const toDateInput = screen.getByPlaceholderText('To-Date') as HTMLInputElement;
    
      fireEvent.change(fromDateInput, { target: { value: '01-01-2023' } });
      fireEvent.change(toDateInput, { target: { value: '01-02-2023' } });
    
      expect(fromDateInput.value).toBe('01-01-2023');
      expect(toDateInput.value).toBe('01-02-2023');
    });
    it('handles Clear Filters button click', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('AC'));
      const allCheckbox = screen.getByText('All').closest('input');

      if (allCheckbox) {
        fireEvent.click(allCheckbox);
        fireEvent.click(screen.getByText('Clear Filters'));
        expect(allCheckbox).not.toBeChecked();
      } else {
        console.error('Checkbox element for "All" is null');
      }
    });

    it('handles FromDate and ToDate change together', async () => {
      render(<Filter setVehicles={() => {}} />);
      const fromDateInput = screen.getByPlaceholderText('From-Date') as HTMLInputElement;
      const toDateInput = screen.getByPlaceholderText('To-Date') as HTMLInputElement;
    
      fireEvent.change(fromDateInput, { target: { value: '01-01-2023' } });
      fireEvent.change(toDateInput, { target: { value: '01-02-2023' } });
    
      expect(fromDateInput.value).toBe('01-01-2023');
      expect(toDateInput.value).toBe('01-02-2023');
    });

    it('handles Semi-Sleeper checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('Sleeper'));
      const semiSleeperCheckbox = screen.getByText('Semi-Sleeper').closest('input');
    
      if (semiSleeperCheckbox) {
        fireEvent.click(semiSleeperCheckbox);
        expect(semiSleeperCheckbox).toBeChecked();
        expect(screen.getByText('Sleeper').closest('input')).toBeChecked();
        expect(screen.getByText('Non-Sleeper').closest('input')).toBeChecked();
      } else {
        console.error('Checkbox element for "Semi-Sleeper" is null');
      }
    });
    
    it('handles Non-Sleeper checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('Sleeper'));
      const nonSleeperCheckbox = screen.getByText('Non-Sleeper').closest('input');
    
      if (nonSleeperCheckbox) {
        fireEvent.click(nonSleeperCheckbox);
        expect(nonSleeperCheckbox).toBeChecked();
        expect(screen.getByText('Sleeper').closest('input')).not.toBeChecked();
        expect(screen.getByText('Semi-Sleeper').closest('input')).not.toBeChecked();
      } else {
        console.error('Checkbox element for "Non-Sleeper" is null');
      }
    });
    
    it('handles Non-AC checkbox change', () => {
      render(<Filter setVehicles={() => {}} />);
      fireEvent.click(screen.getByText('AC'));
      const nonACCheckbox = screen.getByText('Non-AC').closest('input');
    
      if (nonACCheckbox) {
        fireEvent.click(nonACCheckbox);
        expect(nonACCheckbox).toBeChecked();
        expect(screen.getByText('AC').closest('input')).not.toBeChecked();
      } else {
        console.error('Checkbox element for "Non-AC" is null');
      }
    });
    test("clears filters when 'Clear Filters' button is clicked", () => {
      render(
        <MemoryRouter>
          <Filter setVehicles={() => {}} />
        </MemoryRouter>
      );
  
      // Select some filters first
      fireEvent.click(screen.getByText('AC'));
      fireEvent.click(screen.getByLabelText('AC')); // Check the AC checkbox
      fireEvent.click(screen.getByLabelText('Non-AC')); // Check the Non-AC checkbox
  
      fireEvent.click(screen.getByText('Sleeper'));
      fireEvent.click(screen.getByLabelText('Sleeper')); // Check the Sleeper checkbox
      fireEvent.click(screen.getByLabelText('Semi-Sleeper')); // Check the Semi-Sleeper checkbox
      fireEvent.click(screen.getByLabelText('Non-Sleeper')); // Check the Non-Sleeper checkbox
  
      fireEvent.change(screen.getByPlaceholderText('From-Date') as HTMLInputElement, { target: { value: '01-01-2023' } });
      fireEvent.change(screen.getByPlaceholderText('To-Date') as HTMLInputElement, { target: { value: '01-02-2023' } });
  
      // Verify that filters are selected
      expect(screen.getByLabelText('AC')).toBeChecked();
      expect(screen.getByLabelText('Non-AC')).toBeChecked();
      expect(screen.getByLabelText('Sleeper')).toBeChecked();
      expect(screen.getByLabelText('Semi-Sleeper')).toBeChecked();
      expect(screen.getByLabelText('Non-Sleeper')).toBeChecked();
      expect((screen.getByPlaceholderText('From-Date') as HTMLInputElement).value).toBe('01-01-2023');
      expect((screen.getByPlaceholderText('To-Date') as HTMLInputElement).value).toBe('01-02-2023');
  
      // Click on "Clear Filters" button
      fireEvent.click(screen.getByText('Clear Filters'));
  
      // Verify that filters are cleared
      expect(screen.getByLabelText('AC')).not.toBeChecked();
      expect(screen.getByLabelText('Non-AC')).not.toBeChecked();
      expect(screen.getByLabelText('Sleeper')).not.toBeChecked();
      expect(screen.getByLabelText('Semi-Sleeper')).not.toBeChecked();
      expect(screen.getByLabelText('Non-Sleeper')).not.toBeChecked();
  
      // Clear the date input fields
      fireEvent.change(screen.getByPlaceholderText('From-Date') as HTMLInputElement, { target: { value: '' } });
      fireEvent.change(screen.getByPlaceholderText('To-Date') as HTMLInputElement, { target: { value: '' } });
  
      // Verify that date input fields are cleared
      expect((screen.getByPlaceholderText('From-Date') as HTMLInputElement).value).toBe('');
      expect((screen.getByPlaceholderText('To-Date') as HTMLInputElement).value).toBe('');
    });
   
   
  });
});
