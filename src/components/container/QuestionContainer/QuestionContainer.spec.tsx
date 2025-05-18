import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import QuestionContainer, {
  QuestionContainerProps,
} from "@/components/container/QuestionContainer/QuestionContainer.tsx";
import ProgressBar from "@/components/atoms/ProgressBar/ProgressBar.tsx";

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={labelDataTestId}></div>;
    }),
);

const progressBarDataTestId: string = "progress-bar";
jest.mock(
  "@/components/atoms/ProgressBar/ProgressBar.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={progressBarDataTestId}></div>;
    }),
);

describe("QuestionContainer Component", (): void => {
  const question: string = "test";
  const progressInfo: string = "progress";
  const progressPerCent: number = 50;
  const setup = (
    propsOverride?: Partial<QuestionContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: QuestionContainerProps = {
      question,
      progressInfo,
      progressPerCent,
    };

    const props: QuestionContainerProps = { ...defaultProps, ...propsOverride };
    return render(<QuestionContainer {...props} />);
  };

  it(`renders div questionContainer`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".questionContainer");

    expect(element).toBeInTheDocument();
  });

  it(`renders div questionContainerHeader`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".questionContainerHeader",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for SUB_LINE_LABEL", (): void => {
    setup();

    const element: HTMLElement[] = screen.getAllByTestId(labelDataTestId);

    expect(element).toHaveLength(2);
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      {
        type: LabelTypeEnum.SUB_LINE_LABEL,
        text: progressInfo,
      },
      undefined,
    );
  });

  it("renders component Label for QUESTION_LABEL", (): void => {
    setup();

    const element: HTMLElement[] = screen.getAllByTestId(labelDataTestId);

    expect(element).toHaveLength(2);
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      {
        type: LabelTypeEnum.QUESTION_LABEL,
        text: question,
      },
      undefined,
    );
  });

  it("renders component ProgressBar", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(progressBarDataTestId);

    expect(element).toBeInTheDocument();
    expect(ProgressBar).toHaveBeenCalledTimes(1);
    expect(ProgressBar).toHaveBeenCalledWith(
      {
        progressPerCent,
      },
      undefined,
    );
  });
});
