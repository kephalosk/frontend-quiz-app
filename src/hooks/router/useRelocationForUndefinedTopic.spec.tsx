import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";
import useRelocationForUndefinedTopic from "@/hooks/router/useRelocationForUndefinedTopic.ts";
import useTopic from "@/hooks/redux/topic/selector/useTopic.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

jest.mock(
  "@/hooks/redux/topic/selector/useTopic.ts",
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

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  useRelocationForUndefinedTopic();

  return <div data-testid={testComponentDataTestId}></div>;
};

describe("useRelocationForUndefinedTopic Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const currentTopicMock: TopicEnum = TopicEnum.HTML;

  const navigateMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useTopic as jest.Mock).mockReturnValue(currentTopicMock);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it("calls navigate with ${STARTPAGE_PATH} if topic is null", (): void => {
    (useTopic as jest.Mock).mockReturnValue(null);
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(`${STARTPAGE_PATH}`, {
      replace: true,
    });
  });

  it("does not call navigate if topic is defined", (): void => {
    (useTopic as jest.Mock).mockReturnValue(TopicEnum.HTML);
    setup();

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("calls hook useTopic", (): void => {
    setup();

    expect(useTopic).toHaveBeenCalledTimes(1);
    expect(useTopic).toHaveBeenCalledWith();
    expect(useTopic).toHaveReturnedWith(currentTopicMock);
  });

  it("calls hook useNavigate", (): void => {
    setup();

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith();
    expect(useNavigate).toHaveReturnedWith(navigateMock);
  });
});
