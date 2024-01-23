import React, { useEffect, useState, useCallback } from 'react';


export default function DashBoard({dashboardData}) {
  const sortedData = Object.entries(dashboardData).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1>대시보드</h1>
      <ul>
        {sortedData.map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}