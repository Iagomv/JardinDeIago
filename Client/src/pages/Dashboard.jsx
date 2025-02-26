import React from 'react'
import {FirstChartComponent} from '../components/Charts/FirstChart'
import {useServerContext} from '../context/serverContext'

export const Dashboard = () => {
  const {arduinoData} = useServerContext()

  return (
    <div>
      <h2>📊 Dashboard</h2>
      {arduinoData && <FirstChartComponent data={arduinoData} />}
    </div>
  )
}
