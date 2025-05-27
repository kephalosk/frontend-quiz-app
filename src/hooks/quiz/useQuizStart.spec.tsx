import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QuizStartHook } from "@/globals/models/types/QuizTypes.ts";
import useQuizStart from "@/hooks/quiz/useQuizStart.ts";
import useUpdateTopic from "@/hooks/redux/topic/dispatch/useUpdateTopic.ts";
import { useNavigate } from "react-router-dom";
import { getTopic } from "@/globals/services/TopicService.ts";
import getEPQuestionsShuffledFromEPTopic from "@/globals/helper/getEPQuestionsShuffledFromEPTopic.ts";
import { EPTopic } from "@/globals/models/entrypoints/EPTopic.ts";
import { HTMLTopicFixture } from "@/jest/fixtures/TopicServiceFixtures.ts";
import { mockedQuestions } from "@/redux/fixtures/mockedQuestions.ts";
import { EPQuestion } from "@/globals/models/entrypoints/EPQuestion.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";
import { LoadingStateEnum } from "@/globals/models/enums/LoadingStateEnum.ts";
import {
  QUIZ_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import { FAILED_QUIZ_START_ERROR_MESSAGE_PREFIX } from "@/globals/constants/ErrorMessages.ts";
import useUpdateQuestionsAndResetIndexAndScore from "@/hooks/redux/topic/dispatch/useUpdateQuestionsAndResetIndexAndScore.ts";
import useUpdateQuizError from "@/hooks/redux/topic/dispatch/useUpdateQuizError.ts";

jest.spyOn(console, "error").mockImplementation((): null => null);

jest.mock(
  "@/hooks/redux/topic/dispatch/useUpdateTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "react-router-dom",
  (): {
    __esModule: boolean;
    useNavigate: jest.Mock;
  } => ({
    __esModule: true,
    useNavigate: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/dispatch/useUpdateQuestionsAndResetIndexAndScore.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/services/TopicService.ts",
  (): {
    __esModule: boolean;
    getTopic: jest.Mock;
  } => ({
    __esModule: true,
    getTopic: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/getEPQuestionsShuffledFromEPTopic.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/topic/dispatch/useUpdateQuizError.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/topicSlice.ts",
  (): {
    __esModule: boolean;
    setQuestionsAndResetIndexAndScore: jest.Mock;
    setQuizError: jest.Mock;
  } => ({
    __esModule: true,
    setQuestionsAndResetIndexAndScore: jest.fn(),
    setQuizError: jest.fn(),
  }),
);

const topicMock: TopicEnum = TopicEnum.HTML;
const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const { handleQuizStart }: QuizStartHook = useQuizStart();

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={() => handleQuizStart(topicMock)}
    ></div>
  );
};

describe("useQuizStart Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const handleTopicUpdateMock: jest.Mock = jest.fn();

  const navigateMock: jest.Mock = jest.fn();

  const setQuestionsMock: jest.Mock = jest.fn();

  const setErrorMock: jest.Mock = jest.fn();

  const epTopicMock: EPTopic = HTMLTopicFixture;

  const epQuestionsShuffledMock: EPQuestion[] = mockedQuestions;

  beforeEach((): void => {
    (useUpdateTopic as jest.Mock).mockReturnValue(handleTopicUpdateMock);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useUpdateQuestionsAndResetIndexAndScore as jest.Mock).mockReturnValue(
      setQuestionsMock,
    );
    (useUpdateQuizError as jest.Mock).mockReturnValue(setErrorMock);
    (getTopic as jest.Mock).mockReturnValue(epTopicMock);
    (getEPQuestionsShuffledFromEPTopic as jest.Mock).mockReturnValue(
      epQuestionsShuffledMock,
    );
  });

  it("handles QuizStart when handleQuizStart is called", async (): Promise<void> => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(handleTopicUpdateMock).toHaveBeenCalledTimes(1);
    expect(handleTopicUpdateMock).toHaveBeenCalledWith(topicMock);

    expect(getTopic).toHaveBeenCalledTimes(1);
    expect(getTopic).toHaveBeenCalledWith(topicMock);

    await waitFor(() => {
      expect(getEPQuestionsShuffledFromEPTopic).toHaveBeenCalledTimes(1);
      expect(getEPQuestionsShuffledFromEPTopic).toHaveBeenCalledWith(
        epTopicMock,
      );
    });

    expect(setQuestionsMock).toHaveBeenCalledTimes(1);
    expect(setQuestionsMock).toHaveBeenCalledWith(epQuestionsShuffledMock);

    expect(setErrorMock).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toHaveBeenCalledWith(LoadingStateEnum.SUCCEEDED);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(
      `${STARTPAGE_PATH}${QUIZ_SUB_PATH}`,
      { replace: true },
    );
  });

  it("logs Errors", (): void => {
    const errorMessage: string = "Error";
    (useUpdateTopic as jest.Mock).mockReturnValue(() => {
      throw new Error();
    });
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      `${FAILED_QUIZ_START_ERROR_MESSAGE_PREFIX}${errorMessage}`,
    );

    expect(setErrorMock).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toHaveBeenCalledWith(LoadingStateEnum.FAILED);
  });

  it("calls hook useUpdateTopic", (): void => {
    setup();

    expect(useUpdateTopic).toHaveBeenCalledTimes(1);
    expect(useUpdateTopic).toHaveBeenCalledWith();
    expect(useUpdateTopic).toHaveReturnedWith(handleTopicUpdateMock);
  });

  it("calls hook useNavigate", (): void => {
    setup();

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith();
    expect(useNavigate).toHaveReturnedWith(navigateMock);
  });

  it("calls hook useUpdateQuestionsAndResetIndexAndScore", (): void => {
    setup();

    expect(useUpdateQuestionsAndResetIndexAndScore).toHaveBeenCalledTimes(1);
    expect(useUpdateQuestionsAndResetIndexAndScore).toHaveBeenCalledWith();
    expect(useUpdateQuestionsAndResetIndexAndScore).toHaveReturnedWith(
      setQuestionsMock,
    );
  });

  it("calls hook useUpdateQuizError", (): void => {
    setup();

    expect(useUpdateQuizError).toHaveBeenCalledTimes(1);
    expect(useUpdateQuizError).toHaveBeenCalledWith();
    expect(useUpdateQuizError).toHaveReturnedWith(setErrorMock);
  });

  it("calls Service getTopic", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(getTopic).toHaveBeenCalledTimes(1);
    expect(getTopic).toHaveBeenCalledWith(topicMock);
    expect(getTopic).toHaveReturnedWith(epTopicMock);
  });

  it("calls helper getEPQuestionsShuffledFromEPTopic", async (): Promise<void> => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    await waitFor(() => {
      expect(getEPQuestionsShuffledFromEPTopic).toHaveBeenCalledTimes(1);
      expect(getEPQuestionsShuffledFromEPTopic).toHaveBeenCalledWith(
        epTopicMock,
      );
      expect(getEPQuestionsShuffledFromEPTopic).toHaveReturnedWith(
        epQuestionsShuffledMock,
      );
    });
  });
});
