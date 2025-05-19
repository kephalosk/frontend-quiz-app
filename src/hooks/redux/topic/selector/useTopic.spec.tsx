import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { stateMock } from "@/redux/fixtures/stateMock.ts";
import useTopic from "@/hooks/redux/topic/selector/useTopic.ts";
import { TopicEnum } from "@/globals/models/enums/TopicEnum.ts";

jest.mock(
  "react-redux",
  (): {
    useSelector: jest.Mock;
  } => ({
    useSelector: jest.fn(),
  }),
);

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): ReactElement => {
  const topic: TopicEnum | null = useTopic();
  return <div data-testid={testComponentDataTestId}>{topic}</div>;
};

describe("useTopic hook", (): void => {
  const expectedState: TopicEnum = TopicEnum.HTML;

  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const state: RootState = {
    ...stateMock,
    topic: { ...stateMock.topic, topic: expectedState },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(state),
    );
  });

  it("returns topic", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toEqual(`${expectedState}`);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    expect(useSelector).toHaveReturnedWith(expectedState);
  });
});
