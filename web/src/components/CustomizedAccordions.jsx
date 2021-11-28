/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";

const Accordion = styled((props) => (
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

const styles = {
  overview: css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding-left: 0px;
    font-size: 24px;
    // font-weight: 700;
    font-family: "Outfit", sans-serif;
    color: rgba(0, 0, 0, 0.5);
    background-color: #e0dbc1;
    &:hover {
      color: #38374f;
      cursor: pointer;
      transition: color 0.5s;
    }
  `,
  overview2: css`
    width: 100%;
    height: 60px;
    padding-left: 30px;
    font-size: 26px;
    font-weight: 700;
    font-family: "Outfit", sans-serif;
    color: rgba(0, 0, 0, 0.5);
    background-color: #e0dbc1;
    &:hover {
      color: #38374f;
      cursor: pointer;
      transition: color 0.5s;
    }
  `,
};

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => {
    return {
      flexDirection: "row-reverse",
      "& .MuiAccordionSummary-content": {
        margin: "0px",
        padding: "0px",
      },
    };
  }
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  "& .MuiTypography-root": {
    fontSize: "20px",
    color: "rgba(0, 0, 0, 0.5)",
    "&:hover": {
      cursor: "pointer",
      color: "rgba(0, 0, 0, 1)",
    },
  },
}));

export default function CustomizedAccordions({ content, handleClick }) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {Object.keys(content).map((key, idx) => {
        const value = content[key];

        return (
          <Accordion
            expanded={expanded === key}
            onChange={handleChange(key)}
            key={idx}>
            <AccordionSummary css={styles.overview2}>
              <Typography css={styles.overview}>{key}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {value.map((item, index) => {
                  return (
                    <React.Fragment key={index + "fragment"}>
                      <ListItem key={index + "-item"}>
                        <ListItemText
                          primary={item}
                          onClick={() => {
                            handleClick && handleClick(item);
                          }}
                        />
                      </ListItem>
                      {/* <Divider component='li' key={index + "-divider"} /> */}
                    </React.Fragment>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
