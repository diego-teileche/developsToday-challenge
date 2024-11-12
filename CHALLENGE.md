### Backend:

**Tech Stack:**

- Node.js (Nest.js or Express.js)

**Tasks:**

1. **Endpoint: Get Available Countries**
    - Create an API endpoint, using Date Nager API `https://date.nager.at/api/v3/AvailableCountries`
    - This endpoint should return a list of available countries.
2. **Endpoint: Get Country Info**
    - Create an API endpoint to retrieve detailed information about a specific country.
    - This endpoint should provide the following data:
    a. **List of Border Countries**: A list of countries that share a border with the selected country `https://date.nager.at/api/v3/CountryInfo/UA`
    b. **Population Data**: Historical population data for the country, suitable for plotting on a chart `https://countriesnow.space/api/v0.1/countries/population`
    c. **Flag URL**: A URL to the country’s flag image `https://countriesnow.space/api/v0.1/countries/flag/images`

### Front-end:

**Tech Stack:**

- React.js
- Next.js (preferred but not mandatory)

**Tasks:**

1. **Country List Page**
    - Display a list of countries fetched from the endpoint.
    - Each country name should be clickable and navigate the user to the Country Info Page.
2. **Country Info Page**
    - Display detailed information about the selected country, including:
        - **Country Name**: Displayed prominently at the top.
        - **Country Flag**: Displayed alongside the country name using the URL fetched from the backend.
    - **Border Countries Widget**:
        - Show a list of countries that border the selected country.
        - Each border country name should be clickable and navigate the user to the corresponding Country Info Page.
    - **Population Chart**:
        - Implement a chart that shows the country’s population over time.
        - The X-axis should represent years, and the Y-axis should represent the population.

### Additional Requirements

1. **Styling**:
    - You can use any CSS framework or custom styles to design the components.
    - Ensure that the UI is responsive and user-friendly.
2. **Environment Variables**:
    - Create a `.env` file to store sensitive data such as API keys and base URLs.
    - Ensure that environment variables are loaded and used securely in the application.
    - Add `.env` to the repository.
3. **Code Quality**:
    - Set up ESLint and Prettier to ensure consistent code formatting and quality.
    - Ensure that all files are properly linted and formatted before submission.
4. **Documentation**:
    - Include a `README.md` file that provides instructions on how to install, run, and test the application.
    - Include any necessary setup steps, such as installing dependencies or configuring environment variables.

### Additional Instructions

We will be testing your application locally. Please ensure the following:

- **Separate Folders**: Place the frontend (FE) and backend (BE) code in separate folders within the root directory. Do not create a monorepo structure.
- **Parallel Execution**: Ensure that both the frontend and backend can be run simultaneously on different ports. The frontend should be able to communicate with the backend without any issues.
- **Instructions for Running**: Provide clear instructions in the `README.md` file on how to start both the frontend and backend servers, including any necessary environment variables or configurations.