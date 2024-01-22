import React, { useEffect, useState, useCallback } from 'react';


export default function DashBoard({dashboardData}) {
  return (
    <div>
      <h1>대시보드</h1>
      <ul>
        {Object.entries(dashboardData).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}