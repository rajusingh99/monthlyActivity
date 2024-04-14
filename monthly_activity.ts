
interface UserSession {
    logged_in: Date;
    logged_out: Date;
    lastSeenAt: Date;
  }
  
  interface MonthlyActivity {
    month: string;
    activeUsers: Set<string>;
  }
  
  function calculateMonthlyActiveUsers(userSessions: UserSession[]): MonthlyActivity[] {
    const monthlyActivities: MonthlyActivity[] = [];
  
    // Map to store active users for each month
    const activeUsersMap: Map<string, Set<string>> = new Map();
  
    // Iterate through user sessions
    userSessions.forEach(session => {
      const loggedInMonth = session.logged_in.toISOString().slice(0, 7);
      const loggedOutMonth = session.logged_out.toISOString().slice(0, 7);
  
      // Ensure user session spans at least 30 minutes
      const sessionDuration = session.logged_out.getTime() - session.logged_in.getTime();
      if (sessionDuration >= 30 * 60 * 1000) {
        if (!activeUsersMap.has(loggedInMonth)) {
          activeUsersMap.set(loggedInMonth, new Set());
        }
        activeUsersMap.get(loggedInMonth)?.add(loggedOutMonth);
      }
    });
  
    // Convert map to array of MonthlyActivity objects
    activeUsersMap.forEach((activeUsers, month) => {
      monthlyActivities.push({ month, activeUsers });
    });
  
    return monthlyActivities;
  }
  
  // Example usage
  const userSessions: UserSession[] = [
    { logged_in: new Date('2024-01-01T10:00:00'), logged_out: new Date('2024-01-01T10:30:00'), lastSeenAt: new Date() },
    { logged_in: new Date('2024-01-15T09:00:00'), logged_out: new Date('2024-01-15T09:45:00'), lastSeenAt: new Date() },
    { logged_in: new Date('2024-02-01T08:00:00'), logged_out: new Date('2024-02-01T08:45:00'), lastSeenAt: new Date() },
  ];
  
  const monthlyActivity = calculateMonthlyActiveUsers(userSessions);
  console.log(monthlyActivity);
  