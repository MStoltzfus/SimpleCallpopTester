import { IStackStyles, IStackTokens } from "@fluentui/react";

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    maxWidth: "275px",
    margin: "0 auto",
    textAlign: "center",
  },
};
const headerStackStyles: Partial<IStackStyles> = {
  root: {
    margin: "0 auto",
    textAlign: "center",
  },
};
const headerItemStyles: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  height: 50,
  justifyContent: "center",
  minWidth: 50,
};

const mainContentStyle: React.CSSProperties = {
  paddingTop: "10px",
};

export { stackStyles, stackTokens, headerStackStyles, headerItemStyles, mainContentStyle };
