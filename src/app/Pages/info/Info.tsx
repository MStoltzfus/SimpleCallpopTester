import { useGlobalState } from "../../../GlobalState/GlobalStateProvider";

type infoProps = {
  infoMessage: string;
  infoCode?: string;
  innerComponent?: JSX.Element;
}

const Info = ( props: infoProps ) => {

  const { globalState } = useGlobalState();

  const textColor = globalState.appThemeState === "dark" ? globalState.themePaletteState?.neutralPrimary : globalState.themePaletteState?.themeLight;

  const innerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: globalState.themePaletteState?.themeDarker,
    maxWidth: "70%",
    margin: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: "20px",
    justifyContent: "center",
    alignItems: "center",
  }

  const imgStyles: React.CSSProperties = {
    objectFit: 'contain',
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    maxHeight: "50vh",
  }

  return (
    <div
      className="info-page"
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        className="inner"
        style={innerStyle}>
        <img
          style={imgStyles}
          src='info.png' />
        <h3 className="errorMessage" style={{ color: textColor, width: '75%', textAlign: 'center' }}>
          {props.infoMessage}
        </h3>
        {props.infoCode !== undefined || null ? <p className="errorCode" style={{ color: textColor }}>Info Code: {props.infoCode}</p> : null}
        {props.innerComponent !== undefined || null ? <><div className='innerInfoComponentDiv' style={{padding:'10px'}}>{props.innerComponent}</div></> : null}
      </div>
    </div>
  )
}

export default Info