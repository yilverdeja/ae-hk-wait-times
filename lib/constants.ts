export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }

// Prediction display policy thresholds (minutes).
// Raise each forecast to at least the current live wait when the model tends to underpredict.
export const PREDICTION_CAP_MINS = 6.5 * 60 // 390 min (6.5 h)

// Hide predictions entirely when the model is too far outside its training distribution.
export const PREDICTION_SUPPRESS_MINS = 8 * 60 // 480 min (8 h)
