import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const PasswordGenerator = () => {
  const placeholder = "P4$5W0rD!";
  const [password, setPassword] = useState("");
  const [selectedStrength, setSelectedStrength] = useState(0);
  const [value, setValue] = useState(8);

  const strength = [
    {
      strength: "weak",
      color: "red",
    },
    {
      strength: "medium",
      color: "yellow",
    },
    {
      strength: "strong",
      color: "blue",
    },
    {
      strength: "very strong",
      color: "green",
    },
  ];

  const option = [
    {
      placeHolder: "Include Uppercase Letters",
      name: "uppercase",
      letters: "QWERTYUIOPASDFGHJKLZXCVBNM",
    },
    {
      placeHolder: "Include Lowercase Letters",
      name: "lowercase",
      letters: "qwertyuiopasdfghjklzxcvbnm",
    },
    { placeHolder: "Include Numbers", name: "numbers", letters: "1234567890" },
    {
      placeHolder: "Include Symbols",
      name: "symbols",
      letters: "!@#$%^&*()_+{}[]",
    },
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [selectedOptions, setSelectedOptions] = useState([option[0].name]); // Initial state of the selected options

  const handleCheckboxChange = (option) => {
    const selectedIndex = selectedOptions.indexOf(option);
    let newSelectedOptions;

    if (selectedIndex === -1) {
      newSelectedOptions = [...selectedOptions, option];
    } else {
      newSelectedOptions = selectedOptions.filter((item) => item !== option);
    }

    setSelectedOptions(newSelectedOptions);
    setSelectedStrength(
      newSelectedOptions.length > 0 ? newSelectedOptions.length - 1 : -1
    );
  };

  const generatePassword = (number, choice) => {
    let pass = "";
    choice.forEach((item) => {
      const selected = option.find((opt) => opt.name === item);
      if (!selected) return;
      pass += selected.letters;
    });

    let randomPassword = "";
    for (let i = 0; i < number; i++) {
      const randomIndex = Math.floor(Math.random() * pass.length);
      randomPassword += pass[randomIndex];
    }
    return randomPassword;
  };

  const handleGenerate = () => {
    setPassword(generatePassword(value, selectedOptions));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password); // Use 'password' instead of 'generatedPassword'
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <div className="body w-100 ">
      <div className="container ">
        <div className="box ">
          <h3 className="text-center p-2">Password Generator</h3>
          <div className="p-box shadow d-flex justify-content-between align-items-center px-3 ">
            {password == "" ? (
              <p className="fs-3 m-0 text-secondary">{placeholder}</p>
            ) : (
              <p className="fs-3 m-0 text-white">{password}</p>
            )}

            {password && (
              <i
                className="bi bi-copy fs-3"
                style={{ cursor: "pointer" }}
                onClick={handleCopy}
              ></i>
            )}
          </div>

          <div className="generator shadow my-4 p-3 ">
            <div className="d-flex justify-content-between">
              <p>Character Length</p>
              <p className="fs-3 text-success">{value}</p>
            </div>

            <Form>
              <Form.Group controlId="formRange">
                <Form.Range
                  value={value}
                  onChange={handleChange}
                  min={0} // Minimum value
                  max={20} // Maximum value
                  step={1}
                />
              </Form.Group>

              <Form.Group controlId="formCheckboxGroup">
                <div className="d-flex flex-column gap-2 pt-3">
                  {option.map((item, index) => {
                    return (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={item.placeHolder}
                        checked={selectedOptions.includes(item.name)}
                        onChange={() => handleCheckboxChange(item.name)}
                        className="custom-checkbox"
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </Form>

            <div className="strength shadow mt-4 d-flex justify-content-between p-2 align-items-center">
              <h6 className="text-secondary"> Strength</h6>

              <div className="d-flex gap-2">
                <h5>{strength[selectedStrength]?.strength}</h5>
                <div className="d-flex gap-2">
                  {strength.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="s-box"
                        style={{
                          background:
                            selectedOptions.length > 0 &&
                            index <= selectedOptions.length - 1
                              ? strength[selectedOptions.length - 1]?.color
                              : "inherit",
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-100 pt-4">
              {selectedOptions.length > 0 && value > 0 ? (
                <Button
                  variant="outline-success"
                  className="w-100 bold"
                  onClick={handleGenerate}
                >
                  GENERATE <i className="bi bi-arrow-right"></i>
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outline-success"
                  className="w-100 bold"
                >
                  GENERATE <i className="bi bi-arrow-right"></i>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
