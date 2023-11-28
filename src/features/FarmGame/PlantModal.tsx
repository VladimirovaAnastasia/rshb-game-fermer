import useSound from "use-sound";
import { useMemo, useState, DragEvent, useEffect } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import Back from "shared/assets/images/farm/back.svg?react";
import Pause from "shared/assets/images/farm/pause.svg?react";
import Play from "shared/assets/images/farm/play.svg?react";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import Bed from "shared/assets/images/game-1/bed.svg?react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import classNames from "classnames";
import coinSound from "shared/assets/sounds/coins.mp3";
import cls from "./PlantModal.module.scss";
import { CropEnum } from "entities/Bed/model/types/bed";

interface Props {
  onClose: () => void;
  onSubmit: (bedPlants: BedPlant) => void;
  opened: boolean;
  bedIndex: number;
}

const OPTIONS = {
  [CropEnum.Carrot]: "морковь",
  [CropEnum.Potato]: "картофель",
  [CropEnum.Beet]: "свекла",
  [CropEnum.Flower]: "цветы",
  [CropEnum.Wheat]: "пшеница",
};

export interface BedPlant {
  crop: CropEnum;
  index: number;
}

export const PlantModal = ({ onClose, onSubmit, opened, bedIndex }: Props) => {
  const [paused, setPaused] = useState<boolean>(false);
  const [plant, setPlant] = useState<CropEnum | null>();
  const [dragged, setDragged] = useState<boolean>(false);
  const [hasDoneTask, setDoneTask] = useState<boolean>(false);

  const desiredCrop = useMemo(() => {
    const entries = Object.entries(OPTIONS);
    const index = Math.floor(Math.random() * 5);
    return entries[index];
  }, [opened]);

  const [play] = useSound(coinSound);

  const handleSubmit = (plant: BedPlant) => {
    onSubmit(plant);
    setTimeout(onClose, 2_000);
  };

  const handleChangePlant = (item: CropEnum | null) => {
    setPlant(item);
  };

  const handlePlantDragEnd = () => {
    handleChangePlant(null);
    setDragged(false);
  };

  const handleBedDragOver = (event: DragEvent<SVGSVGElement>) => {
    event.preventDefault();
    setDragged(true);
  };

  const handleBedDragLeave = (event: DragEvent<SVGSVGElement>) => {
    event.preventDefault();
    setDragged(false);
  };

  const handleBedDrop = () => {
    if (taskAnswer === "success" && plant) {
      setDoneTask(true);
      play();
      handleSubmit({
        crop: plant,
        index: bedIndex,
      });
    }

    setPlant(null);
  };

  const taskAnswer = useMemo(() => {
    if (!plant || !dragged) {
      return null;
    }
    return desiredCrop[0] === plant ? "success" : "wrong";
  }, [plant, dragged, desiredCrop]);

  useEffect(
    () => () => {
      setDoneTask(false);
      setDragged(false);
      setPaused(false);
      setPlant(null);
    },
    [opened],
  );

  return (
    <Modal isOpen={opened} className={cls.modal}>
      <div className={cls.root}>
        <div className={cls.header}>
          <div onClick={onClose}>
            <Back />
          </div>
          <span>Засеивание</span>
          <div onClick={() => setPaused((state) => !state)}>
            {paused ? <Play /> : <Pause />}
          </div>
        </div>
        {hasDoneTask && <CoinIcon className={cls.coin} />}

        <div className={cls.content}>
          <div data-crop={desiredCrop[0]} className={cls["bed-desired-plant"]}>
            {desiredCrop[1]}
          </div>
          <Bed
            onDrop={handleBedDrop}
            onDragOver={handleBedDragOver}
            onDragLeave={handleBedDragLeave}
            className={classNames(cls.bed, {
              [cls.success]: dragged && taskAnswer === "success",
              [cls.wrong]: dragged && taskAnswer === "wrong",
              [cls.sprouts]: hasDoneTask,
            })}
          />
        </div>

        <div className={cls.footer}>
          <div
            draggable={!hasDoneTask}
            onDragStart={() => handleChangePlant(CropEnum.Carrot)}
            onDragEnd={handlePlantDragEnd}
            className={cls["plant-icon"]}
            data-plant="carrot"
          >
            <Carrot />
          </div>
          <div
            draggable={!hasDoneTask}
            onDragStart={() => handleChangePlant(CropEnum.Beet)}
            onDragEnd={handlePlantDragEnd}
            className={cls["plant-icon"]}
            data-plant="beet"
          >
            <Beet />
          </div>
          <div
            draggable={!hasDoneTask}
            onDragStart={() => handleChangePlant(CropEnum.Potato)}
            onDragEnd={handlePlantDragEnd}
            className={cls["plant-icon"]}
            data-plant="potato"
          >
            <Potato />
          </div>
          <div
            draggable={!hasDoneTask}
            onDragStart={() => handleChangePlant(CropEnum.Flower)}
            onDragEnd={handlePlantDragEnd}
            className={cls["plant-icon"]}
            data-plant="flowers"
          >
            <Flower />
          </div>
          <div
            draggable={!hasDoneTask}
            onDragStart={() => handleChangePlant(CropEnum.Wheat)}
            onDragEnd={handlePlantDragEnd}
            className={cls["plant-icon"]}
            data-plant="wheat"
          >
            <Wheat />
          </div>
        </div>
      </div>
    </Modal>
  );
};
