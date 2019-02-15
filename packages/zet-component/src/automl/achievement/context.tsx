import React from 'react';

interface AchievementContextState {
  unfoldState:string,
  extraKeys:any,
}
export const AchieveContext = React.createContext<AchievementContextState>({
  unfoldState:'open',
  extraKeys:'all',
});
