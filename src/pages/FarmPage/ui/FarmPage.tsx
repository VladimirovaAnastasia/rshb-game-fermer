import { ReactComponent as FarmMap } from 'shared/assets/images/farm/map.svg';
import { useSelector } from 'react-redux';
import { Bed, getBedsData } from 'entities/Bed';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    fetchBedsData,
    harvestBeds,
    plantBeds,
} from 'entities/Bed/model/services/fetchBedsData/fetchBedsData';
import { getUserAuthData } from 'entities/User';
import { getTasksData } from 'entities/Task';
import {
    completeTask,
    fetchTasksData,
} from 'entities/Task/model/services/fetchTasksData/fetchTasksData';
import { TaskCard } from 'shared/ui/TaskCard/TaskCard';
import { fetchUserData } from 'entities/User/model/services/fetchUserData/fetchUserData';
import {GeniusModal, PlantModal} from "features/FarmGame";
import {BedPlant} from "features/FarmGame/PlantModal";
import cls from "./FarmPage.module.scss";

const FarmPage = () => {
  const dispatch = useAppDispatch();
  const beds: Bed[] = useSelector(getBedsData);
  const tasks = useSelector(getTasksData);
  const user = useSelector(getUserAuthData);
  const [emptyFields, setEmptyFields] = useState<Set<HTMLElement>>(new Set());

  useEffect(() => {
    if (user) {
      dispatch(fetchBedsData(user.id));
      dispatch(fetchTasksData(user.id));
    }
  }, [dispatch]);

  const plantActivity = useMemo(
    () =>
      beds.some((bed) => !bed.crop) &&
      tasks.some((task) => task.active && task.type === "plant"),
    [beds, tasks]
  );

  const geniusActivity = useMemo(
    () => tasks.some((task) => task.active && task.type === "finance_genius"),
    [beds, tasks]
  );

  const getClickHandler = (bed: Bed) => (event: MouseEvent) => {
    if (bed.harvest && user) {
      dispatch(
        harvestBeds({
          user_id: user.id,
          bed_id: bed.id,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchUserData(user?.id));
        });
    }
  };

  useLayoutEffect(() => {
    // Это ужасно, но другого выхода нет.
    // если подгружать svg через файл то доступа к жизненному циклу нет
    // приходится развешивать классы и обработчики таким образом

    if (beds.length === 0) return;

    const emptyFields = new Set<HTMLElement>();

    const listeners: ((event: MouseEvent) => void)[] = [];
    for (let i = 0; i < beds.length; i++) {
      const element = document.getElementById(`bed-${beds[i].bed_id}`);
      element?.setAttribute("class", "");
      if (!beds[i].crop) {
        element && emptyFields.add(element);
      } else {
        element?.classList.add(beds[i].harvest ? cls[beds[i].crop] : cls.field);
      }
      listeners.push(getClickHandler(beds[i]));
      element?.addEventListener("click", listeners[i]);
    }

    setEmptyFields(emptyFields);

    return () => {
      for (let i = 0; i < beds.length; i++) {
        const element = document.getElementById(`bed-${beds[i].bed_id}`);
        element?.setAttribute("class", "");
        element?.removeEventListener("click", listeners[i]);
      }
    };
  }, [beds]);

  const handleCompleteTask = useCallback(() => {
    const task = tasks.find((task) => task.type === "plant");

    if (task && user) {
      dispatch(completeTask({task_id: task.id}))
        .unwrap()
        .then(() => {
          dispatch(fetchUserData(user?.id));
        });
    }
  }, [tasks]);

  const plantTask = useMemo(
    () => tasks.find((task) => task.type === "plant"),
    [tasks]
  );

  const [openedPlantModal, setOpenedPlantModal] = useState(false);
  const [bedId, setBedId] = useState<string>();

  const handleClosePlantModal = () => {
    setOpenedPlantModal(false);
  };

  const handleSubmitPlantModal = (bed: BedPlant) => {
    if (!bedId) {
      return;
    }

    const planted_beds = beds.map((toPlant) => ({
      ...toPlant,
      ...(toPlant.bed_id === bed.bed_id ? {crop: bed.crop} : {}),
    }));
    dispatch(plantBeds({user_id: user?.id!, beds: planted_beds}));
    // TODO: завершить таск
    // handleCompleteTask()
  };

  const [openedGeniusModal, setOpenedGeniusModal] = useState(true);

  const handleCloseGeniusModal = () => {
    setOpenedGeniusModal(false);
  };

  const handleSubmitGeniusModal = (success: boolean) => {};

  return (
    <div className={cls.FarmPage}>
      {plantActivity && (
        <>
          <PlantModal
            onClose={handleClosePlantModal}
            onSubmit={handleSubmitPlantModal}
            opened={openedPlantModal}
            bedId={bedId!}
          />
          {Array.from(emptyFields).map((element, index) => {
            const position = element.getBoundingClientRect();
            const id = element.getAttribute("id")?.split("-")[1];

            return (
              <div
                className={cls.task}
                style={{
                  top: position.top + position.height / 4 + window.scrollY,
                  left: position.left + position.width / 4 + window.scrollX,
                }}
                onClick={() => {
                  setBedId(id);
                  setOpenedPlantModal(true);
                }}
              >
                <TaskCard
                  text="Посеять растения"
                  coinsCount={`${plantTask?.cost ?? 10}`}
                  className={cls.card}
                />
              </div>
            );
          })}
        </>
      )}
      {geniusActivity && (
        <GeniusModal
          opened={openedGeniusModal}
          onClose={handleCloseGeniusModal}
          onSubmit={handleSubmitGeniusModal}
        />
      )}
      <FarmMap />
    </div>
  );
};

export default FarmPage;
