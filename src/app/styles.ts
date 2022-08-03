import { IStackStyles, IStackTokens } from "@fluentui/react";
import themes from "./themes";

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    maxWidth: "275px",
    margin: "0 auto",
    textAlign: "center",
  },
};

type headerStackStyles = {
  darkTheme:Partial<IStackStyles>;
  lightTheme:Partial<IStackStyles>;
}

const headerStackStyles: headerStackStyles = {
  darkTheme: {
    root: {
      margin: "0 auto",
      textAlign: "center",
      backgroundColor: themes.dark.palette.themeDarker,
    },
  },
  lightTheme: {
    root: {
      margin: "0 auto",
      textAlign: "center",
      backgroundColor: themes.dark.palette.white,
    },
  },
};

const headerItemStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 50,
  minWidth: 50,
};

const mainContentStyle: React.CSSProperties = {
  paddingTop: "10px",
};

export { stackStyles, stackTokens, headerStackStyles, headerItemStyles, mainContentStyle };
