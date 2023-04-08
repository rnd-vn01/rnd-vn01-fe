import { useEffect, useRef, useState } from "react"
import "./RecordsProgressDesktop.scss"
import { MERIDIAN_COLOR_MAP } from "src/configs/constants";
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

  return (
    <div
      role="div"
      aria-label="records-progress-desktop"
      className="records-progress-desktop grid grid-cols-4 gap-6 py-2"
    >
      {data.map((item: any, index: number) => (
        <div key={index}>
          <div
            ref={el => meridiansRef.current[index] = el}
            className="col-span-1 records-progress-desktop__meridian flex-center flex-col"
            style={{
              background: `radial-gradient(${MERIDIAN_COLOR_MAP[item.caption]} 0%, ${item.percentage / 2}%, 
              #FFFFFF ${item.percentage}%)`,
              border: `1px solid ${MERIDIAN_COLOR_MAP[item.caption]}`,
            }}
            data-tip
            data-for={`tooltip-${index}`}>
            <h1 className="records-progress-desktop__meridian--caption">{item.caption}</h1>
            <h1 className="records-progress-desktop__meridian--percentage">{item.percentage}%</h1>

          </div>

          <ReactTooltip id={`tooltip-${index}`} place="top" effect="solid">
            <p>{t(`meridian_tooltips.${item.caption}`)}</p>
          </ReactTooltip>
        </div>
      ))}
    </div >
  )
}
