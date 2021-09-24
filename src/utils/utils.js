import  { pedMeters } from '../constants/constants'

export const formatTime = ( seconds ) => {
    let date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    return timeString
}
export const calculateDuration = (startDate, endDate = '' ) => {
    const startDateObj = new Date(startDate)
    const currentTime = endDate? new Date(endDate) : new Date()

    return Math.round((currentTime - startDateObj) /1000)
}

export const calculateScore = (meters,duration, maxKMPH) => {
    let score = 0
    const meterPoints = meters * 25.5
    const durationPoints = duration * 10
    const maxKMPHPoints = maxKMPH * 200

    score = Math.round(meterPoints + durationPoints + maxKMPHPoints)
    
    return score
}

export const calculateFinalScore = (score, avgSpeed) => {
    const avgSpeeedPoints = avgSpeed * 100
    return Math.round(score + avgSpeeedPoints)

}
export const getMeters = (peds) => {
    return peds * pedMeters
}
