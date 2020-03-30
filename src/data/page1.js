import React, { Component } from "react";
import data from "./page1.json";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = { forms: [], loading: false };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ forms: data.forms });
      for (let i = 0; i < data.forms.length; i++) {
        let tmp = data.forms[i];
        if (tmp.component === "text") {
          this.setState({ [tmp.field]: tmp.defaultValue });
        } else if (tmp.component === "radio") {
          this.setState({ [tmp.field]: tmp.defaultOption });
        } else if (tmp.component === "checkbox") {
          this.setState({ [tmp.field]: tmp.defaultOptions });
        }
      }
      this.setState({ loading: false });
    }, 3000);
  };

  render() {
    const { forms } = this.state;
    return (
      <div>
        <div style={{ padding: "10px" }}>
          {forms.map(v => {
            const { component, field } = v;
            const { [field]: val } = this.state;
            if (component === "text") {
              const { label, placeholder, description } = v;
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={label}
                  placeholder={placeholder}
                  helperText={description}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={val}
                  onChange={event => {
                    this.setState({ [field]: event.target.value });
                  }}
                />
              );
            } else if (component === "radio") {
              const { options, label } = v;
              return (
                <FormControl>
                  <FormLabel>{label}</FormLabel>
                  <RadioGroup
                    value={val}
                    onChange={event => {
                        this.setState({ [field]: event.target.value });
                    }}
                  >
                    {options.map(value => {
                      return (
                        <FormControlLabel
                          value={value.id}
                          control={<Radio />}
                          label={value.value}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}
