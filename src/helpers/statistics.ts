import { MERIDIANS, MERIDIAN_POINTS, SUMMARY_SHOWING_TIME_TYPE_OPTIONS } from "src/configs/constants";
import { getMonday, getSunday } from "./date";
import moment from "moment";

export const filterQuizzesList = (quizzesList: Array<IFormattedQuizDetail>,
  viewMode: number) => {
  const today = new Date()
  let startDate, endDate;

  // Filter list of quizzes to check
  quizzesList = quizzesList.sort((a, b) => a.datetime > b.datetime ? 1 : -1)

  switch (viewMode) {
    case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.ALL_TIME:
      break;
    case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_YEAR:
      startDate = new Date(moment(today).startOf('year').toDate().getTime())
      endDate = new Date(moment(today).endOf('year').toDate().getTime())

      quizzesList = quizzesList.filter((quiz) => quiz.datetime >= startDate && quiz.datetime <= endDate)
      break;
    case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_MONTH:
      startDate = new Date(moment(today).startOf('month').toDate().getTime())
      endDate = new Date(moment(today).endOf('month').toDate().getTime())

      quizzesList = quizzesList.filter((quiz) => quiz.datetime >= startDate && quiz.datetime <= endDate)
      break;
    case SUMMARY_SHOWING_TIME_TYPE_OPTIONS.THIS_WEEK:
      startDate = new Date(getMonday(today).getTime())
      endDate = new Date(getSunday(today).getTime())

      quizzesList = quizzesList.filter((quiz) => quiz.datetime >= startDate && quiz.datetime <= endDate)
      break;
  }

  return quizzesList
}

export const getSummary = (quizzesList: Array<IFormattedQuizDetail>,
  viewMode: number) => {
  if (quizzesList.length === 0) {
    return {
      points: 0,
      meridians: 0,
      quizzes: 0,
      accuracy: 0
    }
  }

  let filteredQuizzesList = filterQuizzesList(quizzesList, viewMode)

  // Statistics
  let quizzesCount = filteredQuizzesList.length;
  let sumAccuracies = 0;
  let acupuncturePoints = [];
  let meridians = [];

  filteredQuizzesList.forEach(quiz => {
    sumAccuracies += 100 * quiz.correctAnswers / quiz.numberOfQuestions;

    quiz.details.forEach((detail) => {
      let pointCode = "";
      // Not navigate quest
      if (typeof detail.correctAnswer === "number") {
        const correctPoint = detail.options[detail.correctAnswer].answer as string
        pointCode = correctPoint.split(" ")[0]
      } else {
        pointCode = detail.correctAnswer as string
      }

      if (!acupuncturePoints.includes(pointCode)) {
        acupuncturePoints.push(pointCode)
      }

      if (pointCode !== "M-HN-3") {
        const meridian = pointCode.split("-")[0]

        if (!meridians.includes(meridian)) {
          meridians.push(meridian)
        }
      }
    })
  })

  return {
    points: acupuncturePoints.length,
    meridians: meridians.length,
    quizzes: quizzesCount,
    accuracy: Math.round(sumAccuracies / quizzesCount)
  }
}

export const getMeridiansProgress = (quizzesList: Array<IFormattedQuizDetail>) => {
  const finishedPointsByMeridians = {}

  MERIDIANS.forEach((meridian) => {
    finishedPointsByMeridians[meridian] = []
  })

  quizzesList.forEach(quiz => {
    quiz.details.forEach((detail) => {
      let pointCode = "";
      // Not navigate quest
      if (typeof detail.correctAnswer === "number") {
        const correctPoint = detail.options[detail.correctAnswer].answer as string
        pointCode = correctPoint.split(" ")[0]
      } else {
        pointCode = detail.correctAnswer as string
      }

      if (pointCode !== "M-HN-3") {
        const meridian = pointCode.split("-")[0]

        if (!finishedPointsByMeridians[meridian].includes(pointCode)) {
          finishedPointsByMeridians[meridian].push(pointCode)
        }
      }
    })
  })

  let result = {}

  MERIDIANS.forEach(meridian => {
    result[meridian] = Math.round(100 * finishedPointsByMeridians[meridian].length / MERIDIAN_POINTS[meridian].length)
  })

  return result
}

export const getQuizzesLog = (quizzesList: Array<IFormattedQuizDetail>,
  viewMode: number) => {
  if (quizzesList.length === 0) {
    return []
  }

  let filteredQuizzesList = filterQuizzesList(quizzesList, viewMode)

  let results = []

  filteredQuizzesList.forEach(quiz => {
    let correct = []
    let wrong = []

    quiz.details.forEach(detail => {
      let pointCode = "";

      if (typeof detail.correctAnswer === "number") {
        const correctPoint = detail.options[detail.correctAnswer].answer as string
        pointCode = correctPoint.split(" ")[0]
      } else {
        pointCode = detail.correctAnswer as string
      }

      if (detail.isCorrect) {
        if (!correct.find(it => it.code === pointCode)) {
          correct.push({
            code: pointCode,
            meridian: pointCode.split("-")[0],
            isCorrect: true
          })
        }
      } else {
        if (!wrong.find(it => it.code === pointCode)) {
          wrong.push({
            code: pointCode,
            meridian: pointCode.split("-")[0],
            isCorrect: false
          })
        }
      }
    })

    results.push({
      date: quiz.datetime,
      result: {
        correctAnswers: quiz.correctAnswers,
        numberOfQuestions: quiz.numberOfQuestions,
        correctPoints: correct,
        wrongPoints: wrong
      }
    })
  })

  return results;
}

export const getLogsForChart = (quizzesList: Array<IFormattedQuizDetail>,
  viewMode: number) => {
  let results = getQuizzesLog(quizzesList, viewMode)

  results.forEach(result => {
    result.result["points"] = result.result["correctPoints"].concat(result.result["wrongPoints"])
  })

  return results.reverse();
}
