import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "./components/Footer";
import Search from "./components/Search";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import Results from "./components/Results";

describe("Theme", () => {
  test("change theme by clicking change theme button", () => {
    render(
      <ThemeContextProvider>
        <Footer />
      </ThemeContextProvider>
    );
    const LightModeIcon = screen.getByTestId("LightModeIcon");

    fireEvent.click(LightModeIcon);

    expect(LightModeIcon).not.toBeInTheDocument();
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
  });
});

describe("Search", () => {
  test("path should change after clicking Images as '/results/image/", () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );
    const ImageButton = screen.getByText("Images");
    fireEvent.click(ImageButton);
    expect(window.location.pathname).toBe("/results/image/");
  });

  test("path should change after submitting search query as '/results/{searchQuery}", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const SearchBar = screen.getByRole("textbox");
    const SubmitButton = screen.getByTestId("HomeSearchSubmit");
    fireEvent.change(SearchBar, { target: { value: "testing" } });
    fireEvent.click(SubmitButton);
    expect(window.location.pathname).toBe("/results/testing");
  });
});
