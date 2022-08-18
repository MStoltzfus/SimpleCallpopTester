import { useGlobalState } from "../../../GlobalState/GlobalStateProvider";

type errorProps = {
  errorMessage: string;
  errorCode: string;
}


const Error = ( props: errorProps ) => {

  const { globalState } = useGlobalState();

  const textColor = globalState.appThemeState === "dark" ? globalState.themePaletteState?.neutralPrimary : globalState.themePaletteState?.themeLight;

  return (
    <div
      className="error-page"
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        className="inner"
        style={{

          display: "flex",
          flexDirection: "column",
          backgroundColor: globalState.themePaletteState?.themeDarker,
          maxWidth: "70%",
          margin: 30,
          paddingTop: 15,
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          style={{
            objectFit: 'contain',
            width: "80%",
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            maxHeight: "50vh",
          }}
          src='error.png' />
        <h3 className="errorMessage" style={{ color: textColor, width:'75%', textAlign:'center' }}>{props.errorMessage}</h3>
        <p className="errorCode" style={{ color: textColor }}>Error Code: {props.errorCode}</p>
      </div>
    </div>
  )
}

export default Error