import { Modal } from "shared/ui/Modal/Modal";
import Back from "shared/assets/images/farm/back.svg?react";
import Pause from "shared/assets/images/farm/pause.svg?react";
import Play from "shared/assets/images/farm/play.svg?react";
import { DragEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchSurveyData } from "entities/Survey/model/services/fetchSurveyData/fetchSurveyData";
import { useSelector } from "react-redux";
import { getSurveyData } from "entities/Survey";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./SurveyModal.module.scss";
import { useTimer } from "./useTimer";

interface Props {
  opened: boolean;
  taskId: string;
  onClose: () => void;
  onSubmit: (completed: boolean) => void;
}

interface InnerQuestion {
  question: string;
  answer: string;
  index: number;
  state: "correct" | "incorrect" | "empty";
}

interface InnerAnswer {
  answer: string;
  index: number;
}

const TIMEOUT = 60_000; // minute

export const SurveyModal = ({ onClose, opened, taskId, onSubmit }: Props) => {
  const dispatch = useAppDispatch();
  const survey = useSelector(getSurveyData);

  const { elapsedTime, isRunning, handlePause, handleReset, handleStart } =
    useTimer();

  const progress = Math.min(
    Math.round((elapsedTime / TIMEOUT) * 10000) / 100,
    100,
  );

  const isOver = useMemo(() => progress === 100, [progress]);

  useEffect(() => {
    handleReset();
    if (opened) {
      handleStart();
    } else {
      handlePause();
    }
  }, [opened]);

  useEffect(() => {
    dispatch(fetchSurveyData(taskId));
  }, [dispatch]);

  const [questions, setQuestions] = useState<InnerQuestion[]>();
  const [answers, setAnswers] = useState<InnerAnswer[]>();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>();

  useEffect(() => {
    const questions = survey?.questions.map((question) => question.question);
    const answers = survey?.questions.map((question) => question.answer);

    setQuestions(
      questions?.map<InnerQuestion>((item, index) => ({
        question: item,
        answer: answers![index],
        index,
        state: "empty",
      })),
    );

    setAnswers(
      answers?.map<InnerAnswer>((item, index) => ({
        answer: item,
        index,
      })),
    );
  }, [survey]);

  const handleQuestionClick = (event: MouseEvent<HTMLDivElement>) => {
    if (selectedAnswerIndex === undefined) {
      return;
    }

    const index = event.currentTarget.getAttribute("data-index");
    if (index && selectedAnswerIndex === +index) {
      setQuestions(
        (questions) =>
          questions?.map((question, i) => ({
            ...question,
            state: i === +index ? "correct" : question.state,
          })),
      );
    } else {
    }

    setSelectedAnswerIndex(undefined);
  };

  const handleAnswerClick = (event: MouseEvent<HTMLDivElement>) => {
    const index = event.currentTarget.getAttribute("data-index");

    if (index) {
      setSelectedAnswerIndex(+index);
    }
  };

  useEffect(() => {
    const allCorrect = questions?.every((item) => item.state === "correct");

    if (allCorrect) {
      onSubmit(true);
      return;
    }

    if (isOver) {
      onSubmit(false);
    }
  }, [isOver, questions]);

  const handleDragStart = (event: DragEvent<HTMLSpanElement>) => {
    const index = event.currentTarget.getAttribute("data-index");

    if (index) {
      setSelectedAnswerIndex(+index);
    }
  };

  const handleDragEnd = () => {
    setSelectedAnswerIndex(undefined);
  };

  const handleDrop = (event: DragEvent<HTMLSpanElement>) => {
    if (selectedAnswerIndex === undefined) {
      return;
    }

    const index = event.currentTarget.getAttribute("data-index");
    if (index !== null) {
      setQuestions(
        (questions) =>
          questions?.map((question, i) => ({
            ...question,
            state:
              i === +index
                ? selectedAnswerIndex === +index
                  ? "correct"
                  : "incorrect"
                : question.state,
          })),
      );
    }

    setSelectedAnswerIndex(undefined);
  };

  return (
    <Modal isOpen={opened} className={cls.modal}>
      <div className={cls.root}>
        <div className={cls.header}>
          <div onClick={onClose}>
            <Back />
          </div>
          <span>Я финансовый гений!</span>
          <div
            onClick={() => (isRunning ? handlePause() : handleStart())}
            style={{
              background: `linear-gradient(#2a5259, #2a5259) content-box no-repeat, conic-gradient(#FF9595 ${progress}%, 0, #99EB8C ) border-box`,
              border: "4px solid transparent",
              borderRadius: "50%",
            }}
          >
            {isRunning ? <Pause /> : <Play />}
          </div>
        </div>

        <div className={cls.content}>
          <span>Соедини термины с их правильными определениями:</span>

          {survey?.questions && (
            <>
              <div className={cls.questions}>
                {questions?.map((question, index) => (
                  <div className={cls.item} key={question.question}>
                    <span>{question.question}</span>
                    <span
                      className={classNames(cls["answers-badge"], {
                        [cls["answers-badge__green"]]:
                          question.state === "correct",
                        [cls["answers-badge__red"]]:
                          question.state === "incorrect",
                        [cls["answers-badge__empty"]]:
                          question.state === "empty",
                      })}
                      data-index={index}
                      onClick={handleQuestionClick}
                      onDrop={handleDrop}
                      onDragOver={(event) => event.preventDefault()}
                    >
                      {question.answer}
                    </span>
                  </div>
                ))}
              </div>

              <div className={cls.answers}>
                {answers?.map((answer, index) => (
                  <span
                    className={classNames(cls["answers-badge"], {
                      [cls["answers-badge__light-green"]]:
                        questions?.[index].state === "correct",
                      [cls["answers-badge__light-red"]]:
                        questions?.[index].state === "incorrect",
                    })}
                    onClick={handleAnswerClick}
                    data-index={index}
                    key={answer.answer}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    {answer.answer}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
