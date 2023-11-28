import FarmMap from "shared/assets/images/farm/map.svg?react";
import { useSelector } from "react-redux";
import { Bed, getBedsData } from "entities/Bed";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  fetchBedsData,
  harvestBeds,
  plantBeds,
} from "entities/Bed/model/services/fetchBedsData/fetchBedsData";
import { getUserAuthData } from "entities/User";
import { getTasksData } from "entities/Task";
import {
  completeTask,
  fetchTasksData,
} from "entities/Task/model/services/fetchTasksData/fetchTasksData";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";
import { SurveyModal, PlantModal } from "features/FarmGame";
import cls from "./FarmPage.module.scss";
import { fetchGameData } from "entities/Game/model/services/fetchGameData/fetchGameData";
import { CropEnum } from "entities/Bed/model/types/bed";

interface BedPlant {
  crop: CropEnum;
  index: number;
}

const FarmPage = () => {
  const dispatch = useAppDispatch();
  const beds: Bed[] = useSelector(getBedsData);
  const tasks = useSelector(getTasksData);
  const user = useSelector(getUserAuthData);
  const [emptyFields, setEmptyFields] = useState<Set<HTMLElement>>(new Set());

  useEffect(() => {
    if (user) {
      dispatch(fetchBedsData());
      dispatch(fetchTasksData());
    }
  }, [dispatch, user]);

  const plantActivity = useMemo(
    () =>
      beds.some((bed) => !bed.crop) &&
      tasks.some((task) => !task.completedAt && task.task.type === "Plant"),
    [beds, tasks],
  );

  const surveyActivity = useMemo(
    () =>
      tasks.some(
        (task) => !task.completedAt && task.task.type === "FinanceGenius",
      ),
    [tasks],
  );

  const getClickHandler = (bed: Bed) => () => {
    if (bed.plantedAt && user) {
      dispatch(
        harvestBeds({
          bed_id: bed.id,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(fetchGameData(user?.id));
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
      const element = document.getElementById(`bed-${beds[i].index}`);
      element?.setAttribute("class", "");
      if (!beds[i].crop) {
        element && emptyFields.add(element);
      } else {
        element?.classList.add(
          beds[i].plantedAt ? cls[beds[i].crop] : cls.field,
        );
      }
      listeners.push(getClickHandler(beds[i]));
      element?.addEventListener("click", listeners[i]);
    }

    setEmptyFields(emptyFields);

    return () => {
      for (let i = 0; i < beds.length; i++) {
        const element = document.getElementById(`bed-${beds[i].index}`);
        element?.setAttribute("class", "");
        element?.removeEventListener("click", listeners[i]);
      }
    };
  }, [beds]);

  const handleCompleteTask = useCallback(
    (type: string) => {
      const task = tasks.find((task) => task.task.type === type);

      if (task && user) {
        dispatch(completeTask(task.id))
          .unwrap()
          .then(() => {
            dispatch(fetchGameData(user?.id));
          });
      }
    },
    [dispatch, tasks, user],
  );

  const plantTask = useMemo(
    () => tasks.find((task) => task.task.type === "Plant"),
    [tasks],
  );

  const surveyTask = useMemo(
    () => tasks.find((task) => task.task.type === "FinanceGenius"),
    [tasks],
  );

  const [openedPlantModal, setOpenedPlantModal] = useState(false);
  const [bedIndex, setBedIndex] = useState<number>();

  const handleClosePlantModal = () => {
    setOpenedPlantModal(false);
  };

  const handleSubmitPlantModal = (bed: BedPlant) => {
    if (!bedIndex) {
      return;
    }

    const plantedBed = beds.find((item) => item.index === bed.index);

    if (plantedBed) {
      dispatch(
        plantBeds({
          bed: {
            ...plantedBed,
            crop: bed.crop,
          },
        }),
      );
      // TODO: завершить таск
      // handleCompleteTask("plant")
    }
  };

  const [openedGeniusModal, setOpenedGeniusModal] = useState(true);

  const handleCloseGeniusModal = () => {
    setOpenedGeniusModal(false);
  };

  const handleSubmitGeniusModal = (success: boolean) => {
    if (success) {
      // handleCompleteTask('finance_genius');
    }
    setOpenedGeniusModal(false);
  };

  return (
    <div className={cls.FarmPage}>
      {plantActivity && (
        <>
          <PlantModal
            onClose={handleClosePlantModal}
            onSubmit={handleSubmitPlantModal}
            opened={openedPlantModal}
            bedIndex={bedIndex!}
          />
          {Array.from(emptyFields).map((element) => {
            const position = element.getBoundingClientRect();
            const id = element.getAttribute("id")?.split("-")?.[1];

            if (!id) {
              return null;
            }

            return (
              <div
                className={cls.task}
                style={{
                  top: position.top + position.height / 4 + window.scrollY,
                  left: position.left + position.width / 4 + window.scrollX,
                }}
                onClick={() => {
                  setBedIndex(+id);
                  setOpenedPlantModal(true);
                }}
              >
                <TaskCard
                  text="Посеять растения"
                  coinsCount={`${plantTask?.task.cost ?? 10}`}
                  className={cls.card}
                />
              </div>
            );
          })}
        </>
      )}
      {surveyActivity && surveyTask && (
        <SurveyModal
          opened={openedGeniusModal}
          taskId={surveyTask.id}
          onClose={handleCloseGeniusModal}
          onSubmit={handleSubmitGeniusModal}
        />
      )}
      <FarmMap />
    </div>
  );
};

export default FarmPage;
