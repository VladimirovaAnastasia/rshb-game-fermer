import { Modal } from 'shared/ui/Modal/Modal';
import { ReactComponent as Back } from 'shared/assets/images/farm/back.svg';
import { ReactComponent as Pause } from 'shared/assets/images/farm/pause.svg';
import { ReactComponent as Play } from 'shared/assets/images/farm/play.svg';
import { useEffect, useMemo } from 'react';
import { useTimer } from './useTimer';
import cls from './GeniusModal.module.scss';

interface Props {
  opened: boolean;
  onClose: () => void;
  onSubmit: (completed: boolean) => void;
}

const TIMEOUT = 60_000; // minute

export const GeniusModal = ({ onClose, opened, onSubmit }: Props) => {
    const {
        elapsedTime, isRunning, handlePause, handleReset, handleStart,
    } = useTimer();

    const progress = Math.min(
        Math.round((elapsedTime / TIMEOUT) * 10000) / 100,
        100,
    );

    const isOver = useMemo(() => progress === 100, [progress]);

    useEffect(() => {
        handleReset();
        handleStart();
    }, [opened]);

    useEffect(() => {
        if (isOver) {
            onSubmit(false);
        }
    }, [isOver]);

    return (
        <Modal isOpen={opened} className={cls.modal}>
            <div className={cls.root}>
                <div className={cls.header}>
                    <div onClick={onClose}>
                        <Back />
                    </div>
                    <span>Засеивание</span>
                    <div
                        onClick={() => (isRunning ? handlePause() : handleStart())}
                        style={{
                            background: `linear-gradient(#2a5259, #2a5259) content-box no-repeat, conic-gradient(#FF9595 ${progress}%, 0, #99EB8C ) border-box`,
                            border: '4px solid transparent',
                            borderRadius: '50%',
                        }}
                    >
                        {isRunning ? <Pause /> : <Play />}
                    </div>
                </div>

                <div className={cls.content} />
            </div>
        </Modal>
    );
};
