import React from 'react'

export const ServoControllerUI = ({valorServo}) => {
  return (
    <div className="flex-column">
      <h5 className="form-label">Servo {valorServo}</h5>
      <input className="form-control" type="number" step={5} />
    </div>
  )
}
