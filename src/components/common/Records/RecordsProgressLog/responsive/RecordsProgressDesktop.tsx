import { useEffect, useRef, useState } from "react"
import "./RecordsProgressDesktop.scss"
import { EXTRA_MERIDIAN_COLORS, MERIDIANS_COLOR } from "src/configs/constants";
import { hexToRgb } from "@mui/material";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";

export const RecordsProgressDesktop: React.FC<IRecordsProgressLogDesktop> = ({ data }) => {
  const meridiansRef = useRef<Array<any>>([]);
  const [resized, setResized] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (resized) {
      const firstMeridianRef = meridiansRef.current?.[0] as HTMLDivElement;
      const width = firstMeridianRef?.clientWidth;

      meridiansRef.current?.forEach((ref) => {
        if (ref) { // NOT_TESTED
          (ref as HTMLDivElement).style.height = `${width}px`;
        }
      })
    }
  }, [resized])

  useEffect(() => {
    setResized(true);
  })

  const getColor = (meridianName: string) => {
    switch (meridianName) {
      case "LU":
        return MERIDIANS_COLOR[1]
      case "LI":
        return MERIDIANS_COLOR[2]
      case "HT":
        return MERIDIANS_COLOR[3]
      case "SP":
        return MERIDIANS_COLOR[4]
      case "ST":
        return MERIDIANS_COLOR[5]
      case "SI":
        return MERIDIANS_COLOR[6]
      case "BL":
        return MERIDIANS_COLOR[7]
      case "KI":
        return MERIDIANS_COLOR[8]
      case "PC":
        return MERIDIANS_COLOR[9]
      case "TE":
        return MERIDIANS_COLOR[10]
      case "GB":
        return MERIDIANS_COLOR[11]
      case "Liv":
        return MERIDIANS_COLOR[12]
      case "Du":
        return EXTRA_MERIDIAN_COLORS[1]
      case "Ren":
        return EXTRA_MERIDIAN_COLORS[2]
    }
  }

  const getCentralColor = (meridianName: string, percentage: number) => {
    const hexColor = getColor(meridianName);
    if (hexColor) { // NOT_TESTED
      let rgb = hexToRgb(hexColor);
      rgb = rgb.replace("rgb", "rgba").replace(")", `, ${percentage / 100})`);
      return rgb;
    }
  }

  return (
    <div
      role="div"
      aria-label="records-progress-desktop"
      className="records-progress-desktop grid grid-cols-4 gap-6 py-2"
    >
      {data.map((item: any, index: number) => (
        <>
          <div
            key={index}
            ref={el => meridiansRef.current[index] = el}
            className="col-span-1 records-progress-desktop__meridian flex-center flex-col"
            style={{
              background: `radial-gradient(${getColor(item.caption)} 0%, 
            ${getCentralColor(item.caption, item.percentage)} 50%, #FFFFFF 100%)`,
              border: `1px solid ${getColor(item.caption)}`,
            }}
            data-tip
            data-for={`tooltip-${index}`}>
            <h1 className="records-progress-desktop__meridian--caption">{item.caption}</h1>
            <h1 className="records-progress-desktop__meridian--percentage">{item.percentage}%</h1>

          </div>

          <ReactTooltip id={`tooltip-${index}`} place="top" effect="solid">
            <p>{t(`meridian_tooltips.${item.caption}`)}</p>
          </ReactTooltip>
        </>
      ))}
    </div>
  )
}
