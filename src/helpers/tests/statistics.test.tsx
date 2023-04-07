import { SAMPLE_QUIZ_LIST } from "src/components/common/Records/tests/quizList"
import { getLogsForChart } from "src/helpers/statistics";

test("getLogsForChart", () => {
  const results = getLogsForChart(SAMPLE_QUIZ_LIST, 0);

  results.forEach((result) => {
    expect(Object.keys(result.result)).toContain("points")
  })
})
