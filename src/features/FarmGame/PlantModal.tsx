import { Modal } from 'shared/ui/Modal/Modal';
import {
    useMemo, useState, DragEvent, useEffect,
} from 'react';
import { ReactComponent as Back } from 'shared/assets/images/farm/back.svg';
import { ReactComponent as Pause } from 'shared/assets/images/farm/pause.svg';
import { ReactComponent as Play } from 'shared/assets/images/farm/play.svg';
import { ReactComponent as Carrot } from 'shared/assets/images/farm/carrot-icon.svg';
import { ReactComponent as Potato } from 'shared/assets/images/farm/potato-icon.svg';
import { ReactComponent as Beet } from 'shared/assets/images/farm/beet-icon.svg';
import { ReactComponent as Flower } from 'shared/assets/images/farm/flower-icon.svg';
import { ReactComponent as Wheat } from 'shared/assets/images/farm/wheat-icon.svg';
import { ReactComponent as Bed } from 'shared/assets/images/game-1/bed.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import coinSound from 'shared/assets/sounds/coins.mp3';
import useSound from 'use-sound';
import { ReactComponent as CoinIcon } from 'shared/assets/icons/coin-16-16.svg';
import cls from './PlantModal.module.scss';

interface Props {
  onClose: () => void;
  onSubmit: (bedPlants: BedPlant) => void;
  opened: boolean;
  bedId: string;
}

const OPTIONS = {
    carrot: 'морковь',
    potato: 'картофель',
    beet: 'свекла',
    flowers: 'цветы',
    wheat: 'пшеница',
};

export interface BedPlant {
  crop: string;
  bed_id: string;
}

export const PlantModal = ({
    onClose, onSubmit, opened, bedId,
}: Props) => {
    const [paused, setPaused] = useState<boolean>(false);
    const [plant, setPlant] = useState<string | null>();
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

    const handleChangePlant = (item: string | null) => {
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

    const handleBedDrop = (event: DragEvent<SVGSVGElement>) => {
        if (taskAnswer === 'success') {
            setDoneTask(true);
            //play();
            handleSubmit({
                crop: plant as string,
                bed_id: bedId,
            });
        }

        setPlant(null);
    };

    const taskAnswer = useMemo(() => {
        if (!plant || !dragged) {
            return null;
        }
        return desiredCrop[0] === plant ? 'success' : 'wrong';
    }, [plant, dragged]);

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
                {/*{ hasDoneTask && <CoinIcon className={cls.coin} />}*/}

                <div className={cls.content}>
                    <div
                        data-crop={desiredCrop[0]}
                        className={cls['bed-desired-plant']}
                    >
                        {desiredCrop[1]}
                    </div>
                    <Bed
                        onDrop={handleBedDrop}
                        onDragOver={handleBedDragOver}
                        onDragLeave={handleBedDragLeave}
                        className={classNames(cls.bed, {
                            [cls.success]: dragged && (taskAnswer === 'success'),
                            [cls.wrong]: dragged && (taskAnswer === 'wrong'),
                            [cls.sprouts]: hasDoneTask,
                        })}
                    />
                </div>

                <div className={cls.footer}>
                    <div
                        draggable={!hasDoneTask}
                        onDragStart={() => handleChangePlant('carrot')}
                        onDragEnd={handlePlantDragEnd}
                        className={cls['plant-icon']}
                        data-plant="carrot"
                    >
                        <Carrot />
                    </div>
                    <div
                        draggable={!hasDoneTask}
                        onDragStart={() => handleChangePlant('beet')}
                        onDragEnd={handlePlantDragEnd}
                        className={cls['plant-icon']}
                        data-plant="beet"
                    >
                        <Beet />
                    </div>
                    <div
                        draggable={!hasDoneTask}
                        onDragStart={() => handleChangePlant('potato')}
                        onDragEnd={handlePlantDragEnd}
                        className={cls['plant-icon']}
                        data-plant="potato"
                    >
                        <Potato />
                    </div>
                    <div
                        draggable={!hasDoneTask}
                        onDragStart={() => handleChangePlant('flowers')}
                        onDragEnd={handlePlantDragEnd}
                        className={cls['plant-icon']}
                        data-plant="flowers"
                    >
                        <Flower />
                    </div>
                    <div
                        draggable={!hasDoneTask}
                        onDragStart={() => handleChangePlant('wheat')}
                        onDragEnd={handlePlantDragEnd}
                        className={cls['plant-icon']}
                        data-plant="wheat"
                    >
                        <Wheat />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
