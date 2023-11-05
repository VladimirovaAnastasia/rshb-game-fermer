import {SvgLoader, SvgProxy} from "react-svgmt";
import farmMap from "shared/assets/images/farm/map.svg";
import cls from "./FarmPage.module.scss";
import {useSelector} from "react-redux";
import {Bed, getBedsData} from "entities/Bed";
import {MouseEvent, useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchBedsData} from "entities/Bed/model/services/fetchBedsData/fetchBedsData";
import {getUserAuthData} from "entities/User";

const FarmPage = () => {
  const dispatch = useAppDispatch();
  const beds: Bed[] = useSelector(getBedsData);
  const user = useSelector(getUserAuthData);

  useEffect(() => {
    if (user) {
      dispatch(fetchBedsData(user.id));
    }
  }, [dispatch]);

  const getclickHandler = (bed: Bed) => (event: MouseEvent) => {
    console.log("harvest", bed);
  };

  return (
    <div className={cls.FarmPage}>
      <SvgLoader path={farmMap}>
        {beds.map((bed) => (
          <SvgProxy
            selector={[`#bed-${bed.bed_id}`]}
            class={bed.harvest ? cls[bed.crop] : cls.field}
            key={bed.id}
            onClick={bed.harvest ? getclickHandler(bed) : undefined}
          />
        ))}
      </SvgLoader>
    </div>
  );
};

export default FarmPage;
