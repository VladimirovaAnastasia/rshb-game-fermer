import {Modal} from "shared/ui/Modal/Modal";
import cls from "./PlantModal.module.scss";
import {useMemo, useState, MouseEvent} from "react";
import {ReactComponent as Back} from "shared/assets/images/farm/back.svg";
import {ReactComponent as Pause} from "shared/assets/images/farm/pause.svg";
import {ReactComponent as Play} from "shared/assets/images/farm/play.svg";
import {ReactComponent as Carrot} from "shared/assets/images/farm/carrot-icon.svg";
import {ReactComponent as Potato} from "shared/assets/images/farm/potato-icon.svg";
import {ReactComponent as Beet} from "shared/assets/images/farm/beet-icon.svg";
import {ReactComponent as Flower} from "shared/assets/images/farm/flower-icon.svg";
import {ReactComponent as Wheat} from "shared/assets/images/farm/wheat-icon.svg";

interface Props {
  onClose: () => void;
  onSubmit: (bedPlants: BedPlant) => void;
  opened: boolean;
  bedId: string;
}

const OPTIONS = {
  carrot: "морковь",
  potato: "картофель",
  beet: "свекла",
  flowers: "цветы",
  wheat: "пшеница",
};

export interface BedPlant {
  crop: string;
  bed_id: string;
}

export const PlantModal = ({onClose, onSubmit, opened, bedId}: Props) => {
  const [paused, setPaused] = useState<boolean>(false);
  const [plant, setPlant] = useState<string>();

  const desiredCrop = useMemo(() => {
    const entries = Object.entries(OPTIONS);
    const index = Math.floor(Math.random() * 5);
    return entries[index];
  }, [opened]);

  const handleDesiredPlantClick = (event: MouseEvent<HTMLDivElement>) => {
    const crop = event.currentTarget.getAttribute("data-crop");
    if (crop === plant) {
      handleSubmit({
        crop: crop,
        bed_id: bedId,
      });
    } else {
      console.log("wrong plant");
    }
    setPlant(undefined);
  };

  const handlePlantClick = (event: MouseEvent<HTMLDivElement>) => {
    const plant = event.currentTarget.getAttribute("data-plant");
    if (plant) {
      setPlant(plant);
    }
  };

  const handleSubmit = (plant: BedPlant) => {
    onSubmit(plant);
    onClose();
  };

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

        <div className={cls.content}>
          <div
            data-crop={desiredCrop[0]}
            onClick={handleDesiredPlantClick}
            className={cls["bed-desired-plant"]}
          >
            {desiredCrop[1]}
          </div>
        </div>

        <div className={cls.footer}>
          <div
            className={cls["plant-icon"]}
            onClick={handlePlantClick}
            data-plant="carrot"
          >
            <Carrot />
          </div>
          <div
            className={cls["plant-icon"]}
            onClick={handlePlantClick}
            data-plant="beet"
          >
            <Beet />
          </div>
          <div
            className={cls["plant-icon"]}
            onClick={handlePlantClick}
            data-plant="potato"
          >
            <Potato />
          </div>
          <div
            className={cls["plant-icon"]}
            onClick={handlePlantClick}
            data-plant="flowers"
          >
            <Flower />
          </div>
          <div
            className={cls["plant-icon"]}
            onClick={handlePlantClick}
            data-plant="wheat"
          >
            <Wheat />
          </div>
        </div>
      </div>
    </Modal>
  );
};
