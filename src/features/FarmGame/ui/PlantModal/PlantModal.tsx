import {Modal} from "shared/ui/Modal/Modal";
import cls from "./PlantModal.module.scss";
import {useMemo, useState, MouseEvent, useEffect} from "react";
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
  onSubmit: (bedPlants: BedPlant[]) => void;
  opened: boolean;
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

export const PlantModal = ({onClose, onSubmit, opened}: Props) => {
  const [paused, setPaused] = useState(false);

  const handleTogglePause = () => {
    setPaused((paused) => !paused);
  };

  const options = useMemo(() => {
    return Array(10)
      .fill(null)
      .map(() => {
        const entries = Object.entries(OPTIONS);
        const index = Math.floor(Math.random() * 5);
        return entries[index];
      });
  }, [opened]);

  const [desired, setDesired] = useState<(string | null)[]>([null, null]);

  const handleDesiredPlantClick = (event: MouseEvent<HTMLDivElement>) => {
    const crop = event.currentTarget.getAttribute("data-crop");
    const bed_id = event.currentTarget.getAttribute("data-bed-id");

    if (desired.every((value) => value === null)) {
      setDesired([crop, bed_id]);
    }
  };

  const [beds, setBeds] = useState<BedPlant[]>(
    Array<BedPlant>(10)
      .fill({bed_id: "", crop: ""})
      .map((item) => ({...item}))
  );

  const handlePlantClick = (event: MouseEvent<HTMLDivElement>) => {
    if (desired.every((value) => value === null)) {
      return;
    }
    const [crop, bed_id] = desired;

    const plant = event.currentTarget.getAttribute("data-plant");

    if (plant === crop) {
      setBeds((beds) => {
        beds[+bed_id!].bed_id = bed_id!;
        beds[+bed_id!].crop = crop!;

        return [...beds];
      });
    }

    setDesired([null, null]);
  };

  const handleSubmit = () => {
    onSubmit(beds);
    setBeds(
      Array<BedPlant>(10)
        .fill({bed_id: "", crop: ""})
        .map((item) => ({...item}))
    );
    setDesired([null, null]);
    onClose();
  };

  useEffect(() => {
    if (opened) {
      const t = setTimeout(handleSubmit, 5_000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [opened]);

  return (
    <Modal isOpen={opened} className={cls.modal}>
      <div className={cls.root}>
        <div className={cls.header}>
          <div onClick={onClose}>
            <Back />
          </div>
          <span>Засеивание</span>
          <div onClick={handleTogglePause}>{paused ? <Play /> : <Pause />}</div>
        </div>

        <div className={cls.content}>
          {options.map(([key, value], index) => {
            return (
              <div
                key={index}
                data-crop={key}
                data-bed-id={index}
                onClick={handleDesiredPlantClick}
                className={cls["bed-desired-plant"]}
              >
                {value}
              </div>
            );
          })}
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
